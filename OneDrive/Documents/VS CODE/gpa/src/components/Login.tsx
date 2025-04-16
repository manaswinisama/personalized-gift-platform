import { FC, useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onBack: () => void;
}

const Login: FC<LoginProps> = ({ onBack }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="flex items-center text-purple-600 hover:text-purple-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to Home
        </button>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-8 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-purple-600 hover:text-purple-700">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
