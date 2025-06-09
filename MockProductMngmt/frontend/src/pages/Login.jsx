import axios from 'axios';
import React from 'react'
import { useState } from 'react'

const Login = () => {
    const [username, Setusername] = useState('');
    const [password, Setpassword] = useState('');


    const handleLogin = async() =>{
        const res = await axios.post('http://localhost:5000/api/auth/login', {username, password})
        localStorage.setItem('token', res.data.token);
        window.location.href = '/dashboard';
    }
  return (
    <div className='p-4 max-w-sm mx-auto'>
        <h2 className='text-xl font-bold'>Login</h2>
        <input className='border w-full my-2 p-2' placeholder='Username' value={username} onChange={e => Setusername(e.target.value)}/>
        <input className="border w-full my-2 p-2" placeholder="Password" type="password" value={password} onChange={e => Setpassword(e.target.value)} />
        <button className="bg-blue-500 text-white p-2 w-full" onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login