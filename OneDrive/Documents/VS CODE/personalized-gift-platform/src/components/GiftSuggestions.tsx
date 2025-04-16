import React from 'react';
import { Heart, ExternalLink, Star, StarHalf, Sparkles } from 'lucide-react';
import { GiftSuggestion } from '../types';

interface GiftSuggestionsProps {
  suggestions: GiftSuggestion[];
}

export default function GiftSuggestions({ suggestions }: GiftSuggestionsProps) {
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

  return (
    <div className="bg-white rounded-xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gift Suggestions</h2>
      {suggestions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-gray-500 bg-gray-50 rounded-lg">
          <Sparkles className="w-16 h-16 mb-4 text-purple-400" />
          <p className="text-xl font-medium mb-2">No Suggestions Yet</p>
          <p className="text-gray-400">Fill out the form to get personalized gift ideas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.map((gift, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img
                  src={gift.image}
                  alt={gift.name}
                  className="w-full h-56 object-cover"
                />
                <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110">
                  <Heart className="w-5 h-5 text-red-500" />
                </button>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-800 line-clamp-2">{gift.name}</h3>
                  <span className="text-green-600 font-bold whitespace-nowrap ml-2">
                    ${gift.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{gift.description}</p>
                <div className="flex items-center justify-between">
                  {renderRating(4 + Math.random())}
                  <a
                    href={`https://www.amazon.com/s?k=${encodeURIComponent(gift.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
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
  );
}