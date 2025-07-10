import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { colors } from '../utils/colors';
import { userData } from '../data/mockData';

const Header = ({ title, subtitle, showNotification = true, onNotificationPress }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userData.iniciales}</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{userData.nombre}</Text>
            <Text style={styles.userRole}>{userData.sucursal}</Text>
          </View>
        </View>
        
        {showNotification && (
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={onNotificationPress}
          >
            <Ionicons name="notifications-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.primary,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  userRole: {
    color: colors.white,
    fontSize: 14,
    opacity: 0.8,
  },
  notificationButton: {
    padding: 8,
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
