const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    price: {
        type: Number,
        required: true,
        minlength: 1
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;