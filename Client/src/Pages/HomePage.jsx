import React from 'react'
import { useState } from 'react';
import { useLoading } from '../Context/LoadingProvider'
import { useEcom } from '../Context/EcomProvider';
import ProductCard from '../Components/ProductCard';
import SearchModal from '../Components/SearchModel';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const HomePage = () => {
    const { products, handleAddToCart, onOpen, isBusy, setIsSearchModalOpen, isSearchModalOpen, addToCart, cart, user, mobileMenuOpen, setMobileMenuOpen, authError, setCurrentProductId } = useEcom();

    const { isLoading } = useLoading();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('none');
    const navigate = useNavigate();
    // Ensure 'All' is the first category option
    const allCategories = ['All', ...new Set(products.map(product => product.category))];

    const filteredAndSortedProducts = products
        .filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortOrder === 'lowToHigh') {
                return a.price - b.price;
            }
            if (sortOrder === 'highToLow') {
                return b.price - a.price;
            }
            return 0;
        });

    return (
        // Use a light gray background for a professional canvas
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            
            <Header/>
            {/* Added more padding to clear the fixed professional header */}
            <div className='pt-24 flex-1'>
                
                {/* Auth Error Banner */}
                {authError && (
                    <div className="container mx-auto px-4 mt-4">
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
                            <p className="font-semibold">Authentication Error</p>
                            <span className="block">{authError}</span>
                        </div>
                    </div>
                )}

                <main id="Product-section" className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10">

                    {/* Hero Section: Professional and direct */}
                    <div className="text-center my-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                            Discover Quality Products
                        </h1>
                        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                            Explore our curated collection of goods, designed for excellence and durability.
                        </p>
                    </div>

                    {/* Filter and Sort Controls: Structured and clean design */}
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 p-4 bg-white border border-gray-200 rounded-xl shadow-lg mb-12">
                        
                        {/* Search Button */}
                        <button
                            onClick={() => setIsSearchModalOpen(true)}
                            className="w-full md:w-56 text-gray-700 border border-gray-300 rounded-lg px-4 py-2.5 flex items-center justify-start gap-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm"
                            aria-label="Open product search"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span className="text-sm font-medium">Quick Search...</span>
                        </button>

                        <div className='flex gap-3 w-full md:w-auto'>
                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-1/2 md:w-40 p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none bg-white shadow-sm"
                            >
                                <option value="All" disabled>Filter by Category</option>
                                {allCategories.map(category => (
                                    <option key={category} value={category === 'All' ? 'All' : category}>{category}</option>
                                ))}
                            </select>
                            {/* Sort Filter */}
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="w-1/2 md:w-40 p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none bg-white shadow-sm"
                            >
                                <option value="none" disabled>Sort by Price</option>
                                <option value="lowToHigh">Price: Low to High</option>
                                <option value="highToLow">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Grid Section */}
                    <section className="mt-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-10 pb-2 border-b-2 border-blue-500/10">
                            Current Inventory
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {isLoading ? (
                                <p className="text-center col-span-full text-gray-500 py-10">Loading catalog data...</p>
                            ) : filteredAndSortedProducts.length > 0 ? (
                                filteredAndSortedProducts.map(product => 
                                    <ProductCard 
                                        key={product._id} 
                                        product={product} 
                                        addToCart={() => handleAddToCart(product)} 
                                        onOpen={() => { setCurrentProductId(product._id); navigate('/product-Detail'); }} 
                                        isBusy={isBusy} 
                                    />
                                )
                            ) : (
                                <p className="text-center col-span-full text-gray-500 py-10 text-lg">
                                    No products match your current filters. Try a different search or category.
                                </p>
                            )}
                        </div>
                    </section>

                </main>
                {isSearchModalOpen && <SearchModal products={products} onClose={() => setIsSearchModalOpen(false)} addToCart={addToCart} onOpen={(id) => { setCurrentProductId(id); navigate('/product-Detail'); setIsSearchModalOpen(false); }} />}
            </div>
            <Footer/>
            
        </div>
    );
};

export default HomePage