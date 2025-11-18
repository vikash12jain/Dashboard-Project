import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcom } from '../Context/EcomProvider';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const { setAuthError,authError, setUser, setAuthToken, apiFetch, isBusy } = useEcom();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setAuthError("");

        try {
            const data = await apiFetch('/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            }, { requestKey: 'login' });

            if (!data.token) throw new Error('Server did not return a token');

            localStorage.setItem("authToken", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setUser(data.user);
            setAuthToken(data.token);
            navigate('/');
        } catch (error) {
            console.error("Login failed:", error);
            setAuthError(error.message);
        }

    };

    return (
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                {authError && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <strong className="font-bold">Login Failed!</strong>
        <span className="block sm:inline ml-2">{authError}</span>
    </div>
)}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-stone-800 hover:bg-stone-700 text-amber-100 font-bold py-2 px-4 rounded-full"
                            type="submit"
                            disabled={isBusy && isBusy('login')}
                        >
                            {isBusy && isBusy('login') ? 'Signing in…' : 'Sign In'}
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            type="button"
                            className="font-bold text-sm text-stone-800 hover:text-stone-600"
                        >
                            Create an account
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default LoginPage
