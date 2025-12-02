import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router-dom';

const RecruiterLayout = () => {
    return (
        <>
            <Header/>
            <main className="flex-grow mt-15 container mx-auto p-4 sm:p-6 lg:p-8">
                <h2 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h2>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
};

export default RecruiterLayout;