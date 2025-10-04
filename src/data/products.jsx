const img = (file) => `${process.env.PUBLIC_URL}/img/${file}`

export default [
    {
        id: 1,
        name: 'Escritorio Gamer',
        price: 199990,
        offerPrice: 159990,
        description: 'Escritorio Gamer. Ideal para tu habitación gamer: cómodo, práctico y de alta durabilidad.',
        image: img('escritorio.png')
    },
    {
        id: 2,
        name: 'Monitor Gamer',
        price: 149990,
        offerPrice: 119990,
        description: 'Monitor Gamer. Ideal para tu setup gamer: gran pantalla, gran calidad a bajo costo',
        image: img('monitor.png')
    },
    {
        id: 3,
        name: 'Mouse gamer',
        price: 59990,
        offerPrice: 41990,
        description: 'Mouse gamer. Ideal para tu setup gamer: precisión y comodidad en cada clic.',
        image: img('mouse.png')
    },
    {
        id: 4,
        name: 'Notebook Gamer',
        price: 1299990,
        offerPrice: 1119990,
        description: 'Notebook Gamer. Tecnología confiable con excelente relación precio/calidad.',
        image: img('notebook.png')
    },
    {
        id: 5,
        name: 'Silla Gamer',
        price: 129990,
        offerPrice: 113990,
        description: 'Silla Gamer. Ideal para largas horas de juego.',
        image: img('silla.png')
    },
    {
        id: 6,
        name: 'Teclado Gamer',
        price: 59990,
        offerPrice: 47990,
        description: 'Teclado Gamer. Ideal para tu setup gamer: precisión y comodidad en cada tecla.',
        image: img('teclado.png')
    }
]