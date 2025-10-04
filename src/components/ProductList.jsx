import React from 'react';
import { formatCLP } from '../utils/format.js'

// Componente que muestra el catálogo de productos
const ProductList = ({ products, addToCart }) => {
    console.log('ProductList renderizado');
    console.log('Productos:', products);

    return (
        <div>
            {/* Título y cantidad de productos */}
            <h2 style={{ 
                fontSize: '1.8rem', 
                color: '#333',
                marginBottom: '1rem',
                borderBottom: '2px solid #3498db',
                paddingBottom: '0.5rem'
            }}>
                Listado de Productos (Total: {products.length})
            </h2>
            <p>Productos encontrados: {products.length}</p>
            {/* Renderizado condicional: mensaje si no hay productos */}
            {products.length === 0 ? (
                <p>No hay productos para mostrar</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                    {/* Muestra cada producto en una tarjeta */}
                    {products.map(product => (
                        <div key={product.id} style={{ 
                            border: '1px solid #ddd', 
                            borderRadius: '8px', 
                            padding: '1rem',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            {/* Imagen del producto */}
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                style={{ 
                                    width: '100%', 
                                    height: '200px', 
                                    objectFit: 'cover', 
                                    borderRadius: '4px',
                                    marginBottom: '0.5rem'
                                }} 
                                onError={(e) => {
                                    console.log('Error cargando imagen:', product.image);
                                    e.target.style.backgroundColor = '#f0f0f0';
                                    e.target.alt = 'Imagen no disponible';
                                }}
                            />
                            {/* Nombre y descripción */}
                            <h3 style={{ margin: '0.5rem 0', fontSize: '1.1rem' }}>{product.name}</h3>
                            <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.5rem 0' }}>{product.description}</p>
                            {/* Precios y oferta */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                {product.offerPrice ? (
                                    <>
                                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e74c3c' }}>
                                            {formatCLP(product.offerPrice)}
                                        </span>
                                        <span style={{ fontSize: '0.9rem', textDecoration: 'line-through', color: '#999' }}>
                                            {formatCLP(product.price)}
                                        </span>
                                    </>
                                ) : (
                                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        {formatCLP(product.price)}
                                    </span>
                                )}
                            </div>
                            {/* Botón para agregar al carrito */}
                            <button 
                                onClick={() => addToCart(product)} 
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    backgroundColor: '#3498db',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                Agregar al Carrito
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;