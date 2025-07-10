import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';

const GeograficosTab = ({ cliente }) => {
  const [formData, setFormData] = useState({
    nombreLugar: cliente.nombreLugar || '',
    latitud: cliente.latitud || '',
    longitud: cliente.longitud || '',
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = () => {
    Alert.alert('Subir imagen', 'Funcionalidad de cámara próximamente');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre del lugar</Text>
        <TextInput
          style={styles.input}
          value={formData.nombreLugar}
          onChangeText={(value) => updateField('nombreLugar', value)}
          placeholder="Ej Mi oficina, Casa, etc"
        />
      </View>

      <View style={styles.instructionContainer}>
        <Ionicons name="information-circle" size={16} color={colors.warning} />
        <Text style={styles.instructionText}>
          Instrucciones: Haz clic en cualquier punto del mapa para seleccionar 
          una ubicación. Las coordenadas se completarán automáticamente.
        </Text>
      </View>

      {/* Simulación del mapa */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={48} color={colors.gray[400]} />
          <Text style={styles.mapText}>Mapa interactivo</Text>
          <Text style={styles.mapSubtext}>Toca para seleccionar ubicación</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Latitud</Text>
          <TextInput
            style={styles.input}
            value={formData.latitud}
            onChangeText={(value) => updateField('latitud', value)}
            placeholder="-12.0464"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.halfWidth}>
          <Text style={styles.label}>Longitud</Text>
          <TextInput
            style={styles.input}
            value={formData.longitud}
            onChangeText={(value) => updateField('longitud', value)}
            placeholder="-77.0426"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Imagen de la Dirección</Text>
        <TouchableOpacity style={styles.imageUpload} onPress={handleImageUpload}>
          <View style={styles.imageUploadContent}>
            <Ionicons name="camera" size={32} color={colors.gray[400]} />
            <Text style={styles.imageUploadText}>Haz clic para subir una imagen</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>GUARDAR CLIENTE</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
  },
  formGroup: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: colors.gray[50],
  },
  instructionContainer: {
    flexDirection: 'row',
    backgroundColor: colors.warning + '20',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  instructionText: {
    fontSize: 12,
    color: colors.warning,
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
  mapContainer: {
    marginBottom: 16,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 16,
    color: colors.gray[600],
    marginTop: 8,
  },
  mapSubtext: {
    fontSize: 12,
    color: colors.gray[400],
    marginTop: 4,
  },
  imageUpload: {
    borderWidth: 2,
    borderColor: colors.error,
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  imageUploadContent: {
    alignItems: 'center',
  },
  imageUploadText: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 8,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 100,
  },
});

export default GeograficosTab;
