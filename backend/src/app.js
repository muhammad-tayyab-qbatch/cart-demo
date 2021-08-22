const express = require('express');
const cors = require('cors');
require('./db/connection');
const Product = require('./models/product');
const productRouter = require('./routers/product');
const cartRouter = require('./routers/cart');

const app = express();
const PORT = process.env.port || 8000;

app.use(cors());
app.use(express.json());
app.use(productRouter);
app.use(cartRouter);


// try {
//     const p = new Product({
//         name: 'Pen',
//         price: 50,
//         imageUrl: 'https://static4.depositphotos.com/1001391/318/v/600/depositphotos_3183697-stock-illustration-realistic-vector-pen.jpg'
//     });
//     const result = p.save();
//     console.log(result);
// } catch (e) {
//     console.log(e.message);
// }

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});