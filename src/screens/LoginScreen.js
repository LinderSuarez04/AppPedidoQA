import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../context/AuthContext';
import { colors } from '../utils/colors';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    user: '',
    password: '',
    fechaProceso: new Date()
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      updateField('fechaProceso', selectedDate);
    }
  };

  const handleLogin = () => {
    if (!formData.user || !formData.password) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }
    
    // Simulación de login exitoso
    login({
      username: formData.user,
      fechaProceso: formData.fechaProceso
    });
    navigation.navigate('BusinessUnit');
  };

  const handleForgotPassword = () => {
    Alert.alert('Recuperar contraseña', 'Función próximamente disponible');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <View style={styles.logoInner}>
              <Text style={styles.logoText}>J</Text>
            </View>
          </View>
          <Text style={styles.companyText}>COMPANY</Text>
        </View>

        <Text style={styles.title}>LOGIN</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>User</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={colors.gray[400]} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.user}
                onChangeText={(value) => updateField('user', value)}
                placeholder="Ingrese su usuario"
                placeholderTextColor={colors.gray[400]}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.gray[400]} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(value) => updateField('password', value)}
                placeholder="Ingrese su contraseña"
                placeholderTextColor={colors.gray[400]}
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fecha Proceso</Text>
            <TouchableOpacity 
              style={styles.inputContainer}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={20} color={colors.gray[400]} style={styles.inputIcon} />
              <Text style={styles.dateText}>
                {formatDate(formData.fechaProceso)}
              </Text>
              <Ionicons name="calendar" size={20} color={colors.gray[400]} style={styles.calendarIcon} />
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={formData.fechaProceso}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>¿Olvidó su contraseña?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  companyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    letterSpacing: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    backgroundColor: colors.gray[50],
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text.primary,
  },
  calendarIcon: {
    marginLeft: 8,
  },
  dateText: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text.primary,
  },
  loginButton: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    textAlign: 'center',
    color: colors.secondary,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
