const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    productId: {
        type: String,
        required: true,
        minlength: 2
    },
    quantity: {
        type: Number,
        required: true,
        minlength: 2
    }
})

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;