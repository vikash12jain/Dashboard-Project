const ProductCard = ({ product, addToCart, onOpen, isBusy }) => {
    const key = `addToCart-${product._id}`;
    const busy = !!(isBusy && isBusy(key));
    const outOfStock = (product.quantity ?? 0) <= 0;
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div
                className="w-full h-40 sm:h-64 overflow-hidden cursor-pointer flex items-center"
                onClick={() => onOpen && onOpen(product._id)}
            >
                <img src={product.image || `https://placehold.co/600x600/a855f7/ffffff?text=${encodeURIComponent(product.name || "Product")}`} alt={product.name} className="w-full h-full object-contain sm:object-cover object-center" />

            </div>
            <div className="p-4">
                <p className="text-gray-500 text-sm mt-1">{product.category}</p>
                <h3 onClick={() => onOpen && onOpen(product._id)} className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mt-2 cursor-pointer">{product.name}</h3>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-sm sm:text-lg md:text-xl font-normal sm:font-bold text-gray-800">₹{product.price.toFixed(2)}</span>

                    <button
                        onClick={() => addToCart(product)}
                        disabled={outOfStock || busy}
                        className={`bg-stone-800 text-amber-100 font-medium py-1 px-2 sm:py-2 sm:px-4 text-sm sm:text-base rounded-full hover:bg-stone-700 transition-colors duration-300 shadow-md w-1/3 sm:w-auto ${outOfStock || busy ? 'opacity-50 cursor-not-allowed hover:bg-stone-800' : ''}`}


                    >
                        {outOfStock ? 'Out of stock' : (busy ? 'Adding…' : 'Add to Cart')}
                    </button>

                </div>
            </div>
        </div>
    );
}

export default ProductCard
