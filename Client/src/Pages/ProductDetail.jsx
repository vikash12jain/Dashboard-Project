import {useEffect,useState} from 'react'
import { useEcom } from '../Context/EcomProvider';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const ProductDetail = () => {
    const {currentProductId, addToCart, handleAddToCart, user, apiFetch, isBusy } = useEcom()
    var id = currentProductId;
    
    if(currentProductId) localStorage.setItem('ProductId', currentProductId);
    else id = localStorage.getItem('ProductId');
   
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            setError("No product id provided");
            setLoading(false);
            return;
        }
        let cancelled = false;
        (async () => {
            setLoading(true);
            setError("");
            try {
                const data = await apiFetch(`/products/${id}`, { method: 'GET' }, { requestKey: `fetchProduct-${id}` });
                const p = data && (data._id ? data : data.product || data);
                if (!cancelled) setProduct(p);
            } catch (err) {
                console.error("Product fetch error", err);
                if (!cancelled) setError(err.message || "Failed to load product");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, [id]);

    if (loading) return <div className="p-8">Loading product...</div>;
    if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
    if (!product) return <div className="p-8">No product found.</div>;

    const available = Number(product.quantity ?? 0);
    const inStock = available > 0;
    const addKey = `addToCart-${product._id}`;
    const adding = !!(isBusy && isBusy(addKey));

    return (
        <>
        <Header/>
        <main className="flex-grow container mt-15 mx-auto p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="lg:col-span-1">
                    <div className="w-full h-64 sm:h-96 overflow-hidden rounded-lg">
                        <img
                            src={
                                product.image ||
                                `https://placehold.co/600x600/a855f7/ffffff?text=${encodeURIComponent(
                                    product.name || "Product"
                                )}`
                            }
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <p className="text-sm text-gray-500">
                            {product.category} • {product.brand}
                        </p>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">{product.name}</h1>
                        <p className="text-xl sm:text-2xl font-extrabold text-stone-800 mt-4">₹{Number(product.price || 0).toFixed(2)}</p>
                        <p className={`mt-2 font-medium ${inStock ? "text-green-600" : "text-red-500"}`}>
                            {inStock ? `In stock — ${available} available` : "Out of stock"}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                        <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                        <button
                            className="bg-stone-800 text-amber-100 font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full hover:bg-stone-700 transition-colors disabled:opacity-50 w-full sm:w-auto text-sm sm:text-base"
                            disabled={!inStock || adding}
                            onClick={async() => await handleAddToCart(product)}
                        >
                            {adding ? 'Adding…' : 'Add to Cart'}
                        </button>

                        <button
                            onClick={() => {
                                addToCart(product);
                                { user ? navigate("/checkout") : navigate('/login') }
                            }}
                            disabled={!inStock}
                            aria-disabled={!inStock}
                            title={!inStock ? 'Available soon' : 'Buy now'}
                            className={`py-2 bg-yellow-300 px-5 border rounded-full w-full sm:w-1/6 transition-colors focus:outline-none ${!inStock
                                ? 'opacity-50 cursor-not-allowed border-gray-300 text-gray-500'
                                : 'hover:bg-gray-100'
                                }`}
                        >
                            {!inStock ? 'Available soon' : 'Buy Now'}
                        </button>
                    </div>

                </div>
            </div>
           
        </main>
        <Footer/>
        </>
    );
}

export default ProductDetail