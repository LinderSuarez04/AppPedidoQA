// Interfaces compartidas para el proyecto

export interface Pedido {
  id: string;
  cliente: string;
  estado: string;
  fecha: string;
  monto: number;
}

export interface Factura {
  id: string;
  numero: string;
  fechaEmision: string;
  fechaVencimiento: string;
  monto: number;
  diasAtraso: number;
}

export interface Cliente {
  id: number;
  nombre: string;
  direccion: string;
  tipo: string;
  negocio: string;
  canal: string;
  telefono: string;
  whatsapp: string;
  email: string;
  documento: string;
  tipoDocumento: string;
  condicionVenta: string;
  plazo: number;
  latitud: string;
  longitud: string;
  nombreLugar: string;
  deuda: number;
  mostrarVarios: boolean;
  pedidos: Pedido[];
  facturas: Factura[];
}

export interface User {
  id: number;
  username: string;
  role: string;
}

export interface BusinessUnit {
  id: number;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
  user?: User;
}

// Tipos para navegación
export type RootStackParamList = {
  Login: undefined;
  BusinessUnit: undefined;
  Clientes: undefined;
  ClienteDetail: { cliente: Cliente };
  ClientesSearch: undefined;
};

export type NavigationProps = {
  navigate: (screen: keyof RootStackParamList, params?: any) => void;
  goBack: () => void;
  replace: (screen: keyof RootStackParamList, params?: any) => void;
};
