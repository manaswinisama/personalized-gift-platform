export interface GiftFormData {
  age: string;
  gender: string;
  occasion: string;
  relation: string;
  interests: string[];
  budget: string;
}

export interface GiftSuggestion {
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