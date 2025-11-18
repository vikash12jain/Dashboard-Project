import React from 'react'
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcom } from '../Context/EcomProvider';

const RegisterPage = () => {
    const { setAuthError, setUser, apiFetch, setAuthToken, isBusy,authError } = useEcom();
    const [fullName, setFullName] = useState({ firstname: "", lastname: "" });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setAuthError("");

        try {
            const data = await apiFetch('/users/register', {
                method: 'POST',
                body: JSON.stringify({
                    fullname: {
                        firstname: fullName.firstname,
                        lastname: fullName.lastname
                    }, email, password
                })
            }, { requestKey: 'register' });
            if (!data.token) { throw new Error('Server did not return a token'); }

            localStorage.setItem("authToken", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setUser(data.user);
            setAuthToken(data.token);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data) {
               
                setAuthError(error.response.data.message);
                console.log("remove : error.response.data.message");
                console.error("Registration failed:", error.response.data.message);
            } else {
              
                setAuthError(error.message);
                console.log("remove 444: error.message");
                console.error("Registration failed:", error.message);
            }
        }
    };

    return (
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">


            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                {authError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Registration Failed!</strong>
                        <span className="block sm:inline ml-2">{authError}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="firstname"
                        >
                            First Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                            id="firstname"
                            type="text"
                            placeholder="First Name"
                            value={fullName.firstname}
                            onChange={(e) =>
                                setFullName({ ...fullName, firstname: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="lastname"
                        >
                            Last Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                            id="lastname"
                            type="text"
                            placeholder="Last Name"
                            value={fullName.lastname}
                            onChange={(e) =>
                                setFullName({ ...fullName, lastname: e.target.value })
                            }
                            required
                        />
                    </div>
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
                            disabled={isBusy && isBusy('register')}
                        >
                            {isBusy && isBusy('register') ? 'Creating an Account...' : 'Register'}
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            type="button"
                            className="font-bold text-sm text-stone-800 hover:text-stone-600"
                        >
                            Already have an account?
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default RegisterPage
