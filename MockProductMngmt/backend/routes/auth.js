const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res)=>{
    const {username, password, role} = req.body;
    const hashed = await bcrypt.hash(password, 10);

    try{
        const user = await User.create({
            username,
            password : hashed,
            role
        })
        res.json(user)
    }
    catch(err){
        res.status(400).json({
            error:'User already exist'
        })
    }
})

// router.post('/register', async (req, res) => {
//   const { username, password, role } = req.body;
//   try {
//     const hashed = await bcrypt.hash(password, 10);
//     const user = await User.create({ username, password: hashed, role });
//     res.json(user);
//   } catch (err) {
//     console.error('Register Error:', err); // log to console
//     res.status(400).json({ error: 'User already exists or invalid data' });
//   }
// });

// router.post('/register', async (req, res) => {
//   console.log('[DEBUG] Register request body:', req.body);

//   const { username, password, role } = req.body;

//   try {
//     const hashed = await bcrypt.hash(password, 10);
//     const user = await User.create({ username, password: hashed, role });

//     console.log('[DEBUG] User created:', user);
//     res.json(user);
//   } catch (err) {
//     console.error('[ERROR] Registration failed:', err);

//     // Send actual error for now while debugging
//     res.status(400).json({ error: err.message || 'User already exists' });
//   }
// });


// router.post('/register', async (req, res) => {
//   console.log("🔵 /register hit with:", req.body); // ADD THIS
//   const { username, password, role } = req.body;
//   const hashed = await bcrypt.hash(password, 10);
//   try {
//     const user = await User.create({ username, password: hashed, role });
//     console.log("✅ User created:", user); // ADD THIS
//     res.json(user);
//   } catch (err) {
//     console.error("❌ Registration Error:", err); // ADD THIS
//     res.status(400).json({ error: 'User already exists or invalid input' });
//   }
// });







router.post('/login',async (req,res) =>{
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(400).json({error:'Invalid credentials'});
    }
    const token = jwt.sign({id: user._id, role: user.role}, 'secret');
    res.json({token});
});

router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});


module.exports = router;