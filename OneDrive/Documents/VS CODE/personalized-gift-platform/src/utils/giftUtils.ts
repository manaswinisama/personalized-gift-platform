import { GiftFormData, GiftSuggestion } from '../types';

const EXPANDED_GIFT_DATABASE: GiftSuggestion[] = [
  {
    name: "Vintage Polaroid Camera",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500",
    description: "Perfect for photography enthusiasts who love capturing memories instantly.",
    categories: {
      ageRange: ["18-25", "26-35"],
      gender: ["male", "female", "other"],
      occasions: ["Birthday", "Graduation", "Christmas"],
      relations: ["Friend", "Sibling"],
      interests: ["photography", "art", "technology"]
    }
  },
  {
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=500",
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.",
    categories: {
      ageRange: ["18-25", "26-35", "36-50"],
      gender: ["male", "female", "other"],
      occasions: ["Birthday", "Christmas", "Anniversary"],
      relations: ["Spouse", "Partner", "Friend"],
      interests: ["fitness", "technology", "sports"]
    }
  },
  {
    name: "Professional Art Set",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=500",
    description: "Complete art set with premium materials for the aspiring artist.",
    categories: {
      ageRange: ["13-17", "18-25", "26-35"],
      gender: ["male", "female", "other"],
      occasions: ["Birthday", "Graduation", "Christmas"],
      relations: ["Child", "Sibling", "Friend"],
      interests: ["art", "crafts", "painting"]
    }
  },
  {
    name: "Gourmet Coffee Maker",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=500",
    description: "Professional-grade coffee maker for the perfect brew every morning.",
    categories: {
      ageRange: ["26-35", "36-50", "51+"],
      gender: ["male", "female", "other"],
      occasions: ["Housewarming", "Wedding", "Anniversary"],
      relations: ["Parent", "Spouse", "Colleague"],
      interests: ["coffee", "cooking", "food"]
    }
  },
  {
    name: "Wireless Noise-Canceling Headphones",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500",
    description: "Premium headphones with active noise cancellation for immersive audio experience.",
    categories: {
      ageRange: ["13-17", "18-25", "26-35"],
      gender: ["male", "female", "other"],
      occasions: ["Birthday", "Graduation", "Christmas"],
      relations: ["Friend", "Child", "Sibling"],
      interests: ["music", "technology", "gaming"]
    }
  }
];

export const generateExpandedSuggestions = (formData: GiftFormData): GiftSuggestion[] => {
  const budget = parseInt(formData.budget);
  
  const weightedGifts = EXPANDED_GIFT_DATABASE.map(gift => {
    let score = 0;

    // Exclude items over budget
    if (gift.price > budget) return { gift, score: -1 };

    // Age match (25 points)
    if (gift.categories.ageRange.includes(formData.age)) {
      score += 25;
    }

    // Gender match (15 points)
    if (gift.categories.gender.includes(formData.gender.toLowerCase())) {
      score += 15;
    }

    // Occasion match (20 points)
    if (gift.categories.occasions.some(occ => 
      occ.toLowerCase() === formData.occasion.toLowerCase()
    )) {
      score += 20;
    }

    // Relation match (15 points)
    if (gift.categories.relations.some(rel => 
      rel.toLowerCase() === formData.relation.toLowerCase()
    )) {
      score += 15;
    }

    // Interest matches (25 points total, weighted by number of matches)
    if (formData.interests.length > 0) {
      const interestMatches = formData.interests.filter(interest =>
        gift.categories.interests.includes(interest.toLowerCase())
      ).length;
      score += (interestMatches / formData.interests.length) * 25;
    }

    // Price optimization (10 points, decreases as price differs from budget)
    const priceDiff = Math.abs(gift.price - budget);
    const priceScore = Math.max(0, 10 - (priceDiff / budget) * 10);
    score += priceScore;

    return { gift, score };
  });

  // Filter out items over budget and sort by score
  return weightedGifts
    .filter(item => item.score >= 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.gift)
    .slice(0, 50); // Return top 50 matches
};