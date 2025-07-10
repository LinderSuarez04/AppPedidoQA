import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const ClienteCard = ({ cliente, onPress }) => {
  const getTipoColor = (tipo) => {
    switch (tipo.toLowerCase()) {
      case 'nuevo': return colors.status.nuevo;
      case 'preferencial': return colors.status.preferencial;
      case 'regular': return colors.status.regular;
      case 'vip': return colors.status.vip;
      default: return colors.gray[400];
    }
  };

  const getCanalColor = (canal) => {
    switch (canal.toLowerCase()) {
      case 'digital': return colors.canal.digital;
      case 'tradicional': return colors.canal.tradicional;
      case 'mixto': return colors.canal.mixto;
      default: return colors.gray[400];
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Ionicons name="person" size={20} color={colors.warning} />
        <Text style={styles.nombre}>{cliente.nombre}</Text>
      </View>
      
      <Text style={styles.direccion}>{cliente.direccion}</Text>
      
      <View style={styles.badgeContainer}>
        <View style={[styles.badge, { backgroundColor: getTipoColor(cliente.tipo) }]}>
          <Text style={styles.badgeText}>TIPO: {cliente.tipo}</Text>
        </View>
        
        <View style={[styles.badge, { backgroundColor: colors.gray[600] }]}>
          <Text style={styles.badgeText}>NEGOCIO: {cliente.negocio}</Text>
        </View>
        
        <View style={[styles.badge, { backgroundColor: getCanalColor(cliente.canal) }]}>
          <Text style={styles.badgeText}>CANAL: {cliente.canal}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginLeft: 8,
    flex: 1,
  },
  direccion: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 4,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default ClienteCard;
