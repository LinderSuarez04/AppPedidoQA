# App de Pedidos - Cliente Management

Una aplicación móvil moderna para gestionar clientes, pedidos y cobranza, desarrollada con React Native y Expo.

## 🚀 Características

### ✅ Implementado
- **Gestión de Clientes**: Lista, búsqueda y detalles de clientes
- **Navegación por pestañas**: Interfaz moderna con navegación inferior
- **Detalle del cliente con tabs**:
  - Básicos: Información general del cliente
  - Contacto: Datos de contacto (en desarrollo)
  - Geográficos: Ubicación y mapas
  - Actividad: Deuda, pedidos y devoluciones
- **Diseño responsivo**: Interfaz adaptada para móviles
- **Componentes modulares**: Estructura bien organizada y reutilizable

### 🔄 En Desarrollo
- Integración con API real
- Funcionalidad de cámara para imágenes
- Mapas interactivos con geolocalización
- Sincronización offline
- Notificaciones push

## 📱 Pantallas

1. **Dashboard Principal**: Lista de clientes con información resumida
2. **Búsqueda de Clientes**: Búsqueda avanzada con filtros
3. **Detalle del Cliente**: Vista completa con pestañas organizadas
4. **Actividad del Cliente**: Deuda, pedidos y devoluciones

## 🛠️ Tecnologías

- **React Native**: Framework principal
- **Expo**: Plataforma de desarrollo
- **React Navigation**: Navegación entre pantallas
- **Vector Icons**: Iconografía consistente
- **JavaScript ES6+**: Sintaxis moderna

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── tabs/           # Componentes de pestañas
│   ├── Header.js       # Cabecera de la app
│   ├── ClienteCard.js  # Tarjeta de cliente
│   ├── SearchBar.js    # Barra de búsqueda
│   └── BottomNavigation.js
├── screens/            # Pantallas principales
│   ├── ClientesScreen.js
│   ├── ClientesSearchScreen.js
│   └── ClienteDetailScreen.js
├── navigation/         # Configuración de navegación
├── data/              # Datos mock y modelos
├── utils/             # Utilidades y estilos
│   ├── colors.js      # Paleta de colores
│   └── styles.js      # Estilos globales
```

## 🎨 Diseño

### Paleta de Colores
- **Primary**: #4A5FBF (Azul principal)
- **Secondary**: #5DBAFF (Azul claro)
- **Accent**: #58D3FF (Azul acento)
- **Success**: #4CAF50 (Verde)
- **Warning**: #FF9800 (Naranja)
- **Error**: #F44336 (Rojo)

### Componentes de UI
- Cards con sombras sutiles
- Botones con estados hover
- Inputs con bordes redondeados
- Badges de estado colorados
- Navegación con iconos intuitivos

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start

# Compilar para Android
npm run android

# Compilar para iOS
npm run ios

# Compilar para web
npm run web
```

## 📋 Datos Mock

La aplicación incluye datos de ejemplo para:
- 4 clientes con información completa
- Facturas pendientes
- Historial de pedidos
- Registro de devoluciones

## 🔧 Próximas Mejoras

- [ ] Integración con backend
- [ ] Autenticación de usuarios
- [ ] Sincronización en tiempo real
- [ ] Cámara y galería de imágenes
- [ ] Geolocalización y mapas
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Reportes y analytics

## 👨‍💻 Desarrollo

La aplicación está estructurada siguiendo las mejores prácticas de React Native:
- Componentes funcionales con hooks
- Navegación declarativa
- Estado local con useState
- Estilos modulares y reutilizables
- Arquitectura escalable

## 📄 Licencia

Este proyecto es privado y confidencial.
