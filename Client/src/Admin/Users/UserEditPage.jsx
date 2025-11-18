import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEcom } from '../../Context/EcomProvider';
import UserForm from '../../Components/UserForm';
import Header from '../../Components/Header';


const UserEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { apiFetch } = useEcom();
    
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const [formState, setFormState] = useState({
        firstname: '', 
        lastname: '', 
        email: '', 
        isAdmin: false,
    });

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const user = await apiFetch(`/users/${id}`, { method: 'GET' });
                
                setFormState({
                    firstname: user.fullname?.firstname || '',
                    lastname: user.fullname?.lastname || '',
                    email: user.email || '',
                    isAdmin: user.isAdmin ?? false,
                });
            } catch (err) {
                console.error(err);
                setError(err.message || 'Failed to load user for editing.');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id, apiFetch]);

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormState({ 
            ...formState, 
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        setError('');

        const payload = {
            firstname: formState.firstname.trim(), 
            lastname: formState.lastname.trim(),
            email: formState.email.trim(),
            isAdmin: formState.isAdmin,
        };

        try {
            await apiFetch(`/users/${id}`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            }, { requestKey: `admin.updateUser-${id}` });
            
            setMessage('User updated successfully! Redirecting to list...');
            setTimeout(() => navigate('/admin/users'), 1500);

        } catch (err) {
            console.error(err);
            setError(err.message || 'Update failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <p className="text-center mt-8">Loading user details...</p>;
    if (error && !loading) return <p className="text-center mt-8 text-red-500">Error: {error}</p>;

    return (
        <>
        <Header/>
        <div className="bg-white p-4 mt-4 sm:p-6 rounded-xl shadow-lg mb-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Edit User ID: {id}</h3>
            <UserForm
                formState={formState}
                handleFormChange={handleFormChange}
                handleSubmit={handleUpdate}
                isSubmitting={isSubmitting}
                error={error}
                message={message}
                isEditMode={true}
            />
        </div> </>
    );
};

export default UserEditPage;