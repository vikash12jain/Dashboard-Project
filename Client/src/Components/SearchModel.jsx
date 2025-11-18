import {useState,useEffect} from 'react'

const SearchModal = ({ products, onClose, onOpen }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => { document.body.style.overflow = 'hidden'; const onKey = (e) => { if (e.key === 'Escape') onClose(); }; window.addEventListener('keydown', onKey); return () => { document.body.style.overflow = 'auto'; window.removeEventListener('keydown', onKey); }; }, []);



    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-y-auto" onClick={onClose} onScroll={(e) => e.stopPropagation()}>

            <div className="bg-white rounded-xl w-full max-w-lg mx-4 sm:mx-auto p-6 shadow-lg relative" onClick={(e) => e.stopPropagation()}>


                <div className="p-4 border-b flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                        className="w-full p-3 border border-gray-300 rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-stone-800"
                    />

                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                    >
                        ✖
                    </button>

                </div>
                <div className="max-h-80 overflow-y-auto">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <div
                                key={product._id}
                                onClick={() => {
                                    onClose();
                                    onOpen(product._id);
                                }}
                                className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
                            >

                                <img
                                    src={product.image || `https://placehold.co/600x600/a855f7/ffffff?text=${encodeURIComponent(product.name)}`}
                                    alt={product.name}
                                    className="w-12 h-12 object-cover rounded-md border"
                                />
                                <span className="text-gray-800">{product.name}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No products found.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default SearchModal