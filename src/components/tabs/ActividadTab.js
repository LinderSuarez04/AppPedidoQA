import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { colors } from '../../utils/colors';

const ActividadTab = ({ cliente }) => {
  const [activeTab, setActiveTab] = useState('deuda');

  const formatCurrency = (amount) => {
    return `S/ ${amount.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return dateString;
  };

  const renderFactura = ({ item }) => (
    <View style={styles.facturaCard}>
      <View style={styles.facturaHeader}>
        <Text style={styles.facturaId}>{item.id}</Text>
        <Text style={styles.facturaMonto}>{formatCurrency(item.monto)}</Text>
      </View>
      <Text style={styles.facturaNumero}>{item.numero}</Text>
      <View style={styles.facturaFechas}>
        <Text style={styles.facturaFecha}>
          {item.fechaEmision} {item.fechaVencimiento}
        </Text>
        <Text style={styles.diasAtraso}>{item.diasAtraso} días atraso</Text>
      </View>
    </View>
  );

  const renderPedido = ({ item }) => (
    <View style={styles.pedidoCard}>
      <View style={styles.pedidoHeader}>
        <Text style={styles.pedidoId}>{item.id}</Text>
        <Text style={styles.pedidoMonto}>{formatCurrency(item.monto)}</Text>
      </View>
      <Text style={styles.pedidoCliente}>Cliente: {item.cliente}</Text>
      <View style={styles.pedidoFooter}>
        <Text style={styles.pedidoFecha}>{item.fecha}</Text>
        <View style={[styles.estadoBadge, 
          { backgroundColor: item.estado === 'Entregado' ? colors.success : colors.warning }
        ]}>
          <Text style={styles.estadoText}>{item.estado}</Text>
        </View>
      </View>
    </View>
  );

  const renderDevolucion = ({ item }) => (
    <View style={styles.devolucionCard}>
      <View style={styles.devolucionHeader}>
        <Text style={styles.devolucionId}>{item.id}</Text>
        <Text style={styles.devolucionMonto}>{formatCurrency(item.monto)}</Text>
      </View>
      <Text style={styles.devolucionMotivo}>Motivo: {item.motivo}</Text>
      <View style={styles.devolucionFooter}>
        <Text style={styles.devolucionFecha}>{item.fecha} - {item.estado}</Text>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'deuda':
        return (
          <View style={styles.tabContent}>
            <View style={styles.deudaHeader}>
              <Text style={styles.deudaTitle}>DEUDA DEL CLIENTE</Text>
              <Text style={styles.deudaAmount}>{formatCurrency(cliente.deuda)}</Text>
              <Text style={styles.deudaDate}>AL 20/02/25</Text>
            </View>
            
            <FlatList
              data={cliente.facturas}
              renderItem={renderFactura}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No hay facturas pendientes</Text>
              }
            />
            
            <TouchableOpacity style={styles.cobrarButton}>
              <Text style={styles.cobrarButtonText}>COBRAR</Text>
            </TouchableOpacity>
          </View>
        );
      
      case 'pedidos':
        return (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>ÚLTIMOS PEDIDOS</Text>
              <Text style={styles.sectionSubtitle}>HISTORIAL RECIENTE</Text>
            </View>
            
            <FlatList
              data={cliente.pedidos}
              renderItem={renderPedido}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No hay pedidos recientes</Text>
              }
            />
          </View>
        );
      
      case 'devoluciones':
        return (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>DEVOLUCIONES</Text>
              <Text style={styles.sectionSubtitle}>HISTORIAL DE DEVOLUCIONES</Text>
            </View>
            
            <FlatList
              data={cliente.devoluciones}
              renderItem={renderDevolucion}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No hay devoluciones</Text>
              }
            />
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'deuda' && styles.activeTab]}
          onPress={() => setActiveTab('deuda')}
        >
          <Text style={[styles.tabText, activeTab === 'deuda' && styles.activeTabText]}>
            Ver deuda
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'pedidos' && styles.activeTab]}
          onPress={() => setActiveTab('pedidos')}
        >
          <Text style={[styles.tabText, activeTab === 'pedidos' && styles.activeTabText]}>
            Últimos Pedidos
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'devoluciones' && styles.activeTab]}
          onPress={() => setActiveTab('devoluciones')}
        >
          <Text style={[styles.tabText, activeTab === 'devoluciones' && styles.activeTabText]}>
            Devoluciones
          </Text>
        </TouchableOpacity>
      </View>
      
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.gray[100],
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  activeTabText: {
    color: colors.white,
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  deudaHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  deudaTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  deudaAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.error,
    marginBottom: 4,
  },
  deudaDate: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  facturaCard: {
    backgroundColor: colors.gray[50],
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  facturaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  facturaId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  facturaMonto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.error,
  },
  facturaNumero: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  facturaFechas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  facturaFecha: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  diasAtraso: {
    fontSize: 12,
    color: colors.error,
    fontWeight: '600',
  },
  pedidoCard: {
    backgroundColor: colors.gray[50],
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  pedidoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pedidoId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  pedidoMonto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.success,
  },
  pedidoCliente: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  pedidoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pedidoFecha: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  estadoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  estadoText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
  },
  devolucionCard: {
    backgroundColor: colors.gray[50],
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  devolucionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  devolucionId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  devolucionMonto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.error,
  },
  devolucionMotivo: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  devolucionFooter: {
    alignItems: 'flex-start',
  },
  devolucionFecha: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  cobrarButton: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  cobrarButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 40,
  },
});

export default ActividadTab;
