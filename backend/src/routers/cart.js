const express = require('express');
var mongoose = require('mongoose');
const router = new express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');

router.get('/cart', async (req, res) => {
    try {
        const result = await Cart.find();
        //console.log(`res is ${result}`);
        const finalResult = [];
        for (const item in result) {
            //console.log(`item is ${result[item]}`);
            const { _id, productId, quantity } = result[item];
            //console.log(`id is ${_id} and p id is ${productId}`);
            const product = await Product.findById(productId);

            //console.log(`pro is ${product}`);
            const tempProduct = {
                productId: product._id,
                productName: product.name,
                productPrice: product.price,
                productImageUrl: product.imageUrl
            };
            finalResult.push({ _id: _id, quantity: quantity, ...tempProduct});
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


module.exports = router;