import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import BasicosTab from '../components/tabs/BasicosTab';
import ContactoTab from '../components/tabs/ContactoTab';
import GeograficosTab from '../components/tabs/GeograficosTab';
import ActividadTab from '../components/tabs/ActividadTab';
import { colors } from '../utils/colors';

const ClienteDetailScreen = ({ route, navigation }) => {
  const { cliente } = route.params;
  const [activeTab, setActiveTab] = useState('basicos');

  const tabs = [
    { id: 'basicos', label: 'BÁSICOS', component: BasicosTab },
    { id: 'contacto', label: 'CONTACTO', component: ContactoTab },
    { id: 'geograficos', label: 'UBICACIÓN', component: GeograficosTab },
    { id: 'actividad', label: 'ACTIVIDAD', component: ActividadTab },
  ];

  const renderTabContent = () => {
    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
    return ActiveComponent ? <ActiveComponent cliente={cliente} /> : null;
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.content}>
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tabContent}>
          {renderTabContent()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 4,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 2,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginHorizontal: 1,
  },
  activeTab: {
    borderBottomColor: colors.secondary,
  },
  tabText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text.secondary,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  activeTabText: {
    color: colors.secondary,
  },
  tabContent: {
    flex: 1,
  },
});

export default ClienteDetailScreen;
