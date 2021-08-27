const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    description: {
        type: String,
        required: true,
        minlength: 2
    }
    ,
    price: {
        type: Number,
        required: true,
        minlength: 1
    },
    imageUrl: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;