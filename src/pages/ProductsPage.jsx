// Importaciones de React y hooks
import React, { useState, useEffect } from 'react';
// Importación de componentes personalizados
import VideoGameCard from '../components/VideoGameCard';
import CategoryFilter from '../components/CategoryFilter';

/**
 * Componente de la página de productos
 * Muestra el catálogo completo de videojuegos con funcionalidad de filtrado por categoría
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onAddToCart - Función callback para agregar productos al carrito
 * @returns {JSX.Element} Página de productos con filtros y catálogo
 */
export default function ProductsPage({ onAddToCart }) {
    // ========== ESTADOS DEL COMPONENTE ==========
    
    /**
     * Estado que almacena todos los videojuegos cargados desde el JSON
     * Contiene la lista completa sin filtrar
     * @type {Array<Object>}
     */
    const [videogames, setVideogames] = useState([]);
    
    /**
     * Estado que almacena los videojuegos filtrados según la categoría seleccionada
     * Es el array que se renderiza en la interfaz
     * @type {Array<Object>}
     */
    const [filteredGames, setFilteredGames] = useState([]);
    
    /**
     * Estado que almacena la categoría actualmente seleccionada
     * 'all' muestra todos los productos, otros valores filtran por categoría
     * @type {string}
     */
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    /**
     * Estado que indica si los datos están siendo cargados
     * Se usa para mostrar un spinner de carga
     * @type {boolean}
     */
    const [loading, setLoading] = useState(true);

    // ========== EFECTOS DEL COMPONENTE ==========
    
    /**
     * useEffect para cargar los videojuegos desde el archivo JSON
     * Se ejecuta una sola vez al montar el componente (array de dependencias vacío [])
     * 
     * Proceso:
     * 1. Hace fetch al archivo /videogames.json
     * 2. Verifica que la respuesta sea exitosa
     * 3. Convierte la respuesta a JSON
     * 4. Filtra solo los productos (type === 'product')
     * 5. Actualiza los estados con los datos
     * 6. Maneja errores si la carga falla
     */
    useEffect(() => {
        // fetch es una API nativa de JavaScript para hacer peticiones HTTP
        // Usa import.meta.env.BASE_URL para obtener el base path configurado en Vite
        fetch(`${import.meta.env.BASE_URL}videogames.json`)
            .then(res => {
                // Verifica si la respuesta HTTP fue exitosa (status 200-299)
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                // Convierte la respuesta a formato JSON
                return res.json();
            })
            .then(data => {
                console.log('Datos cargados:', data);
                // filter: crea un nuevo array solo con los juegos que son productos
                // excluye los que son 'launch' (lanzamientos futuros)
                const products = data.filter(game => game.type === 'product');
                // Actualiza el estado con todos los productos
                setVideogames(products);
                // Inicialmente muestra todos los productos sin filtrar
                setFilteredGames(products);
                // Desactiva el estado de carga
                setLoading(false);
            })
            .catch(error => {
                // Captura y muestra cualquier error en la carga de datos
                console.error('Error cargando videojuegos:', error);
                setLoading(false);
            });
    }, []); // Array vacío = se ejecuta solo una vez al montar

    /**
     * useEffect para filtrar los videojuegos según la categoría seleccionada
     * Se ejecuta cada vez que cambia selectedCategory o videogames
     * 
     * Dependencias: [selectedCategory, videogames]
     * - selectedCategory: cuando el usuario cambia el filtro
     * - videogames: cuando se cargan los datos por primera vez
     */
    useEffect(() => {
        if (selectedCategory === 'all') {
            // Si la categoría es 'all', muestra todos los videojuegos
            setFilteredGames(videogames);
        } else {
            // filter: crea un nuevo array solo con los juegos de la categoría seleccionada
            setFilteredGames(videogames.filter(game => game.category === selectedCategory));
        }
    }, [selectedCategory, videogames]); // Se ejecuta cuando cambian estas variables

    // ========== FUNCIONES AUXILIARES ==========
    
    /**
     * Obtiene un array de categorías únicas de todos los videojuegos
     * Usa Set para eliminar duplicados y spread operator para convertir a array
     * 
     * Proceso:
     * 1. map: extrae solo las categorías de cada juego
     * 2. new Set: elimina categorías duplicadas
     * 3. [...]: convierte el Set de vuelta a un array
     */
    const categories = [...new Set(videogames.map(game => game.category))];

    /**
     * Maneja el cambio de categoría cuando el usuario selecciona un filtro
     * Actualiza el estado selectedCategory, lo que dispara el useEffect de filtrado
     * 
     * @param {string} category - Nueva categoría seleccionada ('all' o nombre de categoría)
     */
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    // ========== RENDERIZADO CONDICIONAL DE CARGA ==========
    
    /**
     * Si loading es true, muestra un spinner de carga
     * Esto mejora la experiencia de usuario mientras se cargan los datos
     * return temprano: detiene la ejecución y no renderiza el resto del componente
     */
    if (loading) {
        return (
            <div className="container my-5 text-center">
                {/* spinner-border: componente de Bootstrap para indicador de carga */}
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    // ========== RENDERIZADO PRINCIPAL ==========
    return (
        <div className="container my-5">
            {/* Encabezado de la página con título y descripción */}
            <section className="text-center mb-4">
                <h2 className="display-5 fw-bold mb-3">Listado de juegos</h2>
                <p className="lead text-muted">
                    Descubre nuestra amplia selección de videojuegos para todas las plataformas y géneros.
                </p>
            </section>

            {/* 
                Componente de filtro de categorías
                Props:
                - categories: Array de categorías únicas extraídas de los juegos
                - selectedCategory: Categoría actualmente seleccionada
                - onCategoryChange: Función callback que se ejecuta al cambiar el filtro
            */}
            <CategoryFilter 
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />

            {/* 
                Grid de productos usando sistema de columnas de Bootstrap
                row: clase de Bootstrap que crea un contenedor flex para las columnas
            */}
            <div className="row">
                {/* 
                    Renderizado condicional con operador ternario:
                    condición ? expresión_si_true : expresión_si_false
                */}
                {filteredGames.length > 0 ? (
                    // Si hay juegos filtrados, los renderiza con map
                    // map: itera sobre el array y retorna un componente por cada elemento
                    filteredGames.map(game => (
                        <VideoGameCard
                            // key: prop especial de React para identificar elementos en listas
                            // Debe ser único y estable (no usar índice del array)
                            key={game.id}
                            // game: objeto completo del videojuego con todas sus propiedades
                            game={game}
                            // onAdd: función callback para agregar al carrito
                            onAdd={onAddToCart}
                            // showAddToCart: controla si se muestra el botón de agregar
                            showAddToCart={true}
                        />
                    ))
                ) : (
                    // Si no hay juegos (filteredGames está vacío), muestra un mensaje
                    <div className="col-12 text-center">
                        <p className="text-muted">No se encontraron juegos en esta categoría.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
