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
    }
    catch(err){
        res.status(400).json({
            error:'User already exist'
        })
    }
})

router.post('/login',async (req,res) =>{
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(400).json({error:'Invalid credentials'});
    }
    const token = jwt.sign({id: user._id, role: user.role}, 'secret');
    res.json({token});
});

module.exports = router;