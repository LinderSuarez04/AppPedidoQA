import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProps, BusinessUnit, User } from '../types';

interface NavigationOptions {
  businessUnitCode?: string;
  userRole?: string;
}

class NavigationManager {
  private static instance: NavigationManager;
  private navigation: NavigationProps | null = null;
  private currentUser: User | null = null;
  private currentBusinessUnit: BusinessUnit | null = null;

  private constructor() {
    this.initializeFromStorage();
  }

  public static getInstance(): NavigationManager {
    if (!NavigationManager.instance) {
      NavigationManager.instance = new NavigationManager();
    }
    return NavigationManager.instance;
  }

  public setNavigation(navigation: NavigationProps): void {
    this.navigation = navigation;
  }

  private async initializeFromStorage(): Promise<void> {
    try {
      const userJson = await AsyncStorage.getItem('user');
      const businessUnitJson = await AsyncStorage.getItem('selectedBusinessUnit');

      if (userJson) {
        this.currentUser = JSON.parse(userJson);
      }

      if (businessUnitJson) {
        this.currentBusinessUnit = JSON.parse(businessUnitJson);
      }
    } catch (error) {
      console.error('Error loading data from storage:', error);
    }
  }

  public async navigateToBusinessUnit(options: NavigationOptions = {}): Promise<void> {
    const businessUnitCode = options.businessUnitCode || this.currentBusinessUnit?.code;
    
    if (!businessUnitCode) {
      console.error('No business unit selected');
      return;
    }

    if (!this.navigation) {
      console.error('Navigation not set');
      return;
    }

    // Navegar según el código de la unidad de negocio
    switch (businessUnitCode) {
      case 'RESTAURANT':
        this.navigation.navigate('Clientes');
        break;
      case 'DELIVERY':
        this.navigation.navigate('Clientes');
        break;
      case 'CATERING':
        this.navigation.navigate('Clientes');
        break;
      default:
        this.navigation.navigate('Clientes');
    }
  }

  public async redirectAfterLogin(): Promise<void> {
    if (this.currentBusinessUnit) {
      await this.navigateToBusinessUnit();
    } else if (this.navigation) {
      this.navigation.navigate('BusinessUnit');
    }
  }

  public async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('selectedBusinessUnit');
      
      this.currentUser = null;
      this.currentBusinessUnit = null;
      
      if (this.navigation) {
        this.navigation.replace('Login');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public getCurrentBusinessUnit(): BusinessUnit | null {
    return this.currentBusinessUnit;
  }

  public async setCurrentUser(user: User): Promise<void> {
    this.currentUser = user;
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  }

  public async setCurrentBusinessUnit(businessUnit: BusinessUnit): Promise<void> {
    this.currentBusinessUnit = businessUnit;
    try {
      await AsyncStorage.setItem('selectedBusinessUnit', JSON.stringify(businessUnit));
    } catch (error) {
      console.error('Error saving business unit to storage:', error);
    }
  }
}

export default NavigationManager;