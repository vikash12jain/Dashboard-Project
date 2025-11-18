import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header'; 
import Footer from '../Components/Footer';

const Forbidden403 = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 bg-gray-50">
        <h1 className="text-9xl font-extrabold text-red-600 tracking-widest">403</h1>
        <div className="bg-red-600 px-4 text-sm rounded rotate-12 absolute text-white">
          Access Denied!
        </div>
        <div className="mt-5 text-center max-w-lg">
          <p className="text-2xl font-semibold mb-3 text-gray-800">FORBIDDEN</p>
          <p className="text-gray-600 mb-8">
            You do not have the necessary <span className='font-bold' >administrator permissions</span> to view this page or perform this action. 
            If you believe this is an error, please contact support.
          </p>
          <Link
            to="/"
            className="px-6 py-3 text-sm font-semibold rounded-full bg-stone-800 text-amber-100 hover:bg-stone-700 transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Forbidden403;