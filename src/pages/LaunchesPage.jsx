import React, { useState, useEffect } from 'react';
import GameCarousel from '../components/GameCarousel';

export default function LaunchesPage({ onAddToCart }) {
    const [launches, setLaunches] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cargar lanzamientos desde JSON
    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}videogames.json`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log('Lanzamientos cargados:', data);
                const launchGames = data.filter(game => game.type === 'launch');
                setLaunches(launchGames);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error cargando lanzamientos:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="container my-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            {/* Header */}
            <section className="text-center mb-4">
                <h2 className="display-5 fw-bold mb-3">Lanzamientos del mes</h2>
                <p className="lead text-muted">
                    ¡Pronto tendremos novedades respecto a la precompra y compra de estos lanzamientos! 
                    ¡Atento a nuestras redes sociales!
                </p>
            </section>

            {/* Grid de carousels */}
            <div className="row">
                {launches.length > 0 ? (
                    launches.map((game, index) => (
                        <GameCarousel
                            key={game.id}
                            game={game}
                            carouselId={`carousel-${game.id}`}
                            onAddToCart={onAddToCart}
                        />
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p className="text-muted">No hay lanzamientos programados en este momento.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
