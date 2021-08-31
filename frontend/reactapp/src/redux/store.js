import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import productSlice from './slices/productSlice';
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer:{
        product: productSlice,
        cart: cartSlice,
        user: userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;