import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcom } from '../../Context/EcomProvider';
import ProductForm from '../../Components/ProductForm';

const ProductCreatePage = () => {
    const navigate = useNavigate();
    const { apiFetch } = useEcom();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const [formState, setFormState] = useState({
        name: '', sku: '', brand: '', category: '', price: '', quantity: '', 
        color: '', description: '', image: '',
    });

    const handleFormChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        setError('');

        const payload = {
            name: formState.name.trim(),
            sku: formState.sku.trim() || `SKU-${Date.now()}`,
            brand: formState.brand.trim(),
            category: formState.category.trim(),
            price: parseFloat(formState.price) || 0,
            quantity: parseInt(formState.quantity || '0', 10),
            color: formState.color.trim(),
            description: formState.description.trim(),
            image: formState.image.trim(),
        };

        try {
            await apiFetch('/products', {
                method: 'POST',
                body: JSON.stringify(payload)
            }, { requestKey: 'admin.create' });
            
            setMessage('Product created successfully!');
            setTimeout(() => navigate('/admin/products'), 1500); 

        } catch (err) {
            console.error(err);
            setError(err.message || 'Creation failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Create New Product</h3>
            <ProductForm
                formState={formState}
                handleFormChange={handleFormChange}
                handleSubmit={handleCreate}
                isSubmitting={isSubmitting}
                error={error}
                message={message}
                isEditMode={false}
            />
        </div>
    );
};

export default ProductCreatePage;