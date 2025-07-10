import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import ClienteCard from '../components/ClienteCard';
import { clientesData } from '../data/mockData';
import { colors } from '../utils/colors';

const ClientesSearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredClientes, setFilteredClientes] = useState(clientesData);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      setFilteredClientes(clientesData);
    } else {
      const filtered = clientesData.filter(cliente =>
        cliente.nombre.toLowerCase().includes(text.toLowerCase()) ||
        cliente.direccion.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredClientes(filtered);
    }
  };

  const renderCliente = ({ item }) => (
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
        keyExtractor={(item) => item.id.toString()}
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
