import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios-config';

export const registerUser = createAsyncThunk(
    'user-registeration',
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const res = await axios.post('/register', { name, email, password });
            return { response: res.data };
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

export const loginUser = createAsyncThunk(
    'user-login',
    async ({ email, password, userId }, { rejectWithValue }) => {
        try {
            const res = await axios.post('/login', { email, password, userId });
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const getUser = createAsyncThunk(
    'get-user-data',
    async ({ token }, { rejectWithValue }) => {
        try {
            const res = await axios.get('/user', {
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


const initialState = {
    userId: '',
    name: '',
    email: '',
    password: '',
    token: '',
    isRegistered: false,
    auth: false,
    error: '',
    isloading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState, reducers: {
        clearState(state, action) {
            return {
                userId: '',
                name: '',
                email: '',
                password: '',
                token: '',
                isRegistered: false,
                auth: false,
                error: {},
                isloading: false
            }
        }
    },
    extraReducers: {
        [registerUser.pending]: (state, action) => {
            return {
                ...state,
                isloading: true
            }
        },
        [registerUser.fulfilled]: (state, action) => {
            return {
                ...state,
                isRegistered: true,
                isloading: false
            }
        },
        [registerUser.rejected]: (state, action) => {
            return {
                ...state,
                isRegistered: false,
                isloading: false,
                error: action.payload
            }
        },
        [loginUser.pending]: (state, action) => {
            return {
                ...state,
                isloading: true
            }
        },
        [loginUser.fulfilled]: (state, action) => {
            return {
                ...state,
                auth: action.payload.auth,
                token: action.payload.token,
                userId: action.payload.user._id,
                name: action.payload.user.name,
                email: action.payload.user.email,
                password: action.payload.user.password,
                isloading: false
            }
        },
        [loginUser.rejected]: (state, action) => {
            return {
                ...state,
                auth: false,
                isloading: false,
                error: action.payload
            }
        },
        [getUser.pending]: (state, action) => {
            return {
                ...state,
                isloading: true
            }
        },
        [getUser.fulfilled]: (state, action) => {
            return {
                ...state,
                auth: action.payload.auth,
                token: action.payload.token,
                userId: action.payload.user._id,
                name: action.payload.user.name,
                email: action.payload.user.email,
                password: action.payload.user.password,
                isloading: false
            }
        },


    }
})

export const { clearState } = userSlice.actions;
export default userSlice.reducer;