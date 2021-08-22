import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getCartItemsFromApi = createAsyncThunk(
    'get-cart-items',
    async (data, {rejectWithValue }) => {
        try {
            const res = await axios.get('http://localhost:8000/cart');
            //console.log(`res.data is ${res.data}`);
            return res.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

export const addToCart = createAsyncThunk(
    'add/update-item-to-cart',
    async (data, {getState, rejectWithValue}) => {
        
        const { productId, quantity } = data;
        const cartList = getState().cart.cartList;
        var item = cartList.find(obj => obj.productId === productId);
        //if (cartList.some(obj => obj.productId === productId)) {
        if (item) { 
            // console.log(`in if case}`);
            try {
                const res = await axios.patch(`http://localhost:8000/products/${productId}`, { quantity: item.quantity+1 });
                //const d = { _id: res.data._id, productId: res.data.productId, quantity: res.data.quantity };

                return res.data;
            } catch (e) {
                return rejectWithValue(e.message);
            }
        }
        else {
            try {
                //console.log(`in else case}`);
                const res = await axios.post('http://localhost:8000/products', { productId: productId, quantity: 1 });
                const d = { _id: res.data._id, productId: res.data.productId, quantity: res.data.quantity };
                return res.data;
            } catch (e) {
                return rejectWithValue(e.message);
            }
        }

    }
)


const initialState = {
    cartList: []
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment(state, action) {
            state.count += 1;
        }
    },
    extraReducers: {
        [getCartItemsFromApi.fulfilled]: (state, action) => {
           // console.log(`pay load is ${action.payload}`)
            return {
                ...state,
                cartList: action.payload
            }
        },
        [addToCart.fulfilled]: (state, action) => {
            const {_id, productId, quantity } = action.payload;
           // console.log(...state.cartList);
            return {
                ...state,
                cartList: [...state.cartList, {_id: _id, productId: productId, quantity: quantity}]
            }

        }
    }

})

export const { increment } = cartSlice.actions;
export default cartSlice.reducer;