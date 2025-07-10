import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

const ContactoTab = ({ cliente }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emptyText}>Información de contacto</Text>
        <Text style={styles.subtitle}>Esta sección estará disponible próximamente</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.light,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default ContactoTab;
