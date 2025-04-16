import { useState } from 'react';
import { Search, Heart, Share2, ExternalLink, Star } from 'lucide-react';

interface Recommendation {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
  tags: string[];
  reviews: number;
  inStock: boolean;
}

const Recommendations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [category, setCategory] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('popular');

  const recommendations: Recommendation[] = [
    {
      id: 1,
      title: "Personalized Photo Album",
      price: 29.99,
      category: "Personalized",
      image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5",
      rating: 4.5,
      description: "A beautiful photo album that can be customized with personal photos and messages.",
      tags: ["thoughtful", "customizable", "memories"],
      reviews: 128,
      inStock: true
    },
    {
      id: 2,
      title: "Smart Watch Series X",
      price: 199.99,
      category: "Technology",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
      rating: 4.8,
      description: "Latest smartwatch with health tracking, notifications, and premium design.",
      tags: ["tech", "wearable", "trending"],
      reviews: 256,
      inStock: true
    },
    {
      id: 3,
      title: "Designer Leather Wallet",
      price: 49.99,
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
      rating: 4.7,
      description: "Genuine leather wallet with elegant design and premium finish.",
      tags: ["fashion", "leather", "trending"],
      reviews: 89,
      inStock: true
    },
    {
      id: 4,
      title: "Custom Star Map",
      price: 39.99,
      category: "Personalized",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      rating: 4.9,
      description: "Beautiful star map showing the night sky from any date and location.",
      tags: ["romantic", "customizable", "art"],
      reviews: 156,
      inStock: true
    },
    {
      id: 5,
      title: "Smart Home Diffuser",
      price: 79.99,
      category: "Home & Living",
      image: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff",
      rating: 4.6,
      description: "App-controlled essential oil diffuser with ambient lighting.",
      tags: ["home", "smart-home", "wellness"],
      reviews: 92,
      inStock: false
    },
    {
      id: 6,
      title: "Smart Home Assistant",
      price: 129.99,
      category: "Technology",
      image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd",
      rating: 4.7,
      description: "Voice-controlled smart home hub with premium speaker.",
      tags: ["tech", "smart-home", "bestseller"],
      reviews: 312,
      inStock: true
    },
    {
      id: 7,
      title: "Personalized Name Necklace",
      price: 45.99,
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
      rating: 4.8,
      description: "Custom-made sterling silver necklace with personalized name or message.",
      tags: ["jewelry", "customizable", "fashion"],
      reviews: 178,
      inStock: true
    },
    {
      id: 8,
      title: "Smart Garden System",
      price: 159.99,
      category: "Home & Living",
      image: "https://images.unsplash.com/photo-1585400172949-b41256c42387",
      rating: 4.5,
      description: "Self-watering indoor garden with LED grow lights and smartphone control.",
      tags: ["garden", "smart-home", "tech"],
      reviews: 145,
      inStock: true
    },
    {
      id: 9,
      title: "Customized Family Portrait",
      price: 89.99,
      category: "Personalized",
      image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9",
      rating: 4.9,
      description: "Hand-drawn digital family portrait with customizable style and background.",
      tags: ["art", "customizable", "family"],
      reviews: 203,
      inStock: true
    },
    {
      id: 10,
      title: "Smart Fitness Ring",
      price: 299.99,
      category: "Technology",
      image: "https://images.unsplash.com/photo-1535012794658-cca9ecd30b2f",
      rating: 4.7,
      description: "Advanced fitness tracking ring with sleep monitoring and activity metrics.",
      tags: ["tech", "fitness", "wellness"],
      reviews: 167,
      inStock: true
    },
    {
      id: 11,
      title: "Luxury Scented Candle Set",
      price: 69.99,
      category: "Home & Living",
      image: "https://images.unsplash.com/photo-1602874801007-aa87920204b0",
      rating: 4.8,
      description: "Set of three premium scented candles in elegant glass containers.",
      tags: ["home", "luxury", "relaxation"],
      reviews: 134,
      inStock: true
    },
    {
      id: 12,
      title: "Designer Silk Scarf",
      price: 89.99,
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
      rating: 4.6,
      description: "Luxurious silk scarf with unique artistic print and premium finish.",
      tags: ["fashion", "luxury", "accessories"],
      reviews: 91,
      inStock: true
    },
    {
      id: 13,
      title: "Personalized Recipe Cutting Board",
      price: 49.99,
      category: "Personalized",
      image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de",
      rating: 4.8,
      description: "Handcrafted wooden cutting board with engraved family recipe.",
      tags: ["kitchen", "customizable", "family"],
      reviews: 145,
      inStock: true
    },
    {
      id: 14,
      title: "Smart Plant Sensor",
      price: 39.99,
      category: "Technology",
      image: "https://images.unsplash.com/photo-1586436204826-92357a8d4dd7",
      rating: 4.5,
      description: "Wireless plant monitor that tracks soil moisture, light, and temperature.",
      tags: ["garden", "tech", "smart-home"],
      reviews: 88,
      inStock: true
    },
    {
      id: 15,
      title: "Handwoven Throw Blanket",
      price: 79.99,
      category: "Home & Living",
      image: "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6",
      rating: 4.9,
      description: "Premium cotton throw blanket with artistic geometric pattern.",
      tags: ["cozy", "home", "handmade"],
      reviews: 167,
      inStock: true
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredRecommendations = recommendations
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesPrice = priceRange === 'all' ||
        (priceRange === 'under25' && item.price < 25) ||
        (priceRange === 'under50' && item.price < 50) ||
        (priceRange === 'under100' && item.price < 100) ||
        (priceRange === 'over100' && item.price >= 100);

      const matchesCategory = category === 'all' || item.category.toLowerCase() === category;

      return matchesSearch && matchesPrice && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviews - a.reviews;
    });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gift Recommendations</h1>
      
      {/* Enhanced Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search gifts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Prices</option>
          <option value="under25">Under $25</option>
          <option value="under50">Under $50</option>
          <option value="under100">Under $100</option>
          <option value="over100">Over $100</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Categories</option>
          <option value="personalized">Personalized</option>
          <option value="technology">Technology</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home & Living</option>
        </select>
      
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {['thoughtful', 'customizable', 'trending', 'bestseller'].map(tag => (
          <button
            key={tag}
            onClick={() => setSearchTerm(tag)}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm hover:bg-primary-50 dark:hover:bg-gray-600"
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Enhanced Recommendations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecommendations.map(item => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden group">
            <div className="relative">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover group-hover:opacity-75 transition-opacity" />
              <button
                onClick={() => toggleFavorite(item.id)}
                className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform"
              >
                <Heart 
                  className={`h-5 w-5 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
                />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                {!item.inStock && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Out of Stock</span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{item.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {item.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary-600 font-bold">${item.price.toFixed(2)}</span>
                <div className="flex items-center gap-2">
                  <span className="flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    {item.rating} ({item.reviews})
                  </span>
                  <button className="p-1 hover:text-primary-600">
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button className="p-1 hover:text-primary-600">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;