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
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <GiftForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-3">
            <GiftSuggestions suggestions={suggestions} />
          </div>
        </div>
      </div>
    </div>
  );
}