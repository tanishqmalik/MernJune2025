import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        if (!token) {
            navigate('/login');
            return;
        }

        // Fetch products
        axios.get('http://localhost:5050/api/products', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            console.log('Products loaded:', res.data);
            setProducts(res.data);
        })
        .catch(err => {
            console.error('Error loading products:', err);
            setError('Failed to load products');
            if (err.response?.status === 401) {
                // Token expired or invalid
                localStorage.removeItem('token');
                navigate('/login');
            }
        });
    }, [token, navigate]);

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    return (
        <div>
            <div className="p-4 max-w-2xl mx-auto">
                <h2 className="text-xl font-bold mb-4">Products</h2>
                {products.length === 0 ? (
                    <p>No products found</p>
                ) : (
                    <ul>
                        {products.map(p => (
                            <li key={p._id} className="border p-2 mb-2 rounded">
                                {p.name} - ${p.price}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Dashboard;