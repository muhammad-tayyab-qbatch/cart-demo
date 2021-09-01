import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios-config';

export const getProductsFromApi = createAsyncThunk(
    'fetching-products',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get('/products');
            return res.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

export const getSelectedProduct = createAsyncThunk(
    'get-product-by-id',
    async ({ _id }, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/products/${_id}`);
            return res.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

const initialState = {
    productList: [],
    selectedProduct: {},
    error: {}
}
const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: {
        [getProductsFromApi.fulfilled]: (state, action) => {
            return {
                ...state,
                productList: action.payload,
                error: null
            }
        },
        [getProductsFromApi.rejected]: (state, action) => {
            return {
                ...state,
                error: action.payload
            }
        },
        [getProductsFromApi.pending]: (state, action) => {
            //console.log({ state, action })
        },
        [getSelectedProduct.fulfilled]: (state, action) => {
            return {
                ...state,
                selectedProduct: action.payload,
                error: null
            }
        },
        [getSelectedProduct.rejected]: (state, action) => {
            return {
                ...state,
                selectedProduct: null,
                error: action.payload
            }
        }
    }
})

export default productSlice.reducer;