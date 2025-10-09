// Importación de React
import React from 'react';

/**
 * Componente de filtro de categorías
 * Muestra botones para filtrar productos por categoría
 * Incluye botón "Todos" y un botón por cada categoría disponible
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array<string>} props.categories - Array de categorías únicas disponibles
 * @param {string} props.selectedCategory - Categoría actualmente seleccionada ('all' o nombre de categoría)
 * @param {Function} props.onCategoryChange - Función callback que se ejecuta al cambiar el filtro
 * @returns {JSX.Element} Grupo de botones para filtrar por categoría
 */
export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
    return (
        <div className="mb-4 text-center">
            {/* Título de la sección de filtros */}
            <h5 className="mb-3">Filtrar por categoría:</h5>
            
            {/* 
                Grupo de botones de Bootstrap
                - btn-group: agrupa botones visualmente
                - flex-wrap: permite que los botones se envuelvan en múltiples líneas en pantallas pequeñas
                - role="group": mejora la accesibilidad para lectores de pantalla
            */}
            <div className="btn-group flex-wrap" role="group">
                {/* 
                    Botón "Todos" - siempre visible para mostrar todos los productos
                    Clase dinámica basada en si está seleccionado o no
                */}
                <button
                    type="button"
                    // Template literal con clase dinámica:
                    // - Si selectedCategory === 'all': usa 'btn-primary' (azul sólido)
                    // - Si no: usa 'btn-outline-primary' (azul con borde, sin fondo)
                    className={`btn ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                    // onClick con arrow function para llamar la función callback con 'all'
                    onClick={() => onCategoryChange('all')}
                >
                    Todos
                </button>
                
                {/* 
                    Mapea el array de categorías para crear un botón por cada una
                    map: itera sobre el array y retorna un elemento JSX por cada categoría
                */}
                {categories.map(category => (
                    <button
                        // key: identificador único requerido por React para elementos en listas
                        // Usa el nombre de la categoría como key porque es único
                        key={category}
                        type="button"
                        // Clase dinámica: cambia según si esta categoría está seleccionada
                        className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                        // onClick: llama a la función callback pasando la categoría específica
                        onClick={() => onCategoryChange(category)}
                    >
                        {/* Muestra el nombre de la categoría como texto del botón */}
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}
