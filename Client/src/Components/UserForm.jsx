import React from 'react';

const UserForm = ({ formState, handleFormChange, handleSubmit, isSubmitting, error, message, isEditMode }) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={formState.firstname}
                    onChange={handleFormChange}
                    required
                />
                <input
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formState.lastname}
                    onChange={handleFormChange}
                    required
                />
            </div>

            <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                type="email"
                name="email"
                placeholder="Email Address"
                value={formState.email}
                onChange={handleFormChange}
                required
            />
            
            {/* Password field only shown for Creation mode */}
            {!isEditMode && (
                <input
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formState.password}
                    onChange={handleFormChange}
                    required
                />
            )}
            
            <div className="flex items-center space-x-3 pt-2">
                <input
                    type="checkbox"
                    id="isAdmin"
                    name="isAdmin"
                    checked={formState.isAdmin}
                    // Handle checkbox change specifically
                    onChange={(e) => handleFormChange({ target: { name: 'isAdmin', value: e.target.checked } })}
                    className="h-4 w-4 text-stone-600 border-gray-300 rounded"
                />
                <label htmlFor="isAdmin" className="text-gray-700">Set as Admin</label>
            </div>

            {message && <p className={`text-sm text-center ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
            {error && <p className="text-sm text-center text-red-500">{error}</p>}

            <div className="flex justify-start">
                <button
                    type="submit"
                    className="bg-stone-800 text-amber-100 font-bold py-2 px-4 rounded-full hover:bg-stone-700 transition-colors disabled:opacity-50"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : isEditMode ? 'Update User' : 'Create User'}
                </button>
            </div>
        </form>
    );
};

export default UserForm;