import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchProducts();
    }, [token, navigate]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5050/api/products', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(res.data);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // Update existing product
                await axios.put(
                    `http://localhost:5050/api/products/${editingId}`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                // Create new product
                await axios.post(
                    'http://localhost:5050/api/products',
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            setFormData({ name: '', price: '', description: '' });
            setEditingId(null);
            fetchProducts();
        } catch (err) {
            console.error('Error saving product:', err);
            setError('Failed to save product');
        }
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            price: product.price,
            description: product.description || ''
        });
        setEditingId(product._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }
        try {
            await axios.delete(`http://localhost:5050/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchProducts();
        } catch (err) {
            console.error('Error deleting product:', err);
            setError('Failed to delete product');
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Product Management</h2>
            
            {/* Product Form */}
            <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded">
                <h3 className="text-xl font-semibold mb-4">
                    {editingId ? 'Edit Product' : 'Add New Product'}
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block mb-1">Name:</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Price:</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Description:</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="border p-2 w-full rounded"
                            rows="3"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {editingId ? 'Update Product' : 'Add Product'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({ name: '', price: '', description: '' });
                                setEditingId(null);
                            }}
                            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            {/* Error Message */}
            {error && (
                <div className="text-red-500 mb-4">{error}</div>
            )}

            {/* Products List */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Products List</h3>
                {products.map(product => (
                    <div key={product._id} className="border p-4 rounded flex justify-between items-center">
                        <div>
                            <h4 className="font-semibold">{product.name}</h4>
                            <p className="text-gray-600">${product.price}</p>
                            {product.description && (
                                <p className="text-sm text-gray-500">{product.description}</p>
                            )}
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEdit(product)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(product._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductManagement; 