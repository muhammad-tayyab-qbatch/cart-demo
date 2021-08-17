const express = require('express');
require('./db/connection');
//const Product = require('./models/product');
const productRouter = require('./routers/product');
const cartRouter = require('./routers/cart');

const app = express();
const PORT = process.env.port || 8000;

app.use(express.json());
app.use(productRouter);
app.use(cartRouter);


// try {
//     const p = new Product({
//         name: 'Pen',
//         price: 50
//     });
//     const result = p.save();
//     console.log(result);
// } catch (e) {
//     console.log(e.message);
// }

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});