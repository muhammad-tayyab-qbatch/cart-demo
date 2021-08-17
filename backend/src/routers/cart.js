const express = require('express');
const router = new express.Router();
const Cart = require('../models/cart');

router.get('/cart', async (req, res) => {
    try {
        const result = await Cart.find();
        res.status(200).send(result);
    } catch (e) {
        res.status(404).send(e.message);
    }
})


module.exports = router;