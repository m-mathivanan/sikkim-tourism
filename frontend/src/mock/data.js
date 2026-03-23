export const mockMonasteries = [
  {
    id: 1,
    name: "Rumtek Monastery",
    tibetanName: "རུམ་ཐེག་དགོན་པ།",
    location: "Rumtek, East Sikkim",
    established: "16th Century",
    sect: "Kagyu",
    altitude: "5800 ft",
    description: "The most famous monastery in Sikkim, known as the 'Dharma Chakra Centre'. It serves as the main seat of the Karmapa and houses precious relics and religious art.",
    features: ["Golden Stupa", "Prayer Hall", "Monastery School", "Library"],
    festivals: ["Saga Dawa", "Tibetan New Year", "Buddha Jayanti"],
    significance: "Seat of the 16th Karmapa, replica of Tsurphu Monastery in Tibet",
    bestTime: "October to December, March to May",
    visitingHours: "6:00 AM - 6:00 PM",
    nearbyAttractions: ["Lingdum Monastery", "Ranka Monastery", "Gangtok city"],
    coordinates: { lat: 27.2896, lng: 88.5591 },
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
    ],
    virtualTour: true,
    accessibility: "Wheelchair accessible main areas",
    offerings: ["Butter lamps", "Prayer flags", "Incense sticks"]
  },
  {
    id: 2,
    name: "Pemayangtse Monastery",
    tibetanName: "པདྨ་ཡང་རྩེ་དགོན་པ།",
    location: "Pelling, West Sikkim",
    established: "1705",
    sect: "Nyingma",
    altitude: "7000 ft",
    description: "One of the oldest and most important monasteries in Sikkim, meaning 'Perfect Sublime Lotus'. It offers stunning views of Kanchenjunga and houses ancient artifacts.",
    features: ["Seven-story Wooden Structure", "Ancient Murals", "Meditation Hall", "Museum"],
    festivals: ["Cham Dance", "Buddha Purnima", "Drupka Kunley Festival"],
    significance: "Second oldest monastery in Sikkim, head monastery of Nyingma sect",
    bestTime: "March to May, October to December",
    visitingHours: "5:00 AM - 7:00 PM",
    nearbyAttractions: ["Rabdentse Ruins", "Khecheopalri Lake", "Kanchenjunga Falls"],
    coordinates: { lat: 27.3126, lng: 88.2114 },
    images: [
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
    ],
    virtualTour: true,
    accessibility: "Limited wheelchair access due to stairs",
    offerings: ["Khata scarves", "Fruits", "Traditional butter tea"]
  },
  {
    id: 3,
    name: "Tashiding Monastery",
    tibetanName: "བཀྲ་ཤིས་སྡིང་དགོན་པ།",
    location: "Tashiding, West Sikkim",
    established: "1641",
    sect: "Nyingma",
    altitude: "4600 ft",
    description: "Perched on a hilltop between Rathong and Rangeet rivers, this monastery is considered one of the holiest in Sikkim. The sacred Bhumchu ceremony takes place here annually.",
    features: ["Sacred Chorten", "Prayer Wheels", "Holy Water Ceremony", "Meditation Caves"],
    festivals: ["Bhumchu Festival", "Saga Dawa", "Losar"],
    significance: "Sacred Bhumchu water ceremony, prophetic waters",
    bestTime: "October to March",
    visitingHours: "6:00 AM - 6:00 PM",
    nearbyAttractions: ["Yuksom", "Dubdi Monastery", "Norbugang Park"],
    coordinates: { lat: 27.3424, lng: 88.2177 },
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop"
    ],
    virtualTour: false,
    accessibility: "Steep trek required, not wheelchair accessible",
    offerings: ["White scarves", "Incense", "Prayer flags"]
  },
  {
    id: 4,
    name: "Enchey Monastery",
    tibetanName: "ལྷ་ཁང་དགོན་པ།",
    location: "Gangtok, East Sikkim",
    established: "1909",
    sect: "Nyingma",
    altitude: "6200 ft",
    description: "A small but beautiful monastery in Gangtok with incredible views of Kanchenjunga. Known for its peaceful atmosphere and the famous Cham dance performed during festivals.",
    features: ["Prayer Hall", "Statue of Buddha", "Meditation Area", "Library"],
    festivals: ["Cham Dance Festival", "Pang Lhabsol", "Drupka Kunley"],
    significance: "City monastery with rich cultural programs",
    bestTime: "Year round",
    visitingHours: "5:30 AM - 7:00 PM",
    nearbyAttractions: ["Ganesh Tok", "Hanuman Tok", "Do-drul Chorten"],
    coordinates: { lat: 27.3389, lng: 88.6065 },
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop"
    ],
    virtualTour: true,
    accessibility: "Wheelchair accessible",
    offerings: ["Flowers", "Fruits", "Candles"]
  }
];

