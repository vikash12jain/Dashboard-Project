import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, ArrowRight, TrendingUp, BarChart } from 'lucide-react'; 
import UserDataChart from '../Components/UserDataChart';
import ProductSalesData from '../Components/ProductSalesData';

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


const RecruiterDashboardPage = () => {
    
    return (
        <>
            <div className="p-4 sm:p-6 lg:p-8 mt-15 bg-gray-50 min-h-screen">
                
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 sm:mb-8 pb-2">
                    📊 Administration Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    
                    <div className="md:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                            <TrendingUp className="w-6 h-6 text-indigo-500 mr-2"/> User Interaction Analysis
                        </h2>
                        <div className="h-64 md:h-80 w-full min-h-64">
                            <UserDataChart />
                        </div>
                    </div>
                    
                    <div className="md:col-span-1 space-y-4 order-3 md:order-none">
                        <ManagementCard 
                            title="User Management"
                            description="View, create, edit, and delete customer and admin profiles. Manage access."
                            linkTo="/Recruiter/users"
                            icon={Users}
                            colorClass="border-indigo-600"
                        />
                        <ManagementCard 
                            title="Product Catalog"
                            description="Manage inventory, create new items, update stock, and modify pricing."
                            linkTo="/Recruiter/products"
                            icon={Package}
                            colorClass="border-teal-600"
                        />
                         <ManagementCard 
                            title="View All Orders"
                            description="Monitor all pending, processed, and shipped customer orders."
                            linkTo="/Recruiter/All-Orders"
                            icon={Package}
                            colorClass="border-yellow-600"
                        />
                    </div>
                    
                    <div className="md:col-span-3 bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                            <BarChart className="w-6 h-6 text-blue-500 mr-2"/> Category Sales Performance
                        </h2>
                        <div className="h-64 md:h-96 w-full min-h-64">
                            <ProductSalesData />
                        </div>
                    </div>

                </div> 
                
            </div>
        </>
    );
};

export default RecruiterDashboardPage;