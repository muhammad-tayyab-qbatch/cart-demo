import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import productSlice from './slices/productSlice';
import cartSlice from "./slices/cartSlice";

const store = configureStore({
    reducer:{
        product: productSlice,
        cart: cartSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;