import React from 'react';
import { Gift, ArrowRight, Sparkles, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-white rounded-full shadow-xl mb-8">
            <Gift className="w-16 h-16 text-purple-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Find the Perfect Gift with AI
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Let our intelligent gift finder help you discover thoughtful, personalized presents 
            for your loved ones. We analyze interests, occasions, and relationships to suggest 
            the most meaningful gifts.
          </p>
          <button
            onClick={() => navigate('/finder')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-full text-xl font-semibold 
                     hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
                     flex items-center justify-center mx-auto space-x-3"
          >
            <span>Start Finding Gifts</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">AI-Powered Suggestions</h3>
            <p className="text-gray-600">Our intelligent algorithm analyzes multiple factors to recommend the perfect gifts.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-pink-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Personalized Results</h3>
            <p className="text-gray-600">Get tailored gift suggestions based on interests, occasion, and relationship.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
              <Star className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Curated Selection</h3>
            <p className="text-gray-600">Discover unique and thoughtful gifts from our carefully curated collection.</p>
          </div>
        </div>
      </div>
    </div>
  );
}