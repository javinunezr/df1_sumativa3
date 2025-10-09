// Importación de React
import React from 'react';
// Importación de componentes propios
import CartTotal from './CartTotal';
// Importación de función utilitaria para formatear precios
import { formatCLP } from '../utils/format.js';

/**
 * Componente del carrito de compras
 * Muestra los productos agregados al carrito con opción de eliminarlos
 * Incluye el total de la compra
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array<Object>} props.cartItems - Array de productos en el carrito
 * @param {Function} props.removeFromCart - Función callback para eliminar un producto del carrito
 * @returns {JSX.Element} Card con la lista de productos en el carrito y el total
 */
export default function ShoppingCart({ cartItems, removeFromCart }) {
  // ========== RENDERIZADO CONDICIONAL PARA CARRITO VACÍO ==========
  
  /**
   * Si no hay items en el carrito, muestra un mensaje indicándolo
   * return temprano: detiene la ejecución y no renderiza el resto del componente
   */
  if (cartItems.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <h5 className="card-title">Tu carrito está vacío</h5>
          <p className="card-text text-muted">Agrega productos desde el catálogo para comenzar.</p>
        </div>
      </div>
    );
  }

  // ========== RENDERIZADO DEL CARRITO CON PRODUCTOS ==========
  return (
    <div className="card">
      {/* Encabezado de la card del carrito */}
      <div className="card-header">
        <h5 className="mb-0">🛒 Productos en tu carrito</h5>
      </div>
      
      <div className="card-body">
        {/* 
          Contenedor de lista de productos
          - d-flex flex-column: layout flexbox vertical
          - gap-2: espacio de 2 unidades entre elementos
        */}
        <div className="d-flex flex-column gap-2">
          {/* 
            Mapea el array de cartItems para crear una tarjeta por cada producto
            map: itera y retorna un elemento JSX por cada item
          */}
          {cartItems.map((item) => (
            // Mini-card para cada producto en el carrito
            // key: usa cartId único (no el id del producto) para diferenciar items duplicados
            <div key={item.cartId} className="card">
              {/* p-2: padding reducido para vista compacta */}
              <div className="card-body p-2">
                {/* 
                  Grid de Bootstrap para organizar imagen y detalles
                  - align-items-center: alinea verticalmente al centro
                */}
                <div className="row align-items-center">
                  {/* Columna de la imagen (25% del ancho) */}
                  <div className="col-3">
                    <img 
                      src={item.image} 
                      // img-fluid: imagen responsiva, rounded: bordes redondeados
                      className="img-fluid rounded" 
                      alt={item.name}
                      // Estilos inline para tamaño y presentación
                      style={{ height: '50px', objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                    />
                  </div>
                  
                  {/* Columna de detalles del producto (75% del ancho) */}
                  <div className="col-9">
                    {/* Nombre del producto - small: texto más pequeño */}
                    <h6 className="card-title mb-1 text-start small">{item.name}</h6>
                    
                    {/* Categoría del producto */}
                    <p className="card-text text-muted small mb-1">{item.category}</p>
                    
                    {/* Sección de precios con renderizado condicional */}
                    <div className="price-section mb-2">
                      {/* Verifica si hay precio de oferta Y si es menor al precio regular */}
                      {item.offerPrice && item.offerPrice < item.price ? (
                        // Si hay oferta, muestra ambos precios
                        <div>
                          {/* Precio original tachado */}
                          <span className="text-decoration-line-through text-muted me-1 small">
                            {formatCLP(item.price)}
                          </span>
                          <br />
                          {/* Precio de oferta en rojo */}
                          <span className="fw-bold text-danger small">
                            {formatCLP(item.offerPrice)}
                          </span>
                        </div>
                      ) : (
                        // Si no hay oferta, solo muestra el precio regular
                        <span className="fw-bold text-primary small">
                          {formatCLP(item.price)}
                        </span>
                      )}
                    </div>
                    
                    {/* 
                      Botón para eliminar el producto del carrito
                      - btn-outline-danger: botón con borde rojo
                      - btn-sm: tamaño pequeño
                      - w-100: ancho del 100%
                      onClick: llama a removeFromCart pasando el cartId único
                    */}
                    <button 
                      className="btn btn-outline-danger btn-sm w-100"
                      onClick={() => removeFromCart(item.cartId)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 
          Componente CartTotal que calcula y muestra el total de la compra
          Recibe todos los items del carrito para hacer los cálculos
        */}
        <div className="mt-3">
          <CartTotal items={cartItems} />
        </div>
      </div>
    </div>
  );
}