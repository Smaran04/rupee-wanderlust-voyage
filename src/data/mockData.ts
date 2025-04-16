
export interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  country: string;
  rating: number;
  hotspots: Hotspot[];
  mapLocation: {
    lat: number;
    lng: number;
  };
}

export interface Hotspot {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface Hotel {
  id: number;
  name: string;
  description: string;
  images: string[];
  destinationId: number;
  rating: number;
  address: string;
  amenities: string[];
  pricePerNight: {
    regular: number;
    festival?: number;
  };
  festivalsNearby?: string[];
  rooms: {
    type: string;
    occupancy: {
      adults: number;
      children: number;
    };
    availability: number;
    priceMultiplier: number;
  }[];
  mapLocation: {
    lat: number;
    lng: number;
  };
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Taj Mahal",
    description: "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor, Shah Jahan, to house the tomb of his favourite wife, Mumtaz Mahal.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000",
    country: "India",
    rating: 4.9,
    hotspots: [
      {
        id: 1,
        name: "Mehtab Bagh",
        description: "Garden complex offering views of Taj Mahal across the river",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=876"
      },
      {
        id: 2,
        name: "Agra Fort",
        description: "UNESCO World Heritage site located about 2.5 km from the Taj Mahal",
        image: "https://images.unsplash.com/photo-1524613032530-449a5d94c285?q=80&w=870"
      }
    ],
    mapLocation: {
      lat: 27.1751,
      lng: 78.0421
    }
  },
  {
    id: 2,
    name: "Goa",
    description: "Goa is a state on the southwestern coast of India known for its beaches, cuisine and vibrant nightlife.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=774",
    country: "India",
    rating: 4.6,
    hotspots: [
      {
        id: 1,
        name: "Calangute Beach",
        description: "Largest beach in North Goa known as the 'Queen of Beaches'",
        image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=774"
      },
      {
        id: 2,
        name: "Fort Aguada",
        description: "17th-century Portuguese fort offering panoramic views",
        image: "https://images.unsplash.com/photo-1621831714462-bec8bef9c5e7?q=80&w=774"
      }
    ],
    mapLocation: {
      lat: 15.2993,
      lng: 74.1240
    }
  },
  {
    id: 3,
    name: "Jaipur",
    description: "Jaipur is the capital of India's Rajasthan state, known for its vibrant pink buildings and rich royal heritage.",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=870",
    country: "India",
    rating: 4.7,
    hotspots: [
      {
        id: 1,
        name: "Hawa Mahal",
        description: "Palace of Winds, a stunning five-story palace with 953 windows",
        image: "https://images.unsplash.com/photo-1632932693391-40e7c4b9d0de?q=80&w=774"
      },
      {
        id: 2,
        name: "Amber Fort",
        description: "Magnificent fort complex built in 1592 with stunning architecture",
        image: "https://images.unsplash.com/photo-1587295656906-b5b49ac259be?q=80&w=774"
      }
    ],
    mapLocation: {
      lat: 26.9124,
      lng: 75.7873
    }
  },
  {
    id: 4,
    name: "Varanasi",
    description: "One of the world's oldest continually inhabited cities, and one of the holiest in Hinduism.",
    image: "https://images.unsplash.com/photo-1561361058-c12e46a4ac53?q=80&w=774",
    country: "India",
    rating: 4.5,
    hotspots: [
      {
        id: 1,
        name: "Dashashwamedh Ghat",
        description: "Famous ghat on the banks of the Ganges known for daily Ganga Aarti ceremony",
        image: "https://images.unsplash.com/photo-1596402183530-77847fb4e47e?q=80&w=774"
      },
      {
        id: 2,
        name: "Kashi Vishwanath Temple",
        description: "One of the most famous Hindu temples dedicated to Lord Shiva",
        image: "https://images.unsplash.com/photo-1625124879886-a1d16eb2d6c1?q=80&w=774"
      }
    ],
    mapLocation: {
      lat: 25.3176,
      lng: 82.9739
    }
  },
  {
    id: 5,
    name: "Munnar",
    description: "Hill station in Kerala known for its tea plantations and stunning mountain scenery.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=870",
    country: "India",
    rating: 4.8,
    hotspots: [
      {
        id: 1,
        name: "Tea Gardens",
        description: "Vast expanses of tea plantations offering beautiful views",
        image: "https://images.unsplash.com/photo-1598977115839-648b3a3890f0?q=80&w=774"
      },
      {
        id: 2,
        name: "Eravikulam National Park",
        description: "Home to the endangered Nilgiri Tahr and stunning flora",
        image: "https://images.unsplash.com/photo-1590237321969-1c29d9644cb5?q=80&w=774"
      }
    ],
    mapLocation: {
      lat: 10.0889,
      lng: 77.0595
    }
  },
  {
    id: 6,
    name: "Darjeeling",
    description: "Famous for its tea industry, the Darjeeling Himalayan Railway, and views of Kanchenjunga.",
    image: "https://images.unsplash.com/photo-1544157199-27f718d416d5?q=80&w=774",
    country: "India",
    rating: 4.7,
    hotspots: [
      {
        id: 1,
        name: "Tiger Hill",
        description: "Famous for its sunrise views over Kanchenjunga",
        image: "https://images.unsplash.com/photo-1591017099023-c4e27f315542?q=80&w=774"
      },
      {
        id: 2,
        name: "Batasia Loop",
        description: "Spiral railway track with a war memorial and garden",
        image: "https://images.unsplash.com/photo-1563266857-86c6d44bfb97?q=80&w=774"
      }
    ],
    mapLocation: {
      lat: 27.0410,
      lng: 88.2663
    }
  }
];

