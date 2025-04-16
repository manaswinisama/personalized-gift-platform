import React, { useState } from 'react';
import { Gift, Heart, ShoppingBag } from 'lucide-react';

const Recommendations = () => {
  const [gifts] = useState([
    {
      id: 1,
      name: "Personalized Photo Album",
      price: 29.99,
      category: "Personalized",
      rating: 4.5,
      image: "https://www.fizzer.com/wp-content/uploads/pages-album-photo-en-ligne.webp"
    },
    {
      id: 2,
      name: "Custom Name Necklace",
      price: 49.99,
      category: "Jewelry",
      rating: 4.8,
      image: "https://i.etsystatic.com/27566167/r/il/576b7b/3830467984/il_fullxfull.3830467984_95ez.jpg"
    },
    {
      id: 3,
      name: "Engraved Watch",
      price: 89.99,
      category: "Accessories",
      rating: 4.7,
      image: "https://cdn.notonthehighstreet.com/fs/90/c7/6544-3315-4ea9-8df3-bdec3695b256/original_personalised-watch-with-photo.jpg"
    },
    {
      id: 4,
      name: "Custom Family Portrait",
      price: 59.99,
      category: "Art",
      rating: 4.9,
      image: "https://i.etsystatic.com/35859898/r/il/e8e372/4081233354/il_fullxfull.4081233354_7zac.jpg"
    },
    {
      id: 5,
      name: "Personalized Coffee Mug",
      price: 19.99,
      category: "Home",
      rating: 4.3,
      image: "https://i.etsystatic.com/37648502/r/il/9771be/4499975337/il_fullxfull.4499975337_soxf.jpg"
    },
    {
      id: 6,
      name: "Custom Pet Portrait",
      price: 39.99,
      category: "Art",
      rating: 4.6,
      image: "https://i.etsystatic.com/31227058/r/il/b442f2/3870215050/il_fullxfull.3870215050_7zr6.jpg"
    }
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gift Recommendations</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gifts.map(gift => (
          <div key={gift.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
              <img 
                src={gift.image} 
                alt={gift.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{gift.name}</h3>
                <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                  {gift.category}
                </span>
              </div>
              <p className="text-primary-600 font-medium mt-2">${gift.price}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-400">{'★'.repeat(Math.floor(gift.rating))}{'½'.repeat(gift.rating % 1 > 0 ? 1 : 0)}</span>
                <span className="text-sm text-gray-500 ml-1">{gift.rating}</span>
              </div>
              <div className="flex justify-between mt-4">
                <button className="flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200">
                  <Heart className="h-4 w-4 mr-1" />
                  Save
                </button>
                <button className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-full text-sm hover:bg-primary-700 transition-all duration-200 transform hover:-translate-y-0.5">
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;