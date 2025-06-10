import React, { useState } from 'react';
import axios from 'axios';

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

function Register() {
    const [username, Setusername] = useState('');
    const [password, Setpassword] = useState('');
    const [role, Setrole] = useState('user');

    // const handleRegister = async() =>{
    //     await axios.post('http//localhost:5000/api/auth/register', {username, password, role})
    //     window.location.href = '/';
    // };

    const handleRegister = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
          username,
          password,
          role
        });
        console.log('Registered:', res.data);
        window.location.href = '/';
      } catch (err) {
        console.error('❌ Registration failed:', err.response?.data || err.message);
      }
    };
    




    return (
        <div className='p-4 max-w-sm mx-auto'>
            <h2 className='text-xl font-bold'>Register</h2>
            <input className='border w-full my-2 p-2' placeholder="Username" value={username} onChange={e => Setusername(e.target.value)} />
            <input className='border w-full my-2 p-2' placeholder="Password" type="password" value={password} onChange={e => Setpassword(e.target.value)} />
            <select className='border w-full my-2 p-2' value={role} onChange={e => Setrole(e.target.value)} >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <button className='bg-green-500 text-white p-2 w-full' onClick={handleRegister}>Register</button>
        </div>
    )
}
export default Register;