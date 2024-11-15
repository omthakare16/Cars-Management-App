import React from 'react';
import { Link } from 'react-router-dom';
import { Car, PlusCircle, Search } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        <div className="flex items-center justify-center">
          <Car className="h-16 w-16 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Car Management</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/cars"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors duration-200"
          >
            <Search className="h-6 w-6 mr-2" />
            View Cars
          </Link>
          <Link
            to="/create"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors duration-200"
          >
            <PlusCircle className="h-6 w-6 mr-2" />
            Add New Car
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;