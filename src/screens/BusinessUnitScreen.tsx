import React, { useState, useEffect, FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { BusinessUnit, User, NavigationProps } from '../types';

interface BusinessUnitScreenProps {
  navigation: NavigationProps;
}

const BusinessUnitScreen: FC<BusinessUnitScreenProps> = ({ navigation }) => {
  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<BusinessUnit | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    initializeUser();
    loadBusinessUnits();
  }, []);

  const initializeUser = (): void => {
    // En una app real, obtendrías esto de AsyncStorage
    // const userJson = await AsyncStorage.getItem('user');
    // if (userJson) {
    //   setUser(JSON.parse(userJson));
    // }
    
    // Simulación para desarrollo
    setUser({
      id: 1,
      username: 'admin',
      role: 'admin'
    });
  };

  const loadBusinessUnits = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Simulación de datos para desarrollo
      // En producción esto sería una llamada a la API real
      const mockUnits: BusinessUnit[] = [
        {
          id: 1,
          name: 'Sucursal Central',
          code: 'CENTRAL',
          description: 'Sucursal principal central',
          isActive: true
        },
        {
          id: 2,
          name: 'Sucursal Norte',
          code: 'NORTE',
          description: 'Sucursal zona norte',
          isActive: true
        },
        {
          id: 3,
          name: 'Sucursal Sur',
          code: 'SUR',
          description: 'Sucursal zona sur',
          isActive: true
        },
        {
          id: 4,
          name: 'Sucursal Este',
          code: 'ESTE',
          description: 'Sucursal zona este',
          isActive: true
        }
      ];

      setTimeout(() => {
        setBusinessUnits(mockUnits);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Error loading business units:', error);
      showError('Error al cargar las unidades de negocio');
      setIsLoading(false);
    }
  };

  const selectBusinessUnit = (unit: BusinessUnit): void => {
    setSelectedUnit(unit);
  };

  const handleContinue = (): void => {
    if (!selectedUnit) {
      showError('Por favor, selecciona una unidad de negocio');
      return;
    }

    // En una app real, guardarías esto en AsyncStorage
    // AsyncStorage.setItem('selectedBusinessUnit', JSON.stringify(selectedUnit));
    
    // Redirigir al dashboard principal
    redirectToDashboard();
  };

  const redirectToDashboard = (): void => {
    // Navegar a la pantalla de clientes como ejemplo
    navigation.navigate('Clientes');
  };

  const showError = (message: string): void => {
    Alert.alert('Error', message);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando unidades de negocio...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>¿Con qué Unidad de Negocio desea trabajar?</Text>
        
        <View style={styles.unitsGrid}>
          {businessUnits.map((unit: BusinessUnit) => (
            <TouchableOpacity
              key={unit.id}
              style={[
                styles.unitCard,
                selectedUnit?.id === unit.id && styles.selectedUnitCard
              ]}
              onPress={() => selectBusinessUnit(unit)}
            >
              <View style={styles.unitIcon}>
                <Ionicons name="business" size={32} color="white" />
              </View>
              <Text style={styles.unitName}>{unit.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.continueButton, !selectedUnit && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedUnit}
        >
          <Text style={styles.continueButtonText}>Continuar {'>'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 28,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  unitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 60,
  },
  unitCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedUnitCard: {
    borderColor: '#1e88e5',
    backgroundColor: '#f8f9ff',
  },
  unitIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1e88e5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  unitName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BusinessUnitScreen;