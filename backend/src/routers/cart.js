const express = require('express');
var mongoose = require('mongoose');
const { find } = require('../models/cart');
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
                productImageUrl: product.imageUrl
            };
            finalResult.push({ _id: _id, quantity: quantity, ...tempProduct });
        }
        // const finalResult = await Promise.all(result.map(async (item) => {
        //     try {
        //         const { _id, productId } = item;
        //         console.log(`id is ${_id} and pro id is ${productId}`);
        //         const product = await Product.find({ _id: productId });
        //         console.log(`pro is ${product}`);
        //         return { _id, ...product };
        //     } catch (e) {
        //         console.log(`error ${error}`)
        //     }

        // }));
        //console.log(`finalResult is ${finalResult[0]}`);
        res.status(200).send(finalResult);
    } catch (e) {
        res.status(404).send(e.message);
    }
})

router.delete('/cart/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const result = await Cart.findByIdAndDelete(id);
        //console.log(result);
        res.status(200).send(result);
    }catch(e){
        res.send(e.message);
    }
})


module.exports = router;