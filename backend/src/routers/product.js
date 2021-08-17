const express = require('express');
const router = new express.Router();
const Product = require('../models/product');

router.get('/products', async (req, res) => {
    try{
        const result = await Product.find();
        res.status(200).send(result);
    }catch(e){
        res.status(404).send(e.message);
    }
})
router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const result = await Product.findById(id);
        res.status(200).send(result);
    }catch(e){
        res.status(404).send(e.message);
    }
})
module.exports = router;