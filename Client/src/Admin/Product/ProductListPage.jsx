import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEcom } from '../../Context/EcomProvider';

const ProductListPage = () => {
    const { products: propProducts, setProducts: setPropProducts, apiFetch } = useEcom();
    const [localProducts, setLocalProducts] = useState(propProducts || []);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await apiFetch('/products', { method: 'GET' }, { requestKey: 'admin.fetchProducts' });
            setLocalProducts(data);
            if (setPropProducts) setPropProducts(data);
            setMessage('');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Unable to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        setIsSubmitting(true);
        setError('');
        setMessage('');
        try {
            await apiFetch(`/products/${productId}`, { method: 'DELETE' }, { requestKey: `admin.delete-${productId}` });
            setMessage('Product deleted successfully!');
            await fetchProducts();
        } catch (err) {
            console.error(err);
            setError(err.message || 'Delete failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">All Products</h3>
            
            <Link 
                to="/admin/products/create" 
                className="bg-stone-800 text-amber-100 font-bold py-2 px-4 rounded-full hover:bg-stone-700 transition-colors mb-4 inline-block"
            >
                + Create New Product
            </Link>

            {message && <p className="text-sm text-green-500 mb-4">{message}</p>}
            {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {localProducts.map((product) => (
                                <tr key={product._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{product._id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">₹{Number(product.price || 0).toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.quantity ?? '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <Link to={`/admin/products/${product._id}/edit`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                        <button 
                                            onClick={() => handleDelete(product._id)} 
                                            className="text-red-600 hover:text-red-900"
                                            disabled={isSubmitting}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductListPage;