import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

const AdminDashboardPage = () => {
  return (<>
  <Header/>
    <div className="p-8 mt-15 bg-gray-50 min-h-full">
      <h1 className="text-4xl font-extrabold text-stone-800 mb-10 border-b-2 border-amber-500 pb-3">
        Admin Dashboard Overview
      </h1>
      <div className="flex flex-col space-y-6 max-w-2xl mx-auto">
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 w-full">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2 flex items-center">
            👥 User Management (CRUD)
          </h2>
          <p className="text-gray-600 mb-4">
            **Control and maintain all user accounts.** This section allows you to **view, create, edit, and delete** customer and admin profiles. Ensure proper access levels and manage permissions.
          </p>
          <Link 
            to="/admin/users" 
            className="inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Users Management
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 w-full">
          <h2 className="text-2xl font-semibold text-stone-800 mb-2 flex items-center">
            📦 Product Management (CRUD)
          </h2>
          <p className="text-gray-600 mb-4">
            **Manage the entire product catalog and inventory.** Use this area to **create new products, update stock quantity**, modify pricing, and edit product details or images.
          </p>
          <Link 
            to="/admin/products" 
            className="inline-block bg-stone-800 text-amber-100 font-bold py-2 px-4 rounded-lg hover:bg-stone-700 transition-colors"
          >
            Go to Products Management
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminDashboardPage;