import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useEcom } from '../Context/EcomProvider'; 

const AdminRoute = () => {
    const { user,isInitialLoading } = useEcom(); 
    
    const isLoggedIn = !!user;
    const isAdmin = user?.isAdmin === true;

    if (isInitialLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-600">Checking administrator access...</p>
            </div>
        );
    }

    if (!isLoggedIn || !isAdmin) {
        return <Navigate to="/403" replace />; 
    }
    return <Outlet />;
};

export default AdminRoute;