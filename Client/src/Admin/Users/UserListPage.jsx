import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEcom } from '../../Context/EcomProvider';
import Header from '../../Components/Header';

const UserListPage = () => {
    const { apiFetch } = useEcom();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 

    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await apiFetch('/users', { method: 'GET' }, { requestKey: 'admin.fetchUsers' });
            setUsers(data);
            setMessage(''); 
        } catch (err) {
            console.error(err);
            setError(err.message || 'Unable to fetch users. Ensure you are logged in as admin.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user? This cannot be undone.')) return;
        setIsSubmitting(true);
        setError('');
        setMessage('');
        try {
            await apiFetch(`/users/${userId}`, { method: 'DELETE' }, { requestKey: `admin.delete-user-${userId}` });
            setMessage('User deleted successfully!');
            await fetchUsers();
        } catch (err) {
            console.error(err);
            setError(err.message || 'Delete failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
        <Header/>
        <div className="bg-white mt-4 p-4 sm:p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">All Users</h3>
            
            <Link 
                to="/admin/users/create" 
                className="bg-stone-800 text-amber-100 font-bold py-2 px-4 rounded-full hover:bg-stone-700 transition-colors mb-4 inline-block"
            >
                + Create New User
            </Link>

            {message && <p className="text-sm text-green-500 mb-4">{message}</p>}
            {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user._id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.fullname?.firstname} {user.fullname?.lastname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isAdmin ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'}`}>
                                            {user.isAdmin ? 'Admin' : 'Customer'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <Link to={`/admin/users/${user._id}/edit`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                        <button 
                                            onClick={() => handleDelete(user._id)} 
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
        </div></>
    );
};

export default UserListPage;