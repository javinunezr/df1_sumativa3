import React, { useEffect } from 'react';
import { formatCLP } from '../utils/format.js';

export default function GameCarousel({ game, carouselId, onAddToCart }) {
    const hasOffer = game.offerPrice && game.offerPrice < game.price;
    const displayPrice = hasOffer ? game.offerPrice : game.price;
    const discount = hasOffer ? Math.round(((game.price - game.offerPrice) / game.price) * 100) : 0;

    useEffect(() => {
        // Inicializar Bootstrap carousel si es necesario
        if (typeof window !== 'undefined' && window.bootstrap) {
            new window.bootstrap.Carousel(document.getElementById(carouselId));
        }
    }, [carouselId]);

    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div id={carouselId} className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                {/* Contenido del carousel */}
                <div className="carousel-inner">
                    {game.screenshots && game.screenshots.map((screenshot, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <div className="card h-100 shadow-sm">
                                <div className="position-relative">
                                    <img 
                                        src={`${import.meta.env.BASE_URL}${screenshot}`} 
                                        className="card-img-top" 
                                        alt={`${game.name} screenshot ${index + 1}`}
                                        style={{ 
                                            height: '250px', 
                                            objectFit: 'contain', 
                                            backgroundColor: '#f8f9fa' 
                                        }}
                                    />
                                    {hasOffer && index === 0 && (
                                        <span className="position-absolute top-0 start-0 badge bg-danger m-2">
                                            -{discount}%
                                        </span>
                                    )}
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{game.name}</h5>
                                    <p className="card-text flex-grow-1">{game.description}</p>
                                    
                                    <div className="price-section mb-2">
                                        {hasOffer ? (
                                            <div>
                                                <span className="text-decoration-line-through text-muted me-2">
                                                    {formatCLP(game.price)}
                                                </span>
                                                <span className="fw-bold text-danger">
                                                    {formatCLP(game.offerPrice)}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="fw-bold text-primary">
                                                {formatCLP(game.price)}
                                            </span>
                                        )}
                                    </div>

                                    <small className="text-muted">
                                        Fecha de lanzamiento: {new Date(game.releaseDate).toLocaleDateString('es-ES')}
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Controles de navegación */}
                <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}
