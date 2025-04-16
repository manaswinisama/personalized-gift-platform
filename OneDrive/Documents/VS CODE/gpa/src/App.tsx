import React, { useState } from 'react';
import { Gift, Search, Heart, Sparkles, Star, StarHalf, ExternalLink, X, ArrowLeft } from 'lucide-react';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

interface GiftFormData {
  age: string;
  gender: string;
  occasion: string;
  relation: string;
  interests: string[];
  budget: string;
}

interface GiftSuggestion {
  name: string;
  price: number;
  image: string;
  description: string;
  categories: {
    ageRange: string[];
    gender: string[];
    occasions: string[];
    relations: string[];
    interests: string[];
  };
}

const SAMPLE_GIFTS: GiftSuggestion[] = [
  {
    name: "Vintage Polaroid Camera",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500",
    description: "Perfect for photography enthusiasts who love capturing memories instantly.",
    categories: {
      ageRange: ["18-25", "26-35"],
      gender: ["male", "female", "other"],
      occasions: ["birthday", "graduation", "christmas"],
      relations: ["friend", "sibling"],
      interests: ["photography", "art", "technology"]
    }
  },
  // ... [Rest of the SAMPLE_GIFTS array remains exactly the same]
];

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'form' | 'login' | 'signup'>('home');
  const [formData, setFormData] = useState<GiftFormData>({
    age: '',
    gender: '',
    occasion: '',
    relation: '',
    interests: [],
    budget: ''
  });
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<GiftSuggestion[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorite = (gift: GiftSuggestion) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.name === gift.name);
      if (exists) {
        return prev.filter(item => item.name !== gift.name);
      }
      return [...prev, gift];
    });
  };

  const resetForm = () => {
    setFormData({
      age: '',
      gender: '',
      occasion: '',
      relation: '',
      interests: [],
      budget: ''
    });
    setSelectedInterests([]);
    setSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      const newInterests = prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest];
      
      setFormData(prev => ({
        ...prev,
        interests: newInterests
      }));
      
      return newInterests;
    });
  };

  const clearInterests = () => {
    setSelectedInterests([]);
    setFormData(prev => ({ ...prev, interests: [] }));
  };

  const renderRating = (score: number) => {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
      </div>
    );
  };

  const filterGifts = (data: GiftFormData): GiftSuggestion[] => {
    const budget = parseInt(data.budget);
    
    const weightedGifts = SAMPLE_GIFTS.map(gift => {
      let score = 0;
      if (gift.price > budget) return { gift, score: -1 };
      if (data.age && gift.categories.ageRange.includes(data.age)) score += 1;
      if (data.gender && gift.categories.gender.includes(data.gender)) score += 1;
      if (data.occasion && gift.categories.occasions.includes(data.occasion.toLowerCase())) score += 1;
      if (data.relation && gift.categories.relations.includes(data.relation.toLowerCase())) score += 1;
      if (data.interests.length > 0) {
        const matchedInterests = gift.categories.interests.filter(i => data.interests.includes(i));
        score += matchedInterests.length;
      }
      return { gift, score };
    });
    
    return weightedGifts
      .filter(item => item.score >= 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.gift);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const filteredGifts = filterGifts(formData);
      setSuggestions(filteredGifts);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {currentView === 'home' && (
        <Home 
          onStartClick={() => setCurrentView('form')}
          onLoginClick={() => setCurrentView('login')}
          onSignupClick={() => setCurrentView('signup')}
        />
      )}
      {currentView === 'form' && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center text-purple-600 hover:text-purple-700"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to Home
            </button>
            <div className="flex items-center">
              <Gift className="w-8 h-8 text-purple-600 mr-2" />
              <h1 className="text-3xl font-bold text-gray-800">AI Gift Finder</h1>
            </div>
            <div className="w-24"></div>
          </div>

          <div className="max-w-xl mx-auto mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Find Perfect Gifts</h2>
              <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
                  <select
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    required
                  >
                    <option value="">Select age range</option>
                    <option value="13-17">13-17</option>
                    <option value="18-25">18-25</option>
                    <option value="26-35">26-35</option>
                    <option value="36-50">36-50</option>
                    <option value="51+">51+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Occasion</label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    required
                  >
                    <option value="">Select occasion</option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="wedding">Wedding</option>
                    <option value="graduation">Graduation</option>
                    <option value="christmas">Christmas</option>
                    <option value="mother's day">Mother's Day</option>
                    <option value="father's day">Father's Day</option>
                    <option value="valentine's day">Valentine's Day</option>
                    <option value="housewarming">Housewarming</option>
                    <option value="retirement">Retirement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                  <select
                    name="relation"
                    value={formData.relation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    required
                  >
                    <option value="">Select relationship</option>
                    <option value="parent">Parent</option>
                    <option value="child">Child</option>
                    <option value="spouse">Spouse</option>
                    <option value="sibling">Sibling</option>
                    <option value="friend">Friend</option>
                    <option value="colleague">Colleague</option>
                    <option value="boss">Boss</option>
                    <option value="grandparent">Grandparent</option>
                    <option value="partner">Partner</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter your budget"
                    required
                    min="0"
                  />
                </div>

                <div className="flex gap-4 flex-wrap">
                  {[
                    "art", "music", "technology", "gaming", "sports",
                    "cooking", "reading", "travel", "fitness", "photography",
                    "fashion", "outdoors", "wellness", "beauty", "science",
                    "crafts", "gardening", "movies", "food", "pets"
                  ].map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                        selectedInterests.includes(interest)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                  {selectedInterests.length > 0 && (
                    <button
                      type="button"
                      onClick={clearInterests}
                      className="ml-2 px-3 py-1 rounded-full text-sm font-medium text-red-500 hover:text-red-600"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        Find Perfect Gifts
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {(formData.age || formData.gender || formData.occasion || formData.relation || formData.budget) && (
              <div className="mt-4 p-3 bg-purple-50 rounded-md">
                <h3 className="text-sm font-medium text-purple-700 mb-2">Selected Filters:</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.age && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-sm">
                      Age: {formData.age} years
                    </span>
                  )}
                  {formData.gender && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-sm">
                      Gender: {formData.gender}
                    </span>
                  )}
                  {formData.occasion && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-sm">
                      Occasion: {formData.occasion}
                    </span>
                  )}
                  {formData.relation && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-sm">
                      Relation: {formData.relation}
                    </span>
                  )}
                  {formData.budget && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-sm">
                      Budget: Up to ${formData.budget}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {showFavorites ? 'Favorite Gifts' : 'Gift Suggestions'}
                </h2>
                <button
                  onClick={() => setShowFavorites(!showFavorites)}
                  className="text-purple-600 hover:text-purple-700 flex items-center"
                >
                  <Heart className={`w-5 h-5 mr-1 ${showFavorites ? 'fill-red-500' : ''}`} />
                  {showFavorites ? 'View Suggestions' : 'View Favorites'}
                </button>
              </div>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : suggestions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <Sparkles className="w-12 h-12 mb-2" />
                  <p>Fill out the form to get personalized gift suggestions</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestions.map((gift, index) => (
                    <div key={index} className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="relative">
                        <img
                          src={gift.image}
                          alt={gift.name}
                          className="w-full h-48 object-cover"
                        />
                        <button
                          onClick={() => toggleFavorite(gift)}
                          className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow hover:bg-gray-100"
                        >
                          <Heart className={`w-5 h-5 ${favorites.some(f => f.name === gift.name) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg line-clamp-2">{gift.name}</h3>
                          <span className="text-green-600 font-medium whitespace-nowrap ml-2">
                            ${gift.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{gift.description}</p>
                        <div className="flex items-center justify-between">
                          {renderRating(4 + Math.random())}
                          <a
                            href={`https://www.amazon.com/s?k=${encodeURIComponent(gift.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-purple-600 hover:text-purple-700 text-sm font-medium"
                          >
                            View on Amazon
                            <ExternalLink className="w-4 h-4 ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {currentView === 'login' && (
        <Login onBack={() => setCurrentView('home')} />
      )}
      {currentView === 'signup' && (
        <Signup onBack={() => setCurrentView('home')} />
      )}
    </div>
  );
}

export default App;
