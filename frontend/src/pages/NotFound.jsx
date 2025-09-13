// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-purple-800 text-white p-6">
    <h1 className="text-6xl font-extrabold mb-4">404</h1>
    <p className="text-xl mb-6">Oops! Page not found.</p>
    <Link
      to="/"
      className="px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 transition text-white font-medium"
    >
      Go back home
    </Link>
  </div>
);

export default NotFound;
