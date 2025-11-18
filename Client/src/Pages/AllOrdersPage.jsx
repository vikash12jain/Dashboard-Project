import React from 'react';
import Header from '../Components/Header';
import { Clock, Info } from 'lucide-react';

const AllOrdersPage = ({ featureTitle, featureDescription, comingSoonVersion }) => {
    return (
        <>
            <Header />
            <div className="p-8 mt-15 bg-gray-50 min-h-screen flex flex-col items-center justify-start pt-20">
                
                <div className="max-w-xl w-full text-center bg-white p-12 rounded-lg shadow-xl border-t-2 border-gray-200">
                    
                    <div className="flex flex-col items-center mb-8">
                        <Clock className="w-16 h-16 text-amber-500 mb-4 animate-pulse" />
                        <h1 className="text-4xl font-extrabold text-gray-800">
                            {featureTitle}
                        </h1>
                    </div>
                    
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                        {featureDescription}
                    </p>

                    <div className="inline-flex items-center bg-indigo-100 text-indigo-800 text-sm font-semibold px-4 py-2 rounded-full mb-8 shadow-sm">
                        <Info className="w-4 h-4 mr-2" />
                        Planned to release it soon... ☺️
                    </div>
                    
                    <p className="text-sm text-gray-500 border-t border-gray-100 pt-6 mt-4">
                        We are actively developing this feature to enhance your administrative experience. Thank you for your patience.
                    </p>
                </div>

            </div>
        </>
    );
};

export default AllOrdersPage;