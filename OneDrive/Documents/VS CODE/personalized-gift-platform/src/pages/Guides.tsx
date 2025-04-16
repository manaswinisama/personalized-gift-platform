import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

const Guides = () => {
  const guides = [
    {
      id: 1,
      title: "Valentine's Day Gift Guide",
      description: "Find the perfect romantic gifts for your special someone",
      category: "Seasonal",
      readTime: "5 min"
    },
    // Add more guides
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gift Guides</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {guides.map(guide => (
          <div key={guide.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                  {guide.category}
                </span>
                <h2 className="mt-3 text-xl font-semibold">{guide.title}</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{guide.description}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {guide.readTime} read
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <ArrowRight className="h-5 w-5 text-primary-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guides;