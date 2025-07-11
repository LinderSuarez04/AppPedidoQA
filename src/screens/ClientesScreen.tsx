import React, { useState, FC } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import ClienteCard from '../components/ClienteCard';
import { clientesData } from '../data/mockData';
import { colors } from '../utils/colors';
import { Cliente, NavigationProps } from '../types';

interface ClientesScreenProps {
  navigation: NavigationProps;
}

const ClientesScreen: FC<ClientesScreenProps> = ({ navigation }) => {
  const [clientesProgramados] = useState<number>(3);

  const renderCliente: ListRenderItem<Cliente> = ({ item }) => (
    <ClienteCard 
      cliente={item} 
      onPress={() => navigation.navigate('ClienteDetail', { cliente: item })}
    />
  );

  const handleSearchPress = (): void => {
    navigation.navigate('ClientesSearch');
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mis Clientes</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Hoy tienes {clientesProgramados} clientes programados
            </Text>
          </View>
        </View>

        <FlatList
          data={clientesData}
          renderItem={renderCliente}
          keyExtractor={(item: Cliente) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />

        {/* Botón flotante para buscar/agregar clientes */}
        <TouchableOpacity 
          style={styles.fab}
          onPress={handleSearchPress}
        >
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
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
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  infoText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  listContainer: {
    paddingBottom: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default ClientesScreen;
