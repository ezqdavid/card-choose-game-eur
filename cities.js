// European cities data
// Fixed start and end cities
const fixedStartCity = {
    city: "Londres",
    country: "Reino Unido",
    emoji: "🎡",
    description: "Palacios reales y museos de clase mundial",
    date: "5 de Marzo",
    isFixed: true,
    isStart: true,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80" // London Eye
};

const fixedEndCity = {
    city: "Madrid",
    country: "España",
    emoji: "💃",
    description: "Cultura vibrante, tapas y flamenco",
    date: "26 de Marzo",
    isFixed: true,
    isEnd: true,
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80" // Royal Palace Madrid
};

// Cities to compete in tournament (Milan and Rome are preferred)
// Using Unsplash for high-quality landmark images
const cities = [
    {
        city: "Milán",
        country: "Italia",
        emoji: "👗",
        description: "Capital de la moda y elegancia italiana moderna",
        preferred: true,
        image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800&q=80" // Duomo di Milano
    },
    {
        city: "Roma",
        country: "Italia",
        emoji: "🏛️",
        description: "Historia antigua y cultura moderna",
        preferred: true,
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80" // Colosseum
    },
    {
        city: "París",
        country: "Francia",
        emoji: "🗼",
        description: "La Ciudad Luz - romance, arte y gastronomía",
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80" // Eiffel Tower
    },
    {
        city: "Barcelona",
        country: "España",
        emoji: "🏖️",
        description: "Obras maestras de Gaudí y playas mediterráneas",
        image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80" // Sagrada Familia
    },
    {
        city: "Ámsterdam",
        country: "Países Bajos",
        emoji: "🚲",
        description: "Canales, bicicletas y cultura vibrante",
        image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80" // Amsterdam canals
    },
    {
        city: "Praga",
        country: "República Checa",
        emoji: "🏰",
        description: "Arquitectura de cuento y encanto medieval",
        image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80" // Prague Castle
    },
    {
        city: "Viena",
        country: "Austria",
        emoji: "🎻",
        description: "Palacios imperiales y música clásica",
        image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80" // Schönbrunn Palace
    },
    {
        city: "Lisboa",
        country: "Portugal",
        emoji: "🌉",
        description: "Colinas, tranvías y vistas al Atlántico",
        image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80" // Belém Tower
    },
    {
        city: "Berlín",
        country: "Alemania",
        emoji: "🎨",
        description: "Historia, arte y vida nocturna",
        image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80" // Brandenburg Gate
    },
    {
        city: "Budapest",
        country: "Hungría",
        emoji: "♨️",
        description: "Termas y vistas del Danubio",
        image: "https://images.unsplash.com/photo-1541764602378-4e0a45c31f09?w=800&q=80" // Parliament Building
    },
    {
        city: "Edimburgo",
        country: "Escocia",
        emoji: "🏴󐁧󐁢󐁳󐁣󐁴󐁿",
        description: "Castillo, tierras altas y calles históricas",
        image: "https://images.unsplash.com/photo-1565604893-a48320d16809?w=800&q=80" // Edinburgh Castle
    },
    {
        city: "Dubrovnik",
        country: "Croacia",
        emoji: "⚓",
        description: "Murallas antiguas y aguas cristalinas del Adriático",
        image: "https://images.unsplash.com/photo-1555990538-c3d34c2d85a5?w=800&q=80" // Old Town walls
    },
    {
        city: "Copenhague",
        country: "Dinamarca",
        emoji: "🧜‍♀️",
        description: "Diseño, hygge y encanto costero",
        image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&q=80" // Nyhavn
    },
    {
        city: "Estocolmo",
        country: "Suecia",
        emoji: "🛶",
        description: "Belleza del archipiélago y diseño nórdico",
        image: "https://images.unsplash.com/photo-1508189860359-777d945909ef?w=800&q=80" // Gamla Stan
    },
    {
        city: "Atenas",
        country: "Grecia",
        emoji: "🏺",
        description: "Acrópolis y maravillas antiguas",
        image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80" // Parthenon
    },
    {
        city: "Florencia",
        country: "Italia",
        emoji: "🎭",
        description: "Arte renacentista y belleza toscana",
        image: "https://images.unsplash.com/photo-1541984556116-51f59f899b0e?w=800&q=80" // Duomo Florence
    },
    {
        city: "Santorini",
        country: "Grecia",
        emoji: "🌅",
        description: "Acantilados blancos y atardeceres impresionantes",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80" // Oia village
    },
    {
        city: "Oporto",
        country: "Portugal",
        emoji: "🍷",
        description: "Vino de Oporto y encanto ribereño",
        image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80" // Ribeira district
    },
    {
        city: "Brujas",
        country: "Bélgica",
        emoji: "🧇",
        description: "Canales medievales y delicias de chocolate",
        image: "https://images.unsplash.com/photo-1559564484-e48bf1b6c06c?w=800&q=80" // Belfry of Bruges
    },
    {
        city: "Venecia",
        country: "Italia",
        emoji: "🛶",
        description: "Canales románticos y arquitectura impresionante",
        image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80" // Grand Canal
    },
    {
        city: "Sevilla",
        country: "España",
        emoji: "💃",
        description: "Flamenco, tapas y arquitectura morisca",
        image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80" // Plaza de España
    }
];
