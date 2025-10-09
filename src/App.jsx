// Importaciones de React y hooks necesarios
import React, { useState, useEffect } from 'react';
// Importación de componentes de React Router para navegación SPA
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importación de componentes propios
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import LaunchesPage from './pages/LaunchesPage';
import ContactPage from './pages/ContactPage';
import ShoppingCart from './components/ShoppingCart';
// Importación de estilos de Bootstrap (CSS y JavaScript)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Importación de estilos personalizados de la aplicación
import './App.css';

/**
 * Componente principal de la aplicación
 * Maneja el enrutamiento, el estado global del carrito y la estructura general
 * 
 * @returns {JSX.Element} Componente App completo con Router y rutas
 */
function App() {
    // ========== ESTADOS DEL COMPONENTE ==========
    
    /**
     * Estado que almacena todos los productos agregados al carrito
     * Cada item tiene un cartId único para diferenciarlo aunque sea el mismo producto
     * @type {Array<Object>}
     */
    const [cartItems, setCartItems] = useState([]);
    
    /**
     * Estado que controla si el botón interactivo ha sido clickeado
     * Se usa para demostrar interactividad y cambio de estado
     * @type {boolean}
     */
    const [buttonClicked, setButtonClicked] = useState(false);

    // ========== FUNCIONES DE MANEJO DEL CARRITO ==========
    
    /**
     * Agrega un producto al carrito de compras
     * Crea una copia del producto y le asigna un ID único (cartId) basado en timestamp
     * Esto permite agregar el mismo producto múltiples veces como items separados
     * 
     * @param {Object} product - Objeto del producto con propiedades (id, name, price, etc.)
     */
    const addToCart = (product) => {
        // Spread operator (...) para crear una copia del array y del objeto
        // Date.now() genera un ID único basado en milisegundos actuales
        setCartItems([...cartItems, { ...product, cartId: Date.now() }]);
    };

    /**
     * Elimina un producto específico del carrito usando su cartId único
     * Usa filter para crear un nuevo array sin el item eliminado
     * 
     * @param {number} cartId - ID único del item en el carrito (no el ID del producto)
     */
    const removeFromCart = (cartId) => {
        // filter retorna un nuevo array sin el elemento que coincide con el cartId
        setCartItems(cartItems.filter(item => item.cartId !== cartId));
    };

    // ========== RENDERIZADO DEL COMPONENTE ==========
    return (
        // Router: Componente que habilita la navegación por rutas en la aplicación
        <Router>
            <div className="App">
                {/* Barra de navegación que muestra el contador de productos en el carrito */}
                <NavBar count={cartItems.length} />
                
                {/* Contenedor principal de la aplicación */}
                <main>
                    <div className="container-fluid">
                        <div className="row">
                            {/* 
                                Columna principal que contiene las páginas
                                Se ajusta dinámicamente: si hay items en el carrito ocupa 9 columnas,
                                si no hay items ocupa las 12 columnas (ancho completo)
                            */}
                            <div className={cartItems.length > 0 ? "col-lg-9 col-md-8" : "col-12"}>
                                {/* 
                                    Routes: Define todas las rutas de la aplicación
                                    Cada Route mapea una URL a un componente específico
                                */}
                                <Routes>
                                    {/* Ruta principal "/" - Muestra el catálogo de productos */}
                                    <Route 
                                        path="/" 
                                        element={<ProductsPage onAddToCart={addToCart} />} 
                                    />
                                    {/* Ruta "/lanzamientos" - Muestra próximos lanzamientos */}
                                    <Route 
                                        path="/lanzamientos" 
                                        element={<LaunchesPage onAddToCart={addToCart} />} 
                                    />
                                    {/* Ruta "/contacto" - Muestra formulario de contacto */}
                                    <Route 
                                        path="/contacto" 
                                        element={<ContactPage />} 
                                    />
                                </Routes>
                            </div>

                            {/* 
                                Carrito de compras lateral
                                Renderizado condicional: solo se muestra si hay productos en el carrito
                                Usa el operador && para evaluar la condición
                            */}
                            {cartItems.length > 0 && (
                                <div className="col-lg-3 col-md-4">
                                    {/* 
                                        sticky-top: Hace que el carrito se mantenga visible al hacer scroll
                                        top: 80px: Ajusta la posición para no tapar el navbar
                                        maxHeight y overflowY: Limita altura y permite scroll interno
                                    */}
                                    <div className="sticky-top" style={{ top: '80px', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
                                        <div className="p-2">
                                            <h5 className="text-center mb-2">🛒 Tu Carrito</h5>
                                            {/* 
                                                Componente ShoppingCart: Muestra los productos en el carrito
                                                Props:
                                                - cartItems: Array de productos en el carrito
                                                - removeFromCart: Función para eliminar items
                                            */}
                                            <ShoppingCart 
                                                products={[]}
                                                cartItems={cartItems}
                                                addToCart={addToCart}
                                                removeFromCart={removeFromCart}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 
                        Botón interactivo de demostración
                        Cambia de color y texto cuando se hace clic
                        Ejemplo de manejo de estado local (buttonClicked)
                    */}
                    <div className="container text-center my-4">
                        <button 
                            // onClick: Alterna el estado entre true/false usando el operador NOT (!)
                            onClick={() => setButtonClicked(!buttonClicked)}
                            // className dinámica: cambia entre btn-success y btn-primary según el estado
                            className={`btn ${buttonClicked ? 'btn-success' : 'btn-primary'} btn-lg`}
                        >
                            {/* Texto condicional: cambia según el estado del botón */}
                            {buttonClicked ? '¡Gracias por visitar Play & Fun!' : '¡Haz clic para saludarnos!'}
                        </button>
                        {/* 
                            Renderizado condicional: solo muestra el mensaje si buttonClicked es true
                        */}
                        {buttonClicked && (
                            <p className="mt-3 text-muted">
                                ¡Disfruta navegando por nuestra tienda de videojuegos! 🎮
                            </p>
                        )}
                    </div>
                </main>

                {/* Pie de página de la aplicación */}
                <Footer />
            </div>
        </Router>
    );
}

export default App;