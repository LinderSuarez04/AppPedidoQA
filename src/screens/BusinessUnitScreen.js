import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { colors } from '../utils/colors';

const BusinessUnitScreen = ({ navigation }) => {
  const { selectBusinessUnit } = useAuth();
  const [selectedUnit, setSelectedUnit] = useState(null);

  const businessUnits = [
    {
      id: 1,
      name: 'Sucursal\nCentral',
      icon: 'business-outline'
    },
    {
      id: 2,
      name: 'Sucursal\nNorte',
      icon: 'business-outline'
    },
    {
      id: 3,
      name: 'Sucursal\nSur',
      icon: 'business-outline'
    },
    {
      id: 4,
      name: 'Sucursal\nEste',
      icon: 'business-outline'
    }
  ];

  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit.id);
  };

  const handleContinue = () => {
    if (!selectedUnit) {
      Alert.alert('Selección requerida', 'Por favor seleccione una unidad de negocio');
      return;
    }
    
    const selectedUnitData = businessUnits.find(unit => unit.id === selectedUnit);
    selectBusinessUnit(selectedUnitData);
    
    // Navegamos a la aplicación principal
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          ¿Con qué Unidad de{'\n'}Negocio desea trabajar?
        </Text>

        <View style={styles.unitsGrid}>
          {businessUnits.map((unit) => (
            <TouchableOpacity
              key={unit.id}
              style={[
                styles.unitCard,
                selectedUnit === unit.id && styles.unitCardSelected
              ]}
              onPress={() => handleUnitSelect(unit)}
            >
              <View style={[
                styles.iconContainer,
                selectedUnit === unit.id && styles.iconContainerSelected
              ]}>
                <Ionicons 
                  name={unit.icon} 
                  size={32} 
                  color={selectedUnit === unit.id ? colors.white : colors.secondary} 
                />
              </View>
              <Text style={[
                styles.unitName,
                selectedUnit === unit.id && styles.unitNameSelected
              ]}>
                {unit.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={[
            styles.continueButton,
            !selectedUnit && styles.continueButtonDisabled
          ]} 
          onPress={handleContinue}
          disabled={!selectedUnit}
        >
          <Text style={[
            styles.continueButtonText,
            !selectedUnit && styles.continueButtonTextDisabled
          ]}>
            Continuar &gt;
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 32,
  },
  unitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 60,
  },
  unitCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.gray[200],
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  unitCardSelected: {
    borderColor: colors.secondary,
    backgroundColor: colors.secondary + '10',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.secondary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainerSelected: {
    backgroundColor: colors.secondary,
  },
  unitName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 20,
  },
  unitNameSelected: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 'auto',
  },
  continueButtonDisabled: {
    backgroundColor: colors.gray[300],
  },
  continueButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueButtonTextDisabled: {
    color: colors.gray[500],
  },
});

export default BusinessUnitScreen;