export const hotels: Hotel[] = [
  {
    id: 1,
    name: "Taj View Hotel",
    description: "Experience unparalleled luxury with stunning views of the Taj Mahal. Each room offers a unique perspective of this wonder of the world, complemented by our world-class amenities and exceptional service.",
    images: [
      "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=870",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=870",
      "https://images.unsplash.com/photo-1617104551722-b413c0ae03d9?q=80&w=870"
    ],
    destinationId: 1,
    rating: 4.8,
    address: "Taj East Gate Road, Agra, Uttar Pradesh, India",
    amenities: ["Free Wi-Fi", "Swimming Pool", "Spa", "Restaurant", "Room Service", "Fitness Center", "Airport Shuttle"],
    pricePerNight: {
      regular: 12000,
      festival: 15000
    },
    festivalsNearby: ["Taj Mahotsav"],
    rooms: [
      {
        type: "Deluxe Room",
        occupancy: {
          adults: 2,
          children: 1
        },
        availability: 5,
        priceMultiplier: 1
      },
      {
        type: "Premium Suite",
        occupancy: {
          adults: 2,
          children: 2
        },
        availability: 3,
        priceMultiplier: 1.5
      },
      {
        type: "Luxury Suite",
        occupancy: {
          adults: 4,
          children: 2
        },
        availability: 2,
        priceMultiplier: 2.2
      }
    ],
    mapLocation: {
      lat: 27.1731,
      lng: 78.0421
    }
  },
  {
    id: 2,
    name: "The Oberoi Amarvilas",
    description: "Ranked among the top luxury hotels in India, The Oberoi Amarvilas offers breathtaking views of the Taj Mahal from each room and suite. The hotel stands 600 meters from the Taj Mahal and features Mughal-inspired design.",
    images: [
      "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?q=80&w=774",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=870",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=870"
    ],
    destinationId: 1,
    rating: 4.9,
    address: "Taj East Gate Road, Agra, Uttar Pradesh, India",
    amenities: ["Free Wi-Fi", "Swimming Pool", "Spa", "Restaurant", "Room Service", "Fitness Center", "Concierge", "Bar/Lounge", "Business Center"],
    pricePerNight: {
      regular: 25000,
      festival: 32000
    },
    festivalsNearby: ["Taj Mahotsav", "Diwali Celebrations"],
    rooms: [
      {
        type: "Premier Room",
        occupancy: {
          adults: 2,
          children: 1
        },
        availability: 8,
        priceMultiplier: 1
      },
      {
        type: "Luxury Suite",
        occupancy: {
          adults: 2,
          children: 2
        },
        availability: 4,
        priceMultiplier: 1.8
      },
      {
        type: "Kohinoor Suite",
        occupancy: {
          adults: 4,
          children: 2
        },
        availability: 1,
        priceMultiplier: 3.5
      }
    ],
    mapLocation: {
      lat: 27.1680,
      lng: 78.0418
    }
  },
  {
    id: 3,
    name: "Resort Terra Paraiso",
    description: "A beautiful Mediterranean-style resort nestled in the heart of Calangute, offering luxurious accommodation and world-class amenities just minutes from Goa's most famous beaches.",
    images: [
      "https://images.unsplash.com/photo-1580977276076-ae4b8c219b2e?q=80&w=774",
      "https://images.unsplash.com/photo-1607532950891-a8473483e0d8?q=80&w=774",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=870"
    ],
    destinationId: 2,
    rating: 4.6,
    address: "Plot No. 1/172, Umta Vaddo, Calangute, Goa, India",
    amenities: ["Free Wi-Fi", "Swimming Pool", "Restaurant", "Bar", "Room Service", "Garden", "Terrace", "Bicycle Rental"],
    pricePerNight: {
      regular: 8000,
      festival: 14000
    },
    festivalsNearby: ["Carnival", "Sunburn Festival"],
    rooms: [
      {
        type: "Superior Room",
        occupancy: {
          adults: 2,
          children: 1
        },
        availability: 10,
        priceMultiplier: 1
      },
      {
        type: "Deluxe Room",
        occupancy: {
          adults: 3,
          children: 1
        },
        availability: 7,
        priceMultiplier: 1.3
      },
      {
        type: "Family Suite",
        occupancy: {
          adults: 4,
          children: 2
        },
        availability: 3,
        priceMultiplier: 1.8
      }
    ],
    mapLocation: {
      lat: 15.5449,
      lng: 73.7684
    }
  },
  {
    id: 4,
    name: "Taj Lake Palace",
    description: "A luxury hotel located in the middle of Lake Pichola in Udaipur, appearing to float on the water. Built in 1746 as a royal summer palace, it has been converted into a luxury hotel.",
    images: [
      "https://images.unsplash.com/photo-1594128734721-ef35ec825d21?q=80&w=774",
      "https://images.unsplash.com/photo-1570213489059-0aac6626d93d?q=80&w=774",
      "https://images.unsplash.com/photo-1549641088-27fae0b50145?q=80&w=774"
    ],
    destinationId: 3,
    rating: 4.9,
    address: "Lake Pichola, Udaipur, Rajasthan, India",
    amenities: ["Free Wi-Fi", "Swimming Pool", "Spa", "Restaurant", "Room Service", "Fitness Center", "Boat Transportation", "Butler Service"],
    pricePerNight: {
      regular: 30000,
      festival: 45000
    },
    festivalsNearby: ["Mewar Festival", "Diwali Celebrations"],
    rooms: [
      {
        type: "Luxury Room",
        occupancy: {
          adults: 2,
          children: 1
        },
        availability: 6,
        priceMultiplier: 1
      },
      {
        type: "Royal Suite",
        occupancy: {
          adults: 2,
          children: 2
        },
        availability: 4,
        priceMultiplier: 2.5
      },
      {
        type: "Grand Royal Suite",
        occupancy: {
          adults: 4,
          children: 2
        },
        availability: 1,
        priceMultiplier: 4
      }
    ],
    mapLocation: {
      lat: 24.5758,
      lng: 73.6827
    }
  },
  {
    id: 5,
    name: "BrijRama Palace",
    description: "A heritage hotel on the banks of the Ganges River in Varanasi, offering stunning views and a spiritual atmosphere in one of India's oldest living cities.",
    images: [
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=774",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=870",
      "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?q=80&w=870"
    ],
    destinationId: 4,
    rating: 4.8,
    address: "Darbhanga Ghat, Varanasi, Uttar Pradesh, India",
    amenities: ["Free Wi-Fi", "Restaurant", "Room Service", "Airport Shuttle", "Concierge", "Boat Rides", "Yoga Classes", "Spiritual Tours"],
    pricePerNight: {
      regular: 15000,
      festival: 22000
    },
    festivalsNearby: ["Dev Deepawali", "Maha Shivaratri"],
    rooms: [
      {
        type: "Heritage Room",
        occupancy: {
          adults: 2,
          children: 1
        },
        availability: 8,
        priceMultiplier: 1
      },
      {
        type: "Nadidhara Room",
        occupancy: {
          adults: 2,
          children: 2
        },
        availability: 5,
        priceMultiplier: 1.4
      },
      {
        type: "Maharaja Suite",
        occupancy: {
          adults: 3,
          children: 2
        },
        availability: 2,
        priceMultiplier: 2.2
      }
    ],
    mapLocation: {
      lat: 25.3052,
      lng: 83.0185
    }
  },
  {
    id: 6,
    name: "Windermere Estate",
    description: "A plantation retreat perched on a hill offering panoramic views of Munnar's lush valleys and tea gardens. An ideal spot for nature lovers and those seeking tranquility.",
    images: [
      "https://images.unsplash.com/photo-1602866913793-d2932a802479?q=80&w=774",
      "https://images.unsplash.com/photo-1584132869994-873f9363a562?q=80&w=870",
      "https://images.unsplash.com/photo-1614568112072-770f89361490?q=80&w=774"
    ],
    destinationId: 5,
    rating: 4.7,
    address: "Pothamedu, Munnar, Kerala, India",
    amenities: ["Free Wi-Fi", "Restaurant", "Room Service", "Garden", "Hiking", "Plantation Tours", "Library", "Parking"],
    pricePerNight: {
      regular: 10000,
      festival: 13000
    },
    festivalsNearby: ["Onam", "Tea Festival"],
    rooms: [
      {
        type: "Garden Room",
        occupancy: {
          adults: 2,
          children: 1
        },
        availability: 7,
        priceMultiplier: 1
      },
      {
        type: "Estate Room",
        occupancy: {
          adults: 2,
          children: 2
        },
        availability: 5,
        priceMultiplier: 1.3
      },
      {
        type: "Planter's Villa",
        occupancy: {
          adults: 4,
          children: 2
        },
        availability: 3,
        priceMultiplier: 1.8
      }
    ],
    mapLocation: {
      lat: 10.0920,
      lng: 77.0609
    }
  },
  {
    id: 7,
    name: "Mayfair Darjeeling",
    description: "A luxury heritage hotel in Darjeeling with colonial architecture and stunning Himalayan views. Located near the famous Mall Road and offering top-notch amenities.",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=870",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=870",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=870"
    ],
    destinationId: 6,
    rating: 4.8,
    address: "The Mall, Opposite Governor House, Darjeeling, West Bengal, India",
    amenities: ["Free Wi-Fi", "Swimming Pool", "Spa", "Restaurant", "Room Service", "Fitness Center", "Children's Play Area", "Library"],
    pricePerNight: {
      regular: 12000,
      festival: 16000
    },
    festivalsNearby: ["Teesta Tea & Tourism Festival", "Lepchas' Namsoong"],
    rooms: [
      {
        type: "Family Room",
        occupancy: {
          adults: 2,
          children: 2
        },
        availability: 8,
        priceMultiplier: 1
      },
      {
        type: "Deluxe Suite",
        occupancy: {
          adults: 3,
          children: 1
        },
        availability: 4,
        priceMultiplier: 1.5
      },
      {
        type: "Executive Suite",
        occupancy: {
          adults: 4,
          children: 2
        },
        availability: 2,
        priceMultiplier: 2
      }
    ],
    mapLocation: {
      lat: 27.0426,
      lng: 88.2631
    }
  }
];
