import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../../utils/colors';

const BasicosTab = ({ cliente }) => {
  const [formData, setFormData] = useState({
    tipoDocumento: cliente.tipoDocumento || '',
    numeroDocumento: cliente.documento || '',
    razonSocial: cliente.nombre || '',
    direccion: cliente.direccion || '',
    condicionVenta: cliente.condicionVenta || '',
    plazo: cliente.plazo?.toString() || '',
    canalCliente: cliente.canal || '',
    tipoNegocio: cliente.negocio || '',
    numeroMovil: cliente.whatsapp || '',
    telefono: cliente.telefono || '',
    email: cliente.email || '',
    mostrarVarios: cliente.mostrarVarios || false,
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Tipo de Documento</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.tipoDocumento}
              onValueChange={(value) => updateField('tipoDocumento', value)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccionar" value="" />
              <Picker.Item label="DNI" value="DNI" />
              <Picker.Item label="RUC" value="RUC" />
              <Picker.Item label="CE" value="CE" />
            </Picker>
          </View>
        </View>

        <View style={styles.halfWidth}>
          <Text style={styles.label}>Nro Documento</Text>
          <TextInput
            style={styles.input}
            value={formData.numeroDocumento}
            onChangeText={(value) => updateField('numeroDocumento', value)}
            placeholder="12345678"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Razón Social / Nombre *</Text>
        <TextInput
          style={styles.input}
          value={formData.razonSocial}
          onChangeText={(value) => updateField('razonSocial', value)}
          placeholder="SUSANA JIMENEZ CRUZ"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Dirección *</Text>
        <TextInput
          style={styles.input}
          value={formData.direccion}
          onChangeText={(value) => updateField('direccion', value)}
          placeholder="Av. Chiclayo 780 Las margaritas"
        />
      </View>

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Condición de Venta</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.condicionVenta}
              onValueChange={(value) => updateField('condicionVenta', value)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccionar" value="" />
              <Picker.Item label="CONTADO" value="CONTADO" />
              <Picker.Item label="CREDITO" value="CREDITO" />
            </Picker>
          </View>
        </View>

        <View style={styles.halfWidth}>
          <Text style={styles.label}>Plazo (días)</Text>
          <TextInput
            style={styles.input}
            value={formData.plazo}
            onChangeText={(value) => updateField('plazo', value)}
            placeholder="30"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Canal Cliente</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.canalCliente}
              onValueChange={(value) => updateField('canalCliente', value)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccionar" value="" />
              <Picker.Item label="DIGITAL" value="DIGITAL" />
              <Picker.Item label="TRADICIONAL" value="TRADICIONAL" />
              <Picker.Item label="MIXTO" value="MIXTO" />
            </Picker>
          </View>
        </View>

        <View style={styles.halfWidth}>
          <Text style={styles.label}>Tipo de Negocio</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.tipoNegocio}
              onValueChange={(value) => updateField('tipoNegocio', value)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccionar" value="" />
              <Picker.Item label="BODEGA" value="BODEGA" />
              <Picker.Item label="MINIMARKET" value="MINIMARKET" />
              <Picker.Item label="RESTAURANT" value="RESTAURANT" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Nro Móvil / Whatsapp</Text>
          <TextInput
            style={styles.input}
            value={formData.numeroMovil}
            onChangeText={(value) => updateField('numeroMovil', value)}
            placeholder="Número de teléfono"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.halfWidth}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={formData.telefono}
            onChangeText={(value) => updateField('telefono', value)}
            placeholder="Número de teléfono"
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email de contacto*</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(value) => updateField('email', value)}
          placeholder="ejemplo@gmail.com"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Mostrar como cliente "VARIOS"</Text>
        <Switch
          value={formData.mostrarVarios}
          onValueChange={(value) => updateField('mostrarVarios', value)}
          trackColor={{ false: colors.gray[300], true: colors.primary }}
          thumbColor={formData.mostrarVarios ? colors.white : colors.gray[400]}
        />
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.gray[50],
  },
  picker: {
    height: 48,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 24,
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

export default BasicosTab;
