import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import ShoppingCart from './components/ShoppingCart';
import './App.css';

function App() {
    // Estado para la lista de productos del catálogo
    const [products, setProducts] = useState([]);
    // Estado para los productos seleccionados en el carrito
    const [cartItems, setCartItems] = useState([]);
    // Estado para el botón interactivo
    const [buttonClicked, setButtonClicked] = useState(false);

    // useEffect para simular la carga de productos desde un archivo JSON externo
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data)); // Actualiza el estado de productos al cargar los datos
    }, []);

    // Agrega un producto al carrito
    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    // Elimina un producto del carrito por su id
    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
    };

    return (
        <div className="App">
            <NavBar count={cartItems.length} />
            <main style={{ maxWidth: 1100, margin: '0 auto', padding: '1rem' }}>
                {/* Título principal */}
                <h1 style={{ 
                    marginBottom: '0.5rem',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}>
                    Tienda React
                </h1>
                {/* Subtítulo descriptivo */}
                <p style={{ 
                    marginTop: 0, 
                    color: '#555', 
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    marginBottom: '2rem'
                }}>
                    Componentes funcionales + useState + renderizado condicional.
                </p>
                {/* Botón interactivo que cambia de texto y color al hacer clic */}
                <button 
                    onClick={() => setButtonClicked(!buttonClicked)}
                    style={{
                        marginBottom: '2rem',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: buttonClicked ? '#e74c3c' : '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                    }}
                >
                    {buttonClicked ? '¡Gracias por hacer clic!' : 'Haz clic aquí'}
                </button>
                {/* Componente principal del carrito y catálogo */}
                <ShoppingCart 
                    products={products}
                    cartItems={cartItems}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            </main>
        </div>
    );
}

export default App;