export const mockEvents = [
  {
    id: 1,
    name: "Losar Festival",
    monastery: "All Monasteries",
    date: "2024-02-15",
    duration: "3 days",
    description: "Tibetan New Year celebration with traditional dances, prayers, and festivities",
    type: "Religious Festival",
    highlights: ["Mask dances", "Traditional music", "Special prayers", "Community feast"]
  },
  {
    id: 2,
    name: "Saga Dawa Festival",
    monastery: "Rumtek Monastery",
    date: "2024-05-23",
    duration: "1 day",
    description: "Celebrating Buddha's birth, enlightenment, and death on the same auspicious day",
    type: "Buddhist Festival",
    highlights: ["Butter lamp lighting", "Prayer flag hanging", "Merit-making activities"]
  },
  {
    id: 3,
    name: "Bhumchu Festival",
    monastery: "Tashiding Monastery",
    date: "2024-02-18",
    duration: "2 days",
    description: "Sacred water ceremony where holy water is distributed to devotees for blessings",
    type: "Sacred Ceremony",
    highlights: ["Holy water blessing", "Prophecy reading", "Traditional ceremonies"]
  },
  {
    id: 4,
    name: "Pang Lhabsol",
    monastery: "Enchey Monastery", 
    date: "2024-08-15",
    duration: "1 day",
    description: "Guardian deity festival celebrating Mount Kanchenjunga as the protector of Sikkim",
    type: "Guardian Deity Festival",
    highlights: ["Warrior dance", "Traditional archery", "Cultural performances"]
  },
  {
    id: 5,
    name: "Kagyed Dance",
    monastery: "Phodong Monastery",
    date: "2024-12-28",
    duration: "2 days",
    description: "Performed before the Tibetan New Year, these masked dances symbolize the destruction of evil forces.",
    type: "Masked Dance Festival",
    highlights: ["Cham dances", "Monastic rituals", "Feast"]
  },
  {
    id: 6,
    name: "Losoong (Sikkimese New Year)",
    monastery: "Phodong & Rumtek",
    date: "2024-12-30",
    duration: "5 days",
    description: "The Sikkimese New Year, celebrated with traditional dances and prayers for a good harvest.",
    type: "Harvest Festival",
    highlights: ["Archery competitions", "Local cuisines", "Folk dances"]
  }
];

export const mockFeatures = [
  {
    title: "Interactive Monastery Profiles",
    description: "Detailed information about each monastery including history, architecture, and cultural significance",
    image: "/feature-profiles.png"
  },
  {
    title: "Virtual Tours & Galleries",
    description: "360° virtual tours and high-resolution image galleries of monastery interiors and exteriors",
    image: "/feature-tour.png"
  },
  {
    title: "Interactive Maps",
    description: "GPS-enabled maps showing monastery locations with travel routes and nearby attractions",
    image: "/feature-maps.png"
  },
  {
    title: "Festival Calendar",
    description: "Complete schedule of religious festivals and ceremonies with booking options",
    image: "/feature-festivals.png"
  },
  {
    title: "AI-Powered Guide",
    description: "Multilingual AI assistant for answering questions and providing personalized recommendations",
    image: "/feature-ai.png"
  },
  {
    title: "Cultural Heritage",
    description: "Digital preservation of Sikkim's Buddhist culture, traditions, and ancient wisdom",
    image: "/feature-culture.png"
  }
];