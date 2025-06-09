const express = require('express');
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
const router = express.Router();

function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) return res.sendStatus(401);

    jwt.verify(token, 'secret', (err,user) =>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}


//this function is for admin only
function authorizeAdmin(req, res, next){
    if(req.user.role !== 'admin') return res.sendStatus(403);
    next();
}

router.get('/', authenticate, async(req, res)=>{
    const products = await Product.find();
    res.json(products);
})

router.post('/', authenticate, authorizeAdmin, async(req, res)=>{
    const product = await Product.create(req.body)
    res.json(product);
})

router.put('/', authenticate, authorizeAdmin, async(req,res)=>{
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.json(product)
})

router.delete('/:id', authenticate, authorizeAdmin, async(req,res)=>{
    await Product.findByIdAndDelete(req.params.id)
    res.sendStatus(204);
});

module.exports = router;