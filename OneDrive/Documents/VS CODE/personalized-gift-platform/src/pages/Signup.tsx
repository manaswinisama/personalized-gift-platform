import React from 'react';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" className="border rounded w-full py-2 px-3" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" className="border rounded w-full py-2 px-3" required />
          </div>
          <button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
