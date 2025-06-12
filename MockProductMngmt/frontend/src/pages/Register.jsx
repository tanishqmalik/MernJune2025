import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/auth/register', {
                name,
                email,
                password
            });
            console.log('Registered:', res.data);
            
            // Store the token in localStorage
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                // Redirect based on user role
                if (res.data.user.isAdmin) {
                    navigate('/admin/products');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (err) {
            console.error('Registration failed:', err.response?.data || err.message);
            alert(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className='p-4 max-w-sm mx-auto'>
            <h2 className='text-xl font-bold mb-4'>Register</h2>
            <form onSubmit={handleRegister}>
                <input 
                    className='border w-full my-2 p-2 rounded' 
                    placeholder="Name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required
                />
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
                    className='bg-green-500 text-white p-2 w-full rounded hover:bg-green-600' 
                    type="submit"
                >
                    Register
                </button>
            </form>
            <p className="mt-4 text-center">
                Already have an account?{' '}
                <a href="/login" className="text-blue-500 hover:underline">
                    Login here
                </a>
            </p>
        </div>
    );
}

export default Register;