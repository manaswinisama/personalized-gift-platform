import { FC } from 'react';
import { Gift } from 'lucide-react';

interface HomeProps {
  onStartClick: () => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Home: FC<HomeProps> = ({ onStartClick, onLoginClick, onSignupClick }) => {
  return (
    <div className="min-h-screen">
      <div className="absolute top-4 right-4 flex gap-4">
        <button
          onClick={onLoginClick}
          className="px-6 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
        >
          Login
        </button>
        <button
          onClick={onSignupClick}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Sign Up
        </button>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <Gift className="w-16 h-16 text-purple-600 mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Gift Finder</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Finding the perfect gift has never been easier. Let our AI-powered platform help you discover thoughtful presents for your loved ones.
        </p>
        <button
          onClick={onStartClick}
          className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;