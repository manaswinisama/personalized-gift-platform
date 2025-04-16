import React, { useState } from 'react';
import GiftForm from '../components/GiftForm';
import GiftSuggestions from '../components/GiftSuggestions';
import { GiftSuggestion } from '../types';

export default function GiftFinder() {
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (newSuggestions: GiftSuggestion[]) => {
    setIsLoading(true);
    setSuggestions(newSuggestions);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Find the Perfect Gift</h1>
          <p className="text-lg text-gray-600">Personalized gift suggestions based on your preferences</p>
        </header>
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <GiftForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
              </div>
            ) : (
              <GiftSuggestions suggestions={suggestions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
