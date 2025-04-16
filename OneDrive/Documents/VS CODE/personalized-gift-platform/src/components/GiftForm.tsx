import React, { useState } from 'react';
import { Gift, Search, Sparkles } from 'lucide-react';
import { GiftFormData, GiftSuggestion } from '../types';
import { generateExpandedSuggestions } from '../utils/giftUtils';

interface GiftFormProps {
  onSubmit: (suggestions: GiftSuggestion[]) => void;
  isLoading: boolean;
}

export default function GiftForm({ onSubmit, isLoading }: GiftFormProps) {
  const [formData, setFormData] = useState<GiftFormData>({
    age: '',
    gender: '',
    occasion: '',
    relation: '',
    interests: [],
    budget: ''
  });

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const ageRanges = ["13-17", "18-25", "26-35", "36-50", "51+"];
  const occasions = [
    "Birthday", "Anniversary", "Wedding", "Graduation", "Christmas",
    "Mother's Day", "Father's Day", "Valentine's Day", "Housewarming",
    "Retirement", "Baby Shower", "Engagement", "New Job", "Holiday",
    "Thank You", "Get Well", "Congratulations"
  ];
  const relations = [
    "Parent", "Child", "Spouse", "Sibling", "Friend", "Colleague",
    "Boss", "Grandparent", "Partner", "Cousin", "Aunt/Uncle",
    "Niece/Nephew", "In-laws", "Mentor", "Teacher", "Other"
  ];
  const budgetRanges = ["50", "100", "200", "300", "500", "1000", "2000"];
  const commonInterests = [
    "art", "music", "technology", "gaming", "sports", "cooking",
    "reading", "travel", "fitness", "photography", "fashion",
    "outdoors", "wellness", "beauty", "science", "crafts",
    "gardening", "movies", "food", "pets", "dance", "writing",
    "cars", "collecting", "DIY", "meditation", "yoga", "hiking",
    "camping", "fishing", "painting", "drawing", "sculpture"
  ];

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
      
      setFormData(prevData => ({
        ...prevData,
        interests: newInterests
      }));
      
      return newInterests;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const suggestions = generateExpandedSuggestions(formData);
    onSubmit(suggestions);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 sticky top-4">
      <div className="flex items-center mb-6">
        <Gift className="w-8 h-8 text-purple-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Gift Finder</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Age Range</label>
          <select
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="">Select age range</option>
            {ageRanges.map(range => (
              <option key={range} value={range}>{range} years</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Occasion</label>
          <select
            name="occasion"
            value={formData.occasion}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="">Select occasion</option>
            {occasions.map(occasion => (
              <option key={occasion} value={occasion}>{occasion}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Relationship</label>
          <select
            name="relation"
            value={formData.relation}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="">Select relationship</option>
            {relations.map(relation => (
              <option key={relation} value={relation}>{relation}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Interests</label>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-4 bg-gray-50 rounded-lg">
            {commonInterests.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedInterests.includes(interest)
                    ? 'bg-purple-600 text-white shadow-md transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Budget ($)</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="">Select budget</option>
            {budgetRanges.map(budget => (
              <option key={budget} value={budget}>Up to ${budget}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg hover:bg-purple-700 
                   transition-all duration-200 flex items-center justify-center space-x-2
                   focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transform hover:scale-[1.02]"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
          ) : (
            <>
              <Search className="w-6 h-6" />
              <span className="font-semibold">Find Perfect Gifts</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}