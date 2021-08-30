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
    },
    userId: {
        type: String,
        required: true,
        unique: true
    }
})

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;