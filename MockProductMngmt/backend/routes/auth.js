const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    console.log('🔵 Register request received:', req.body);
    
    try {
        const { username, password, role } = req.body;
        
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        
        // Hash password
        const hashed = await bcrypt.hash(password, 10);
        
        // Create user
        const user = await User.create({
            username,
            password: hashed,
            role: role || 'user'
        });
        
        console.log('✅ User created successfully:', { username: user.username, role: user.role });
        res.status(201).json({ message: 'User created successfully', user: { username: user.username, role: user.role } });
        
    } catch (err) {
        console.error('❌ Registration error:', err);
        res.status(500).json({ error: 'Registration failed: ' + err.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, 'secret');
    res.json({ token });
});

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

module.exports = router;