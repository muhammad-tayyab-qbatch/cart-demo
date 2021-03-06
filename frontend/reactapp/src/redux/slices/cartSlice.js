import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios-config';

export const getCartItemsFromApi = createAsyncThunk(
    'get-cart-items',
    async ({ token }, { rejectWithValue }) => {
        try {
            const res = await axios.get('/cart', {
                headers: {
                    'authorization': `bearer ${token}`
                }
            });
            return res.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

export const addAndUpdateToCart = createAsyncThunk(
    'add/update-item-to-cart',
    async ({ productId, quantity, userId }, { getState, rejectWithValue }) => {
        try {
            const { cart } = getState();
            const item = cart.cartList && cart.cartList.find(obj => obj.productId === productId);
            
            if (item) {
                const res = await axios.patch(`/products/${productId}`, { quantity: item.quantity + quantity });
                return { response: res.data, quantity };
            }
            else {
                const res = await axios.post('/products', { productId: productId, quantity: quantity, userId: userId });
                return { response: res.data };

            }
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

export const removeCartItem = createAsyncThunk(
    'delete-item-from-cart',
    async ({ cartId }, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`/cart/${cartId}`);
            return res.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

const initialState = {
    cartList: [],
    itemCount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearState(state, action) {
            return {
                cartList: [],
                itemCount: 0
            }
        }
    },
    extraReducers: {
        [getCartItemsFromApi.fulfilled]: (state, action) => {
            let sum = 0;
            for (const i in action.payload) {
                const { quantity } = action.payload[i];
                sum += quantity;
            }
            return {
                ...state,
                cartList: action.payload,
                itemCount: sum
            }
        },
        [addAndUpdateToCart.fulfilled]: (state, action) => {
            const { _id, productId, quantity, userId } = action.payload.response;
            let { cartList, itemCount } = state;
            const index = cartList.findIndex(item => item._id === _id);
            if (index !== -1) {
                state.itemCount = itemCount + action.payload.quantity;
                state.cartList[index].quantity = quantity;
            }
            else {
                return {
                    ...state,
                    cartList: [...state.cartList, { _id: _id, productId: productId, quantity: quantity, userId: userId }],
                    itemCount: itemCount + 1
                }
            }
        },
        [removeCartItem.fulfilled]: (state, action) => {
            const { _id, quantity } = action.payload;
            let { cartList, itemCount } = state;
            const newList = cartList.filter((item) => item._id !== _id);
            return {
                ...state,
                cartList: newList,
                itemCount: itemCount - quantity
            }
        }
    }

})

export const { clearState } = cartSlice.actions;
export default cartSlice.reducer;