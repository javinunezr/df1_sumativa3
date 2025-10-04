import React from 'react'
import { formatCLP } from '../utils/format.js'

export default function ProductCard({ product, onAdd }) {
  const { name, price, offerPrice, description, image } = product
  return (
    <article style={{ border: '1px solid #eee', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <img src={image} alt={name} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 8 }} />
      <h3 style={{ margin: '0.25rem 0' }}>{name}</h3>
      <p style={{ margin: 0, color: '#555', fontSize: 14 }}>{description}</p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ textDecoration: 'line-through', color: '#777', fontSize: 14 }}>{formatCLP(price)}</span>
        <span style={{ fontWeight: 700 }}>{formatCLP(offerPrice)}</span>
      </div>
      <button onClick={() => onAdd(product)} style={{ marginTop: 'auto', padding: '0.5rem 0.75rem', borderRadius: 8, border: '1px solid #222', background: '#111', color: 'white', cursor: 'pointer' }}>
        Agregar al carrito
      </button>
    </article>
  )
}