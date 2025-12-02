import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useEcom } from '../Context/EcomProvider'; 

const ProtectRecruiterRoute = () => {
    const { user,isInitialLoading } = useEcom(); 
    const isLoggedIn = !!user;
    const isRecruiter = user?.isRecruiter === true;
    

    if (isInitialLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-600">Checking Recruiter access...</p>
            </div>
        );
    }

    if (!isLoggedIn || !isRecruiter) {
        return <Navigate to="/recruiter-login" replace />; 
    }
    return <Outlet />;
};

export default ProtectRecruiterRoute;