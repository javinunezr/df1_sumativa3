import React from 'react';
import ProductList from './ProductList';
import CartTotal from './CartTotal';
import { formatCLP } from '../utils/format.js'

// Componente principal que muestra el carrito y el catálogo de productos
export default function ShoppingCart({ products, cartItems, addToCart, removeFromCart }) {
  return (
    <div>
      <section style={{ marginTop: '2rem' }}>
        {/* Título del carrito */}
        <h2 style={{ 
          fontSize: '1.8rem', 
          color: '#333',
          marginBottom: '1rem',
          borderBottom: '2px solid #3498db',
          paddingBottom: '0.5rem'
        }}>
          Carrito
        </h2>
        {/* Renderizado condicional: mensaje si el carrito está vacío */}
        {cartItems.length === 0 ? (
          <p style={{ color: '#555' }}>Tu carrito está vacío. Agrega productos desde el listado.</p>
        ) : (
          <div>
            {/* Lista de productos en el carrito */}
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
              {cartItems.map((item) => (
                <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #eee', borderRadius: 12, padding: 8 }}>
                  {/* Imagen y datos del producto en el carrito */}
                  <img src={item.image} alt={item.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: '#555' }}>{formatCLP(item.offerPrice || item.price)}</div>
                  </div>
                  {/* Botón para quitar producto del carrito */}
                  <button onClick={() => removeFromCart(item.id)} style={{ padding: '0.4rem 0.6rem', borderRadius: 8, border: '1px solid #c00', background: 'white', color: '#c00', cursor: 'pointer' }}>
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
            {/* Total del carrito */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
              <span>Total:</span> <CartTotal items={cartItems} />
            </div>
          </div>
        )}
      </section>
      {/* Catálogo de productos */}
      <ProductList products={products} addToCart={addToCart} />
    </div>
  )
}