import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/auth/login', {
                email,
                password
            });
            console.log('Login successful:', res.data);
            
            // Store the token in localStorage
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                // Redirect based on user role
                if (res.data.user.isAdmin) {
                    navigate('/admin/products');
                } else {
                    navigate('/dashboard');
                }
            } else {
                alert('No token received from server');
            }
        } catch (err) {
            console.error('Login failed:', err.response?.data || err.message);
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className='p-4 max-w-sm mx-auto'>
            <h2 className='text-xl font-bold mb-4'>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    className='border w-full my-2 p-2 rounded' 
                    placeholder="Email" 
                    type="email"
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required
                />
                <input 
                    className='border w-full my-2 p-2 rounded' 
                    placeholder="Password" 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required
                />
                <button 
                    className='bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600' 
                    type="submit"
                >
                    Login
                </button>
            </form>
            <p className="mt-4 text-center">
                Don't have an account?{' '}
                <a href="/register" className="text-blue-500 hover:underline">
                    Register here
                </a>
            </p>
        </div>
    );
}

export default Login;