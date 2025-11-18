import React from 'react';

const categories = [
    "Smartphones & Accessories",
    "Laptops & Computers",
    "Audio (Headphones & Speakers)",
    "Televisions & Home Theater",
    "Gaming",
    "Wearable Technology",
    "Cameras & Photography",
    "Office & Connectivity"
];

const ProductForm = ({ formState, handleFormChange, handleSubmit, isSubmitting, error, message, isEditMode }) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                type="text"
                name="name"
                placeholder="Product Name"
                value={formState.name}
                onChange={handleFormChange}
                required
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    type="text"
                    name="sku"
                    placeholder="SKU (optional)"
                    value={formState.sku}
                    onChange={handleFormChange}
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formState.price}
                    onChange={handleFormChange}
                    step="0.01"
                    required
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formState.quantity}
                    onChange={handleFormChange}
                    required
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={formState.brand}
                    onChange={handleFormChange}
                    required
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                />

                <select
                    name="category"
                    value={formState.category}
                    onChange={handleFormChange}
                    className="border rounded px-3 py-2 w-full"
                    required
                >
                    <option value="">-- Product category --</option>
                    {categories.map((cat, i) => (
                        <option key={i} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="color"
                    placeholder="Color (optional)"
                    value={formState.color}
                    onChange={handleFormChange}
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                />
            </div>

            <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formState.image}
                onChange={handleFormChange}
                required
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
            />

            <textarea
                name="description"
                placeholder="Description"
                value={formState.description}
                onChange={handleFormChange}
                rows={4}
                required
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
            />

            {message && <p className={`text-sm text-center ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
            {error && <p className="text-sm text-center text-red-500">{error}</p>}

            <div className="flex justify-start">
                <button
                    type="submit"
                    className="bg-stone-800 text-amber-100 font-bold py-2 px-4 rounded-full hover:bg-stone-700 transition-colors disabled:opacity-50"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;