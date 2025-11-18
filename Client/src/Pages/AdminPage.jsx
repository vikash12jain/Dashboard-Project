import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { Users, Package, ArrowRight, TrendingUp, BarChart } from 'lucide-react'; 
import UserDataChart from '../Components/UserDataChart';
import ProductSalesData from '../Components/ProductSalesData';

// Reusable component for the primary management links (User/Product)
const ManagementCard = ({ title, description, linkTo, icon: Icon, colorClass }) => (
    <div className={`bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 ${colorClass}`}>
        <div className="flex items-center mb-2">
            <Icon className={`w-6 h-6 ${colorClass.replace('border-l-4 border-', 'text-')} mr-3 flex-shrink-0`} />
            <h2 className={`text-xl font-bold ${colorClass.replace('border-l-4 border-', 'text-')}800`}>
                {title}
            </h2>
        </div>
        <p className="text-gray-600 text-sm mb-4">
            {description}
        </p>
        <Link 
            to={linkTo} 
            className={`inline-flex items-center text-sm font-semibold ${colorClass.replace('border-l-4 border-', 'text-')}600 hover:${colorClass.replace('border-l-4 border-', 'text-')}800 transition-colors`}
        >
            Manage Now
            <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
    </div>
);


const AdminDashboardPage = () => {
    
    return (
        <>
            <Header />
            <div className="p-8 mt-15 bg-gray-50 min-h-screen">
                
                {/* --- 1. Dashboard Header --- */}
                <h1 className="text-3xl font-extrabold text-gray-800 mb-8 pb-2">
                    📊 Administration Dashboard
                </h1>

                {/* --- 2. Main Analytics Section (Charts) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                    
                    {/* User Interaction Chart (2/3 width) */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                            <TrendingUp className="w-6 h-6 text-indigo-500 mr-2"/> User Interaction Analysis
                        </h2>
                        <div className="h-80 w-full">
                            <UserDataChart />
                        </div>
                    </div>
                    
                    {/* Management Cards Stack (1/3 width) */}
                    <div className="lg:col-span-1 space-y-4">
                        <ManagementCard 
                            title="User Management"
                            description="View, create, edit, and delete customer and admin profiles. Manage access."
                            linkTo="/admin/users"
                            icon={Users}
                            colorClass="border-indigo-600"
                        />
                        <ManagementCard 
                            title="Product Catalog"
                            description="Manage inventory, create new items, update stock, and modify pricing."
                            linkTo="/admin/products"
                            icon={Package}
                            colorClass="border-teal-600"
                        />
                         <ManagementCard 
                            title="View All Orders"
                            description="Monitor all pending, processed, and shipped customer orders."
                            linkTo="/admin/All-Orders"
                            icon={Package}
                            colorClass="border-yellow-600"
                        />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-full mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                        <BarChart className="w-6 h-6 text-blue-500 mr-2"/> Category Sales Performance
                    </h2>
                    <div className="h-96 w-full">
                        <ProductSalesData />
                    </div>
                </div>

            </div>
        </>
    );
};

export default AdminDashboardPage;