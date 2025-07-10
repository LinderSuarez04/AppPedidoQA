import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import BusinessUnitScreen from '../screens/BusinessUnitScreen';
import MainTabNavigator from './MainTabNavigator';
import ClienteDetailScreen from '../screens/ClienteDetailScreen';
import ClientesSearchScreen from '../screens/ClientesSearchScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="BusinessUnit" component={BusinessUnitScreen} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="ClienteDetail" component={ClienteDetailScreen} />
        <Stack.Screen name="ClientesSearch" component={ClientesSearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
