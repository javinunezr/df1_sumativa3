// Importación de React
import React from 'react'
// Importación de función utilitaria para formatear precios a CLP
import { formatCLP } from '../utils/format.js'

/**
 * Componente que calcula y muestra el total del carrito
 * Suma todos los precios de los items (considerando ofertas)
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array<Object>} props.items - Array de productos en el carrito
 * @returns {JSX.Element} Total formateado en pesos chilenos
 */
export default function CartTotal({ items }) {
  /**
   * Calcula el total sumando todos los precios de los items
   * Usa reduce para acumular la suma:
   * 
   * reduce(función, valor_inicial):
   * - acc (acumulador): va guardando la suma parcial
   * - item: cada elemento del array en la iteración actual
   * - 0: valor inicial del acumulador
   * 
   * Lógica del precio:
   * - Si existe item.offerPrice, usa ese precio (está en oferta)
   * - Si no existe, usa item.price (precio regular)
   * - Operador || (OR): retorna el primer valor que sea truthy
   * 
   * @type {number}
   */
  const total = items.reduce((acc, item) => acc + (item.offerPrice || item.price), 0)
  
  /**
   * Renderiza el total formateado
   * - formatCLP: convierte el número a formato de pesos chilenos (ej: $59.990)
   * - strong: texto en negrita para destacar el total
   */
  return <strong>{formatCLP(total)}</strong>
}