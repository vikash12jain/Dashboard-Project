import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcom } from '../Context/EcomProvider';
import UserForm from '../Components/UserForm';
import toast from 'react-hot-toast';

const UserCreatePage = () => {
    const navigate = useNavigate();
    const { apiFetch } = useEcom();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const [formState, setFormState] = useState({
        firstname: '', 
        lastname: '', 
        email: '', 
        password: '', 
        isAdmin: false,
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormState({ 
            ...formState, 
            [name]: value
        });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        setError('');

        const payload = {
            fullname: {
                firstname: formState.firstname.trim(),
                lastname: formState.lastname.trim(),
            },
            email: formState.email.trim(),
            password: formState.password, 
            isAdmin: formState.isAdmin,
        };

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
        <div className="bg-white p-4 mt-30 sm:p-6 rounded-xl shadow-lg mb-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Create New User</h3>
            <UserForm
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

export default UserCreatePage;