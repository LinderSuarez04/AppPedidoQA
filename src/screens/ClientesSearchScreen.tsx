import React, { useState, FC } from 'react';
import { View, Text, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import ClienteCard from '../components/ClienteCard';
import { clientesData } from '../data/mockData';
import { colors } from '../utils/colors';
import { Cliente, NavigationProps } from '../types';

interface ClientesSearchScreenProps {
  navigation: NavigationProps;
}

const ClientesSearchScreen: FC<ClientesSearchScreenProps> = ({ navigation }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>(clientesData);

  const handleSearch = (text: string): void => {
    setSearchText(text);
    if (text === '') {
      setFilteredClientes(clientesData);
    } else {
      const filtered = clientesData.filter((cliente: Cliente) =>
        cliente.nombre.toLowerCase().includes(text.toLowerCase()) ||
        cliente.direccion.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredClientes(filtered);
    }
  };

  const renderCliente: ListRenderItem<Cliente> = ({ item }) => (
    <ClienteCard 
      cliente={item} 
      onPress={() => navigation.navigate('ClienteDetail', { cliente: item })}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MIS CLIENTES</Text>
      </View>
      
      <SearchBar 
        value={searchText}
        onChangeText={handleSearch}
        placeholder="search.."
      />

      <FlatList
        data={filteredClientes}
        renderItem={renderCliente}
        keyExtractor={(item: Cliente) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingVertical: 8,
    paddingBottom: 20,
  },
});

export default ClientesSearchScreen;
