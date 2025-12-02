import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEcom } from '../Context/EcomProvider';
import UserForm from '../Components/UserForm';
import toast from 'react-hot-toast';


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
                const user =
                {
                    id: "6wge45iuop1",
                    fullname: { firstname: "Vikas", lastname: "Jain" },
                    email: "vikas12jain@gmail.com",
                    isAdmin: true
                }


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
            toast.error("This feature is available only to admin");

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
            <div className="bg-white p-4 mt-50 sm:p-6 rounded-xl shadow-lg mb-8 max-w-2xl mx-auto">
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