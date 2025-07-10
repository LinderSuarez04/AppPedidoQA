import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ClientesScreen from '../screens/ClientesScreen';
import BottomNavigation from '../components/BottomNavigation';
import { colors } from '../utils/colors';

// Pantallas placeholder para las otras pestañas
const PlaceholderScreen = ({ title }) => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>{title}</Text>
    <Text style={styles.placeholderSubtext}>Próximamente</Text>
  </View>
);

const MainTabNavigator = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('clientes');

  const renderScreen = () => {
    switch (activeTab) {
      case 'clientes':
        return <ClientesScreen navigation={navigation} />;
      case 'pedidos':
        return <PlaceholderScreen title="Pedidos" />;
      case 'productividad':
        return <PlaceholderScreen title="Productividad" />;
      case 'articulos':
        return <PlaceholderScreen title="Artículos" />;
      case 'cobranza':
        return <PlaceholderScreen title="Cobranza" />;
      default:
        return <ClientesScreen navigation={navigation} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabPress={setActiveTab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 16,
    color: colors.text.secondary,
  },
});

export default MainTabNavigator;
