const Guides = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gift Guides</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Occasion-based Guides */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft">
          <h2 className="text-xl font-semibold mb-4">Occasion Guides</h2>
          <ul className="space-y-3">
            <li className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
              <a href="#" className="text-primary-600 hover:text-primary-700">Birthday Gift Guide</a>
            </li>
            <li className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
              <a href="#" className="text-primary-600 hover:text-primary-700">Anniversary Gift Guide</a>
            </li>
            <li className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
              <a href="#" className="text-primary-600 hover:text-primary-700">Wedding Gift Guide</a>
            </li>
          </ul>
        </div>

        {/* Recipient-based Guides */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft">
          <h2 className="text-xl font-semibold mb-4">Recipient Guides</h2>
          <ul className="space-y-3">
            <li className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
              <a href="#" className="text-primary-600 hover:text-primary-700">Gifts for Mom</a>
            </li>
            <li className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
              <a href="#" className="text-primary-600 hover:text-primary-700">Gifts for Dad</a>
            </li>
            <li className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
              <a href="#" className="text-primary-600 hover:text-primary-700">Gifts for Partners</a>
            </li>
          </ul>
        </div>

        {/* Budget-based Guides */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft">
          <h2 className="text-xl font-semibold mb-4">Budget Guides</h2>
          <ul className="space-y-3">
            <li className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
              <a href="#" className="text-primary-600 hover:text-primary-700">Gifts Under $25</a>
            </li>
            <li className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
              <a href="#" className="text-primary-600 hover:text-primary-700">Gifts Under $50</a>
            </li>
            <li className="hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
              <a href="#" className="text-primary-600 hover:text-primary-700">Luxury Gifts</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Guides;