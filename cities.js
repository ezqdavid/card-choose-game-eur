// European cities data
// Fixed start and end cities
const fixedStartCity = {
    city: "London",
    country: "United Kingdom",
    emoji: "🎡",
    description: "Royal palaces and world-class museums",
    date: "March 5",
    isFixed: true,
    isStart: true,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80" // London Eye
};

const fixedEndCity = {
    city: "Madrid",
    country: "Spain",
    emoji: "💃",
    description: "Vibrant culture, tapas, and flamenco",
    date: "March 26",
    isFixed: true,
    isEnd: true,
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80" // Royal Palace Madrid
};

// Cities to compete in tournament (Milan and Rome are preferred)
// Using Unsplash for high-quality landmark images
const cities = [
    {
        city: "Milan",
        country: "Italy",
        emoji: "👗",
        description: "Fashion capital and modern Italian elegance",
        preferred: true,
        image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800&q=80" // Duomo di Milano
    },
    {
        city: "Rome",
        country: "Italy",
        emoji: "🏛️",
        description: "Ancient history meets modern culture",
        preferred: true,
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80" // Colosseum
    },
    {
        city: "Paris",
        country: "France",
        emoji: "🗼",
        description: "The City of Light - romance, art, and cuisine",
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80" // Eiffel Tower
    },
    {
        city: "Barcelona",
        country: "Spain",
        emoji: "🏖️",
        description: "Gaudí's masterpieces and Mediterranean beaches",
        image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80" // Sagrada Familia
    },
    {
        city: "Amsterdam",
        country: "Netherlands",
        emoji: "🚲",
        description: "Canals, cycling, and vibrant culture",
        image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80" // Amsterdam canals
    },
    {
        city: "Prague",
        country: "Czech Republic",
        emoji: "🏰",
        description: "Fairy-tale architecture and medieval charm",
        image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80" // Prague Castle
    },
    {
        city: "Vienna",
        country: "Austria",
        emoji: "🎻",
        description: "Imperial palaces and classical music",
        image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80" // Schönbrunn Palace
    },
    {
        city: "Lisbon",
        country: "Portugal",
        emoji: "🌉",
        description: "Hills, trams, and Atlantic views",
        image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80" // Belém Tower
    },
    {
        city: "Berlin",
        country: "Germany",
        emoji: "🎨",
        description: "History, art, and nightlife",
        image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80" // Brandenburg Gate
    },
    {
        city: "Budapest",
        country: "Hungary",
        emoji: "♨️",
        description: "Thermal baths and stunning Danube views",
        image: "https://images.unsplash.com/photo-1541764602378-4e0a45c31f09?w=800&q=80" // Parliament Building
    },
    {
        city: "Edinburgh",
        country: "Scotland",
        emoji: "🏴󐁧󐁢󐁳󐁣󐁴󐁿",
        description: "Castle, highlands, and historic streets",
        image: "https://images.unsplash.com/photo-1565604893-a48320d16809?w=800&q=80" // Edinburgh Castle
    },
    {
        city: "Dubrovnik",
        country: "Croatia",
        emoji: "⚓",
        description: "Ancient walls and crystal Adriatic waters",
        image: "https://images.unsplash.com/photo-1555990538-c3d34c2d85a5?w=800&q=80" // Old Town walls
    },
    {
        city: "Copenhagen",
        country: "Denmark",
        emoji: "🧜‍♀️",
        description: "Design, hygge, and waterfront charm",
        image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&q=80" // Nyhavn
    },
    {
        city: "Stockholm",
        country: "Sweden",
        emoji: "🛶",
        description: "Archipelago beauty and Nordic design",
        image: "https://images.unsplash.com/photo-1508189860359-777d945909ef?w=800&q=80" // Gamla Stan
    },
    {
        city: "Athens",
        country: "Greece",
        emoji: "🏺",
        description: "Acropolis and ancient wonders",
        image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80" // Parthenon
    },
    {
        city: "Florence",
        country: "Italy",
        emoji: "🎭",
        description: "Renaissance art and Tuscan beauty",
        image: "https://images.unsplash.com/photo-1541984556116-51f59f899b0e?w=800&q=80" // Duomo Florence
    },
    {
        city: "Santorini",
        country: "Greece",
        emoji: "🌅",
        description: "White-washed cliffs and stunning sunsets",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80" // Oia village
    },
    {
        city: "Porto",
        country: "Portugal",
        emoji: "🍷",
        description: "Port wine and riverside charm",
        image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80" // Ribeira district
    },
    {
        city: "Bruges",
        country: "Belgium",
        emoji: "🧇",
        description: "Medieval canals and chocolate delights",
        image: "https://images.unsplash.com/photo-1559564484-e48bf1b6c06c?w=800&q=80" // Belfry of Bruges
    },
    {
        city: "Venice",
        country: "Italy",
        emoji: "🛶",
        description: "Romantic canals and stunning architecture",
        image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80" // Grand Canal
    },
    {
        city: "Seville",
        country: "Spain",
        emoji: "💃",
        description: "Flamenco, tapas, and Moorish architecture",
        image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80" // Plaza de España
    }
];
