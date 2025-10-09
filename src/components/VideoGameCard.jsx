// Importación de React
import React from 'react';
// Importación de función utilitaria para formatear precios a pesos chilenos
import { formatCLP } from '../utils/format.js';

/**
 * Componente de tarjeta de videojuego
 * Muestra la información de un videojuego en formato de card de Bootstrap
 * Incluye imagen, título, descripción, categoría, precio y botón de agregar al carrito
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.game - Objeto con los datos del videojuego
 * @param {Function} props.onAdd - Función callback para agregar el juego al carrito
 * @param {boolean} [props.showAddToCart=true] - Controla si se muestra el botón de agregar (opcional, por defecto true)
 * @returns {JSX.Element} Tarjeta de videojuego con todos sus detalles
 */
export default function VideoGameCard({ game, onAdd, showAddToCart = true }) {
    // ========== CÁLCULOS DE PRECIOS Y DESCUENTOS ==========
    
    /**
     * Verifica si el juego tiene una oferta válida
     * Condiciones: debe existir offerPrice Y debe ser menor que el precio regular
     * Usa operador && (AND lógico) para evaluar ambas condiciones
     * @type {boolean}
     */
    const hasOffer = game.offerPrice && game.offerPrice < game.price;
    
    /**
     * Determina qué precio mostrar: el precio de oferta si existe, o el precio regular
     * Usa operador ternario: condición ? valor_si_true : valor_si_false
     * @type {number}
     */
    const displayPrice = hasOffer ? game.offerPrice : game.price;
    
    /**
     * Calcula el porcentaje de descuento si hay oferta
     * Fórmula: ((precio_original - precio_oferta) / precio_original) * 100
     * Math.round(): redondea al número entero más cercano
     * Si no hay oferta, retorna 0
     * @type {number}
     */
    const discount = hasOffer ? Math.round(((game.price - game.offerPrice) / game.price) * 100) : 0;

    // ========== RENDERIZADO DEL COMPONENTE ==========
    return (
        // Columna responsiva de Bootstrap: 3 columnas en lg, 6 en md, 12 (full) en móvil
        <div className="col-lg-3 col-md-6 mb-4">
            {/* 
                Card de Bootstrap con:
                - h-100: altura 100% para que todas las cards tengan la misma altura
                - shadow-sm: sombra pequeña para dar profundidad
            */}
            <div className="card h-100 shadow-sm">
                {/* Contenedor de la imagen con posición relativa para el badge de descuento */}
                <div className="position-relative">
                    {/* 
                        Imagen del videojuego
                        - card-img-top: clase de Bootstrap para imagen superior de la card
                        - objectFit: 'contain' mantiene la proporción sin recortar
                        - height fijo de 250px para uniformidad
                    */}
                    <img 
                        src={`${import.meta.env.BASE_URL}${game.image}`} 
                        className="card-img-top" 
                        alt={game.name}
                        style={{ 
                            height: '250px', 
                            objectFit: 'contain', 
                            backgroundColor: '#f8f9fa' 
                        }}
                    />
                    {/* 
                        Badge de descuento - solo se muestra si hay oferta
                        Renderizado condicional con &&: si hasOffer es true, renderiza el elemento
                    */}
                    {hasOffer && (
                        <span className="position-absolute top-0 start-0 badge bg-danger m-2">
                            -{discount}%
                        </span>
                    )}
                </div>
                
                {/* 
                    Cuerpo de la card con:
                    - d-flex flex-column: layout flexbox vertical
                    - Esto permite que el botón se mantenga al fondo con mt-auto
                */}
                <div className="card-body d-flex flex-column">
                    {/* Título del videojuego */}
                    <h5 className="card-title">{game.name}</h5>
                    
                    {/* 
                        Descripción del juego
                        - flex-grow-1: crece para ocupar el espacio disponible
                        - Esto empuja el contenido siguiente hacia abajo
                    */}
                    <p className="card-text flex-grow-1">{game.description}</p>
                    
                    {/* Categoría del juego en texto pequeño y gris */}
                    <small className="text-muted mb-2">{game.category}</small>
                    
                    {/* Sección de precios con renderizado condicional */}
                    <div className="price-section mb-2">
                        {hasOffer ? (
                            // Si hay oferta, muestra ambos precios
                            <div>
                                {/* Precio original tachado */}
                                <span className="text-decoration-line-through text-muted me-2">
                                    {formatCLP(game.price)}
                                </span>
                                {/* Precio de oferta en rojo y grande */}
                                <span className="fw-bold text-danger fs-5">
                                    {formatCLP(game.offerPrice)}
                                </span>
                            </div>
                        ) : (
                            // Si no hay oferta, solo muestra el precio regular
                            <span className="fw-bold text-primary fs-5">
                                {formatCLP(game.price)}
                            </span>
                        )}
                    </div>

                    {/* 
                        Fecha de lanzamiento - solo para juegos tipo 'launch'
                        Renderizado condicional: solo si existe game.releaseDate
                        new Date(): convierte string a objeto Date
                        toLocaleDateString('es-ES'): formatea la fecha en español
                    */}
                    {game.releaseDate && (
                        <small className="text-muted mb-2">
                            Fecha de lanzamiento: {new Date(game.releaseDate).toLocaleDateString('es-ES')}
                        </small>
                    )}

                    {/* 
                        Botón de agregar al carrito
                        Solo se muestra si showAddToCart es true
                        - mt-auto: margen top automático que empuja el botón al fondo de la card
                    */}
                    {showAddToCart && (
                        <button 
                            className="btn btn-primary mt-auto"
                            // onClick con arrow function para pasar el juego completo a onAdd
                            onClick={() => onAdd(game)}
                        >
                            {/* Texto del botón cambia según el tipo de juego */}
                            {game.type === 'launch' ? 'Pre-ordenar' : 'Agregar al carrito'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
