import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcom } from '../Context/EcomProvider';
import ProductForm from '../Components/ProductForm';
import toast from 'react-hot-toast';
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
        try {
           toast.error("This feature is available only to admin"); 
        } catch (err) {
            console.error(err);
            setError(err.message || 'Creation failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
        <div className="bg-white mt-30 p-4 sm:p-6 rounded-xl shadow-lg mb-8 max-w-2xl mx-auto">
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
        </>
    );
};

export default ProductCreatePage;