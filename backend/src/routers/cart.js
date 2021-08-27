const express = require('express');
const router = new express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');

router.get('/cart', async (req, res) => {
    try {
        const result = await Cart.find();
        const finalResult = [];
        for (const item in result) {
            const { _id, productId, quantity } = result[item];
            const product = await Product.findById(productId);
            const tempProduct = {
                productId: product._id,
                productName: product.name,
                productPrice: product.price,
                productImageUrl: product.imageUrl,
                productDescription: product.description
            };
            finalResult.push({ _id: _id, quantity: quantity, ...tempProduct });
        }
        res.status(200).send(finalResult);
    } catch (e) {
        res.status(404).send(e.message);
    }
})

router.delete('/cart/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Cart.findByIdAndDelete(id);
        res.status(200).send(result);
    } catch (e) {
        res.send(e.message);
    }
})


module.exports = router;