export const clientesData = [
  {
    id: 1,
    nombre: "SUSANA JIMENEZ CRUZ",
    direccion: "Av. Chiclayo 780 Las margaritas",
    tipo: "PREFERENCIAL",
    negocio: "MINIMARKET",
    canal: "DIGITAL",
    telefono: "987654321",
    whatsapp: "987654321",
    email: "susana@example.com",
    documento: "12345678",
    tipoDocumento: "DNI",
    condicionVenta: "CREDITO",
    plazo: 30,
    latitud: "-12.0464",
    longitud: "-77.0426",
    nombreLugar: "Tienda Susana",
    deuda: 2500,
    mostrarVarios: true,
    pedidos: [
      {
        id: "PED001-2025",
        cliente: "Javier López - Sucursal Central",
        estado: "Entregado",
        fecha: "19/04/2025 - 08:30 AM",
        monto: 1500.00
      },
      {
        id: "PED002-2025",
        cliente: "Javier López - Sucursal Central",
        estado: "En proceso",
        fecha: "28/04/2025 - 02:30 PM",
        monto: 800.00
      }
    ],
    facturas: [
      {
        id: "F001-245021",
        numero: "200237 - N08",
        fechaEmision: "20/04/25",
        fechaVencimiento: "20/04/25",
        monto: 500.00,
        diasAtraso: 2
      },
      {
        id: "F002-245451",
        numero: "200237 - N08",
        fechaEmision: "10/03/25",
        fechaVencimiento: "20/04/25",
        monto: 100.00,
        diasAtraso: 10
      }
    ],
    devoluciones: [
      {
        id: "DEV001-2025",
        motivo: "Producto defectuoso",
        fecha: "12/05/2025",
        estado: "Procesada",
        monto: -150.00
      },
      {
        id: "DEV002-2025",
        motivo: "Error en pedido",
        fecha: "08/05/2025",
        estado: "Procesada",
        monto: -80.50
      }
    ]
  },
  {
    id: 2,
    nombre: "JUAN PEREZ SEGUNDO",
    direccion: "Av. Chiclayo 780 Las margaritas",
    tipo: "NUEVO",
    negocio: "BODEGA",
    canal: "TRADICIONAL",
    telefono: "912345678",
    whatsapp: "912345678",
    email: "juan@example.com",
    documento: "87654321",
    tipoDocumento: "DNI",
    condicionVenta: "CONTADO",
    plazo: 0,
    latitud: "-12.0500",
    longitud: "-77.0500",
    nombreLugar: "Bodega Juan",
    deuda: 0,
    mostrarVarios: false,
    pedidos: [],
    facturas: [],
    devoluciones: []
  },
  {
    id: 3,
    nombre: "JOSE SANCHEZ QUISPE",
    direccion: "Av. Chiclayo 780 Las margaritas",
    tipo: "REGULAR",
    negocio: "MINIMARKET",
    canal: "MIXTO",
    telefono: "965432178",
    whatsapp: "965432178",
    email: "jose@example.com",
    documento: "45612378",
    tipoDocumento: "DNI",
    condicionVenta: "CREDITO",
    plazo: 15,
    latitud: "-12.0400",
    longitud: "-77.0400",
    nombreLugar: "Minimarket José",
    deuda: 800,
    mostrarVarios: true,
    pedidos: [],
    facturas: [],
    devoluciones: []
  },
  {
    id: 4,
    nombre: "LUIS MENDOZA LEÓN",
    direccion: "Av. Chiclayo 780 Las margaritas",
    tipo: "VIP",
    negocio: "BODEGA",
    canal: "DIGITAL",
    telefono: "923456789",
    whatsapp: "923456789",
    email: "luis@example.com",
    documento: "78945612",
    tipoDocumento: "DNI",
    condicionVenta: "CREDITO",
    plazo: 45,
    latitud: "-12.0600",
    longitud: "-77.0600",
    nombreLugar: "Bodega Luis",
    deuda: 0,
    mostrarVarios: false,
    pedidos: [],
    facturas: [],
    devoluciones: []
  }
];

export const userData = {
  nombre: "Javier López",
  sucursal: "Vendedor - Sucursal Central",
  iniciales: "JL"
};
