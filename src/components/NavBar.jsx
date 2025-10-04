import React from 'react'

export default function Navbar({ count }) {
  return (
    <header style={{ position: 'sticky', top: 0, background: '#111', color: 'white', zIndex: 10 }}>
      <nav style={{ maxWidth: 1100, margin: '0 auto', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 700, letterSpacing: 0.2 }}>Tienda de productos</span>
        <div aria-live="polite" aria-atomic="true" style={{ fontSize: 14 }}>
          🛒 Carrito: <strong>{count}</strong> {count === 1 ? 'producto' : 'productos'}
        </div>
      </nav>
    </header>
  )
}