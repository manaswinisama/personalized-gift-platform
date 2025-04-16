import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Gift } from 'lucide-react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GiftFinder from './pages/GiftFinder';

function App() {
  return (
    <>
      <nav className="bg-purple-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center">
              <Gift className="h-8 w-8 text-purple-300" />
              <span className="ml-2 text-xl font-semibold text-white">GiftAI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/finder" element={<GiftFinder />} />
      </Routes>
    </>
  );
}

export default App;
