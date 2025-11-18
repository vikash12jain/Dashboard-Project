import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header'; 
import Footer from '../Components/Footer';

const NotFound404 = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 bg-gray-50">
        <h1 className="text-9xl font-extrabold text-stone-800 tracking-widest">404</h1>
        <div className="bg-amber-500 px-4 text-sm rounded absolute text-white">
          Page Not Found
        </div>
        <div className="mt-5 text-center max-w-lg">
          <p className="text-2xl font-semibold mb-3 text-gray-800">Whoops! Lost in Space.</p>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed, or simply never existed.
          </p>
          <Link
            to="/"
            className="px-6 py-3 text-sm font-semibold rounded-full bg-amber-500 text-stone-800 hover:bg-amber-600 transition-colors"
          >
            Return to Store
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound404;