import axios from 'axios';
import React, { useEffect, useState } from 'react'


const DashBoard = () => {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:5000/api/products', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setProducts(res.data));
    }, [token]);

    return (
        <div>
            <div className="p-4 max-w-2xl mx-auto">
                <h2 className="text-xl font-bold mb-4">Products</h2>
                <ul>
                    {products.map(p => (
                        <li key={p._id} className="border p-2 mb-2 rounded">{p.name} - ${p.price}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DashBoard;