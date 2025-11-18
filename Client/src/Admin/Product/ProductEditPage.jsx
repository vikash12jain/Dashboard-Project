import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEcom } from '../../Context/EcomProvider';
import ProductForm from '../../Components/ProductForm';

const ProductEditPage = () => {
    const { id } = useParams(); // Get product ID from the URL
    const navigate = useNavigate();
    const { apiFetch } = useEcom();
    
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const [formState, setFormState] = useState({
        name: '', sku: '', brand: '', category: '', price: '', quantity: '', 
        color: '', description: '', image: '',
    });

    // API ENDPOINT: GET /products/:id
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const product = await apiFetch(`/products/${id}`, { method: 'GET' });
                
                // Pre-populate form state with fetched data
                setFormState({
                    name: product.name || '',
                    sku: product.sku || '',
                    brand: product.brand || '',
                    category: product.category || '',
                    price: product.price != null ? String(product.price) : '',
                    quantity: product.quantity != null ? String(product.quantity) : '',
                    color: product.color || '',
                    description: product.description || '',
                    image: product.image || '',
                });
            } catch (err) {
                console.error(err);
                setError(err.message || 'Failed to load product for editing.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, apiFetch]);

    const handleFormChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    // API ENDPOINT: PUT /products/:id
    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        setError('');

        const payload = {
            name: formState.name.trim(),
            sku: formState.sku.trim(),
            brand: formState.brand.trim(),
            category: formState.category.trim(),
            price: parseFloat(formState.price) || 0,
            quantity: parseInt(formState.quantity || '0', 10),
            color: formState.color.trim(),
            description: formState.description.trim(),
            image: formState.image.trim(),
        };

        try {
            await apiFetch(`/products/${id}`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            }, { requestKey: `admin.update-${id}` });
            
            setMessage('Product updated successfully!');
            // Redirect to the list page after successful update
            setTimeout(() => navigate('/admin/products'), 1500);

        } catch (err) {
            console.error(err);
            setError(err.message || 'Update failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <p className="text-center mt-8">Loading product details...</p>;
    if (error && !loading) return <p className="text-center mt-8 text-red-500">Error: {error}</p>;

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Edit Product ID: {id}</h3>
            <ProductForm
                formState={formState}
                handleFormChange={handleFormChange}
                handleSubmit={handleUpdate}
                isSubmitting={isSubmitting}
                error={error}
                message={message}
                isEditMode={true}
            />
        </div>
    );
};

export default ProductEditPage;