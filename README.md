# 🎮 Play & Fun - Tienda de Videojuegos Online

Proyecto de e-commerce desarrollado con React + Vite para la venta de videojuegos, con funcionalidades de catálogo, carrito de compras, filtrado por categorías y formulario de contacto con validaciones.

## 🚀 Tecnologías y Versiones

- **React:** 19.2.0
- **Vite:** 7.1.9
- **React Router DOM:** 7.9.4
- **Bootstrap:** 5.3.8
- **React Bootstrap:** 2.10.10
- **Node.js:** Compatible con versiones modernas (16+)

## ✨ Funcionalidades del Frontend

### 📦 Gestión de Productos
- **Catálogo dinámico:** Carga de productos desde archivo JSON externo (`/videogames.json`)
- **Tarjetas de productos:** Visualización con imagen, nombre, descripción, categoría y precio
- **Precios con descuento:** Sistema de precios regulares y ofertas con badge de descuento
- **Filtrado por categorías:** Filtro dinámico de videojuegos por categoría (Deportes, Acción y Aventura, Terror y Survival, Shooter)

### 🛒 Carrito de Compras
- **Agregar productos:** Funcionalidad para añadir videojuegos al carrito
- **Carrito lateral:** Vista lateral sticky que muestra los productos seleccionados
- **Contador en navbar:** Badge que indica el número de productos en el carrito
- **Eliminar productos:** Posibilidad de quitar items del carrito
- **Cálculo de totales:** Suma automática del total de la compra
- **Renderizado condicional:** El carrito solo se muestra cuando hay productos

### 🎯 Próximos Lanzamientos
- **Página de lanzamientos:** Sección dedicada a juegos próximos a salir
- **Carruseles interactivos:** Carrusel de imágenes por cada juego
- **Fechas de lanzamiento:** Información de cuándo estará disponible cada título
- **Pre-orden:** Funcionalidad para agregar lanzamientos al carrito

### 📧 Formulario de Contacto
- **Validación completa:** Validación en tiempo real de todos los campos
- **Campos validados:**
  - Nombre (mínimo 2 caracteres)
  - Email (formato válido)
  - Asunto (selección obligatoria)
  - Mensaje (mínimo 10 caracteres)
- **Mensajes de error:** Feedback visual con clases Bootstrap `is-invalid`
- **Confirmación de envío:** Mensaje de éxito al enviar el formulario
- **Botón de reset:** Limpieza del formulario
- **Información de contacto:** Datos de la empresa (teléfono, email, dirección, horarios)

### 🎨 Interfaz y Diseño
- **Diseño responsivo:** Compatible con dispositivos móviles, tablets y desktop
- **Bootstrap 5:** Sistema de grid y componentes estilizados
- **Navegación dinámica:** Navbar con menú colapsable y enlaces activos según ruta
- **Etiquetas semánticas:** Estructura HTML5 con `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- **Botón interactivo:** Botón que cambia de color y texto al hacer clic

## 📁 Estructura del Proyecto

```
sumativa3_df1-main/
├── public/
│   ├── videogames.json          # Base de datos de productos y lanzamientos
│   ├── img/                     # Imágenes de videojuegos
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── NavBar.jsx           # Barra de navegación y header
│   │   ├── Footer.jsx           # Pie de página
│   │   ├── VideoGameCard.jsx    # Tarjeta de videojuego
│   │   ├── CategoryFilter.jsx   # Filtro de categorías
│   │   ├── ShoppingCart.jsx     # Carrito de compras
│   │   ├── CartTotal.jsx        # Total del carrito
│   │   └── GameCarousel.jsx     # Carrusel de imágenes
│   ├── pages/
│   │   ├── ProductsPage.jsx     # Página de productos
│   │   ├── LaunchesPage.jsx     # Página de lanzamientos
│   │   └── ContactPage.jsx      # Página de contacto
│   ├── utils/
│   │   └── format.js            # Funciones de formato (CLP)
│   ├── App.jsx                  # Componente principal
│   ├── Main.jsx                 # Punto de entrada React
│   ├── App.css                  # Estilos globales
│   └── index.css                # Estilos base
├── index.html                   # HTML principal
├── vite.config.js               # Configuración de Vite
├── package.json                 # Dependencias y scripts
└── README.md                    # Documentación

```

## 🛠️ Instrucciones de Instalación

### Requisitos Previos
- Node.js 16 o superior
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/javinunezr/df1_sumativa3.git
cd sumativa3_df1-main
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo:**
```bash
npm run dev
```

4. **Abrir en el navegador:**
```
http://localhost:3000
```

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera el build de producción
- `npm run preview` - Previsualiza el build de producción
- `npm run deploy` - Despliega a GitHub Pages

## 🌐 Demo en Vivo

🔗 **[Ver demo en GitHub Pages](https://javinunezr.github.io/df1_sumativa3/)**

## 📱 Compatibilidad Responsiva

El sitio es completamente responsivo y funciona en:
- 📱 Móviles (320px - 767px)
- 📱 Tablets (768px - 991px)
- 💻 Desktop (992px+)

---


