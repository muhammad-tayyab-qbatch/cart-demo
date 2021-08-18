import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getDataFromApi = createAsyncThunk(
    'fetching-products',
    async (data, thunkAPI) => {
        try {
            //const res = await axios.get('http://localhost:8000/products');
           const res = await axios.get('https://fakestoreapi.com/products');
           //console.log(res.data);
           return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }

    }
)

const initialState = {
    list: []
}
const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: {
        [getDataFromApi.fulfilled]: (state, action) => {
            return {
                ...state,
                list: action.payload
            }
        },
        [getDataFromApi.rejected]: (state, action) => {

            return {
                ...state,
                error: action.payload
            }
        },
        [getDataFromApi.pending]: (state, action) => {
            //console.log({ state, action })
        }
    }
})

export default productSlice.reducer;