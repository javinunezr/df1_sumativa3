import React from 'react'
import { formatCLP } from '../utils/format.js'

export default function CartTotal({ items }) {
  const total = items.reduce((acc, item) => acc + (item.offerPrice || item.price), 0)
  return <strong>{formatCLP(total)}</strong>
}