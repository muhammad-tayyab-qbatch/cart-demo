import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getProductsFromApi = createAsyncThunk(
    'fetching-products',
    async (data, thunkAPI) => {
        try {
            const res = await axios.get('http://localhost:8000/products');
           //const res = await axios.get('https://fakestoreapi.com/products');
           //console.log(res.data);
           return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }

    }
)

const initialState = {
    productList: []
}
const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: {
        [getProductsFromApi.fulfilled]: (state, action) => {
            return {
                ...state,
                productList: action.payload
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
        }
    }
})

export default productSlice.reducer;