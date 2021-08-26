const express = require('express');
const router = new express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');

router.get('/products', async (req, res) => {
    try{
        const result = await Product.find();
        res.status(200).send(result);
    }catch(e){
        res.status(404).send(e.message);
    }
})

router.post('/products', async (req, res) => {
    try {
        const cartItem = new Cart(req.body);
        const result = await cartItem.save();
        res.status(201).json(result);
      } catch (e) {
        res.status(400).send(e);
      }
})

router.patch('/products/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const cartItem = new Cart(req.body);
        const result = await Cart.findOneAndUpdate({ productId: id }, req.body, {
            new: true
          });
        res.status(201).json(result);
    } catch(e){
        res.status(400).send(e);
    }
})
module.exports = router;