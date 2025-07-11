import React, { useState, FC } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../utils/colors';
import { LoginCredentials, LoginResponse, NavigationProps } from '../types';

interface LoginScreenProps {
  navigation: NavigationProps;
}

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [processDate, setProcessDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateCredentials = (credentials: LoginCredentials): boolean => {
    if (credentials.username.length === 0 || credentials.password.length === 0) {
      return false;
    }
    
    // Validar que la fecha sea válida
    if (!validateDate(processDate)) {
      const today = new Date();
      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 3);
      showError(`La fecha debe estar entre ${formatDate(today)} y ${formatDate(maxDate)}`);
      return false;
    }
    
    return true;
  };

  // Función para formatear la fecha
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Función para validar que la fecha esté en el rango permitido
  const validateDate = (selectedDate: Date): boolean => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 3);

    // Resetear las horas para comparar solo fechas
    today.setHours(0, 0, 0, 0);
    maxDate.setHours(23, 59, 59, 999);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate >= today && selectedDate <= maxDate;
  };

  // Manejar cambio de fecha
  const onDateChange = (event: any, selectedDate?: Date): void => {
    setShowDatePicker(Platform.OS === 'ios');
    
    if (selectedDate) {
      if (validateDate(selectedDate)) {
        setProcessDate(selectedDate);
      } else {
        const today = new Date();
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 3);
        
        showError(`La fecha debe estar entre ${formatDate(today)} y ${formatDate(maxDate)}`);
      }
    }
  };

  // Mostrar selector de fecha
  const showDatePickerHandler = (): void => {
    setShowDatePicker(true);
  };

  const authenticateUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // Simulación de autenticación para desarrollo
    // En producción esto sería una llamada a la API real
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.username === 'admin' && credentials.password === 'admin') {
          resolve({
            success: true,
            token: 'fake-jwt-token',
            user: {
              id: 1,
              username: credentials.username,
              role: 'admin'
            }
          });
        } else {
          resolve({
            success: false,
            message: 'Credenciales inválidas'
          });
        }
      }, 1000);
    });
  };

  const handleSuccessfulLogin = (response: LoginResponse): void => {
    if (response.token && response.user) {
      // En una app real, guardarías esto en AsyncStorage
      // AsyncStorage.setItem('authToken', response.token);
      // AsyncStorage.setItem('user', JSON.stringify(response.user));
    }
    
    // Redirigir a la selección de unidad de negocio
    navigation.navigate('BusinessUnit');
  };

  const showError = (message: string): void => {
    Alert.alert('Error', message);
  };

  const handleLogin = async (): Promise<void> => {
    const credentials: LoginCredentials = {
      username: username.trim(),
      password: password.trim()
    };

    if (credentials.username.length === 0 || credentials.password.length === 0) {
      showError('Por favor, complete todos los campos');
      return;
    }

    if (!validateCredentials(credentials)) {
      return; // El error ya se mostró en validateCredentials
    }

    setIsLoading(true);

    try {
      const response: LoginResponse = await authenticateUser(credentials);
      
      if (response.success) {
        handleSuccessfulLogin(response);
      } else {
        showError(response.message || 'Credenciales inválidas');
      }
    } catch (error) {
      showError('Error de conexión. Inténtalo de nuevo.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo y título */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>JLT</Text>
            </View>
            <Text style={styles.companyText}>COMPANY</Text>
          </View>
          <Text style={styles.loginTitle}>LOGIN</Text>
        </View>
        
        {/* Formulario */}
        <View style={styles.form}>
          {/* Campo Usuario */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>User</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color={colors.text.secondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ingrese su usuario"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={colors.text.secondary}
              />
            </View>
          </View>

          {/* Campo Contraseña */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.text.secondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ingrese su contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={colors.text.secondary}
              />
            </View>
          </View>

          {/* Campo Fecha Proceso */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Fecha Proceso</Text>
            <TouchableOpacity style={styles.inputWrapper} onPress={showDatePickerHandler}>
              <Ionicons name="calendar-outline" size={20} color={colors.text.secondary} style={styles.inputIcon} />
              <Text style={[styles.input, styles.dateText]}>
                {formatDate(processDate)}
              </Text>
              <TouchableOpacity style={styles.calendarButton} onPress={showDatePickerHandler}>
                <Ionicons name="calendar" size={20} color={colors.text.secondary} />
              </TouchableOpacity>
            </TouchableOpacity>
            <Text style={styles.dateHelpText}>
              Selecciona una fecha entre hoy y {formatDate((() => {
                const maxDate = new Date();
                maxDate.setDate(maxDate.getDate() + 3);
                return maxDate;
              })())}
            </Text>
          </View>

          {/* Selector de fecha */}
          {showDatePicker && (
            <DateTimePicker
              value={processDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
              minimumDate={new Date()}
              maximumDate={(() => {
                const maxDate = new Date();
                maxDate.setDate(maxDate.getDate() + 3);
                return maxDate;
              })()}
            />
          )}

          {/* Botón Login */}
          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Iniciando sesión...' : 'Login'}
            </Text>
          </TouchableOpacity>

          {/* Enlace olvidó contraseña */}
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>¿Olvidó su contraseña?</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#1e88e5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  companyText: {
    color: '#1e88e5',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    marginBottom: 0,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 2,
    minHeight: 48,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: '#333',
  },
  calendarButton: {
    padding: 6,
  },
  dateText: {
    color: '#333',
  },
  dateHelpText: {
    fontSize: 11,
    color: '#666',
    marginTop: 3,
    fontStyle: 'italic',
  },
  loginButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotPasswordText: {
    color: '#1e88e5',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;