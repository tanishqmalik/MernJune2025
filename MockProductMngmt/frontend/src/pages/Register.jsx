import React , {useState} from 'react';
import axios from 'axios';

function Register(){
    const [username, Setusername] = useState('');
    const [password, Setpassword] = useState('');
    const [role, Setrole] = useState('user');

    const handleRegister = async() =>{
        await axios.post('http//localhost:5000/api/auth/register', {username, password, role})
        window.location.href = '/';
    };

    return (
        <div className='p-4 max-w-sm mx-auto'>
            <h2 className='text-xl font-bold'>Register</h2>
        </div>
    )
}
export default Register;