import { useState } from 'react';
import { 
  Gift, 
  Calendar, 
  Home as HomeIcon, 
  X, 
  Menu, 
  Search, 
  Sun, 
  Moon,
  BookOpen 
} from 'lucide-react';
import { 
  Routes, 
  Route, 
  Link, 
  useLocation, 
  useNavigate 
} from 'react-router-dom';
import Occasions from './pages/Occasions';
import Recommendations from './pages/Recommendations';
import Guides from './pages/Guides';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GiftFinder from './pages/GiftFinder';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isNotHomePage = location.pathname !== '/';

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen`}>
      {/* Quick Access Floating Menu */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        <button
          onClick={() => navigate('/occasions')}
          className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-soft transition-all duration-300 hover:scale-110 group relative"
        >
          <Calendar className="h-6 w-6" />
          <span className="absolute left-full ml-2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 whitespace-nowrap">
            Special Occasions
          </span>
        </button>
        <button
          onClick={() => navigate('/recommendations')}
          className="bg-secondary-600 hover:bg-secondary-700 text-white p-3 rounded-full shadow-soft transition-all duration-300 hover:scale-110 group relative"
        >
          <Gift className="h-6 w-6" />
          <span className="absolute left-full ml-2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 whitespace-nowrap">
            Gift Ideas
          </span>
        </button>
        <button
          onClick={() => navigate('/guides')}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-soft transition-all duration-300 hover:scale-110 group relative"
        >
          <BookOpen className="h-6 w-6" />
          <span className="absolute left-full ml-2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 whitespace-nowrap">
            Gift Guides
          </span>
        </button>
      </div>

      {/* Existing back to home button */}
      {isNotHomePage && (
        <button
          onClick={() => navigate('/')}
          className="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-soft transition-all duration-300 hover:scale-110"
        >
          <HomeIcon className="h-6 w-6" />
        </button>
      )}

      <nav className="bg-white dark:bg-gray-800 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button
                className="sm:hidden mr-2 text-gray-600 dark:text-gray-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
              <Link to="/" className="flex items-center group">
                <Gift className="h-8 w-8 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  GiftAI
                </span>
              </Link>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for the perfect gift..."
                  className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-300"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="hidden sm:flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-300"
              >
                {isDarkMode ? <Sun /> : <Moon />}
              </button>
              <Link to="/login">
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4">
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Search for the perfect gift..."
                className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                Login
              </Link>
              <Link to="/signup" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/finder" element={<GiftFinder />} />
          <Route path="/occasions" element={<Occasions />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/history" element={<div>Search History</div>} />
          <Route path="/notifications" element={<div>Notifications</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
