import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const BottomNavigation = ({ activeTab, onTabPress }) => {
  const tabs = [
    {
      id: 'clientes',
      label: 'Clientes',
      icon: 'people-outline',
      activeIcon: 'people'
    },
    {
      id: 'pedidos',
      label: 'Pedidos',
      icon: 'cube-outline',
      activeIcon: 'cube'
    },
    {
      id: 'productividad',
      label: 'Productividad',
      icon: 'bar-chart-outline',
      activeIcon: 'bar-chart'
    },
    {
      id: 'articulos',
      label: 'Artículos',
      icon: 'list-outline',
      activeIcon: 'list'
    },
    {
      id: 'cobranza',
      label: 'Cobranza',
      icon: 'wallet-outline',
      activeIcon: 'wallet'
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.container}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabPress(tab.id)}
          >
            <Ionicons
              name={activeTab === tab.id ? tab.activeIcon : tab.icon}
              size={24}
              color={activeTab === tab.id ? colors.secondary : colors.gray[400]}
            />
            <Text style={[
              styles.tabLabel,
              { color: activeTab === tab.id ? colors.secondary : colors.gray[400] }
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
});

export default BottomNavigation;
