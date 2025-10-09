// Importación de React
import React from 'react';
// Importación de componentes de React Router
// - Link: componente para navegación SPA (sin recargar la página)
// - useLocation: hook que retorna la ubicación/ruta actual
import { Link, useLocation } from 'react-router-dom';

/**
 * Componente de barra de navegación y header
 * Incluye el header principal de la tienda, menú de navegación responsive
 * y contador de productos en el carrito
 * 
 * @param {Object} props - Propiedades del componente
 * @param {number} props.count - Número de productos en el carrito
 * @returns {JSX.Element} Header y navbar de la aplicación
 */
export default function Navbar({ count }) {
    /**
     * Hook de React Router que retorna el objeto location actual
     * Contiene información sobre la ruta actual (pathname, search, hash, etc.)
     * Se usa para detectar qué link está activo y resaltarlo
     * @type {Object}
     */
    const location = useLocation();

    // ========== RENDERIZADO DEL COMPONENTE ==========
    return (
        // Fragment (<>): permite retornar múltiples elementos sin agregar nodos extra al DOM
        <>
            {/* 
                Header principal de la aplicación
                Etiqueta semántica <header> para mejorar SEO y accesibilidad
                - bg-dark: fondo oscuro de Bootstrap
                - text-white: texto blanco
                - text-center: texto centrado
                - p-3: padding de 3 unidades
            */}
            <header className="bg-dark text-white text-center p-3">
                <h1>🎮 Play & Fun - Tienda de juegos Online</h1>
                <p>Compra tus juegos favoritos desde la comodidad de tu hogar.</p>
            </header>

            {/* 
                Navbar de Bootstrap - barra de navegación responsive
                Etiqueta semántica <nav> para navegación principal
                - navbar: clase base de navbar de Bootstrap
                - navbar-expand-lg: se expande en pantallas large o mayores
                - navbar-light: estilo claro
                - bg-light: fondo claro
            */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    {/* 
                        Botón hamburguesa para dispositivos móviles
                        Solo visible en pantallas menores a 'lg' (992px)
                        Controla el colapso/expansión del menú
                    */}
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        // data-bs-toggle: atributo de Bootstrap para activar el colapso
                        data-bs-toggle="collapse" 
                        // data-bs-target: ID del elemento que se va a colapsar/expandir
                        data-bs-target="#navbarNav" 
                        // aria-controls: para accesibilidad, indica qué elemento controla
                        aria-controls="navbarNav" 
                        // aria-expanded: indica si el menú está expandido (para lectores de pantalla)
                        aria-expanded="false" 
                        // aria-label: descripción para lectores de pantalla
                        aria-label="Toggle navigation"
                    >
                        {/* Icono de 3 líneas horizontales del menú hamburguesa */}
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* 
                        Contenedor colapsable del menú
                        - collapse: clase de Bootstrap para contenido colapsable
                        - navbar-collapse: específico para navbars
                        - justify-content-center: centra el contenido horizontalmente
                    */}
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        {/* Lista de navegación */}
                        <ul className="navbar-nav">
                            {/* Item de menú: Productos */}
                            <li className="nav-item">
                                {/* 
                                    Link de React Router (no recarga la página)
                                    Clase dinámica que agrega 'active' si estamos en esta ruta
                                    location.pathname: retorna la ruta actual (ej: '/', '/contacto')
                                */}
                                <Link 
                                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                                    to="/"
                                >
                                    Productos
                                </Link>
                            </li>
                            {/* Item de menú: Próximos lanzamientos */}
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link ${location.pathname === '/lanzamientos' ? 'active' : ''}`} 
                                    to="/lanzamientos"
                                >
                                    Próximos lanzamientos
                                </Link>
                            </li>
                            {/* Item de menú: Contacto */}
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link ${location.pathname === '/contacto' ? 'active' : ''}`} 
                                    to="/contacto"
                                >
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 
                        Contador de productos en el carrito
                        - d-flex: display flex
                        - align-items-center: alinea verticalmente al centro
                    */}
                    <div className="d-flex align-items-center">
                        {/* 
                            Badge de Bootstrap con contador
                            Muestra el número de productos en el carrito en tiempo real
                        */}
                        <span className="badge bg-primary">
                            🛒 {count} productos
                        </span>
                    </div>
                </div>
            </nav>
        </>
    );
}