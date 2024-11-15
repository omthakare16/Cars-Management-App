import React from "react";
import { ExternalLink } from "lucide-react";

const SwaggerDocs = () => {
  const handleClick = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/api/docs`, '_blank');
  };

  return (
    <div className="flex items-center justify-center min-h-[200px] p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">API Documentation</h2>
        <p className="text-gray-600 mb-6">
          Access our comprehensive API documentation using Swagger UI
        </p>
        <button
          onClick={handleClick}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          <span>View Swagger Docs</span>
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SwaggerDocs;