const express = require('express');
const cors = require('cors');
require('./db/connection');
const productRouter = require('./routers/product');
const cartRouter = require('./routers/cart');
const userRouter = require('./routers/user');

const app = express();
const PORT = process.env.port || 8000;

app.use(cors());
app.use(express.json());
app.use(productRouter);
app.use(cartRouter);
app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});