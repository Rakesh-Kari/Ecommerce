import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("loginUser", async ( {  email, password }) => {
    try {
        const response = await axios.post("http://localhost:3000/api/v1/user/login",  { email, password }, {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        });
        console.log(response)
        return response.data;
    } catch(err) {
        return console.log("Error:", err)
    }
});

export const registerUser = createAsyncThunk("registerUser", async ( {name, email, password }) => {
    try {
        const response = await axios.post("http://localhost:3000/api/v1/user/register",  { name, email, password }, { 
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        });
        console.log(response)
        return response.data;
    } catch(err) {
        return console.log("Error:", err)
    }
});

const UserSlice = createSlice({
    name: "credentials",
    initialState: {
        user: "",
        token: "",
        loading: true,
        error: null,
        isLogged: localStorage.getItem("isLogged") === "true" || false,
        isAdmin: false
    },
    reducers: {
        // addUser: (state, action) => {
        //     state.user = action.payload.user;
        //     localStorage.setItem("user", JSON.stringify(action.payload.user));
        // },
        // addToken: (state, action) => {
        //     state.token = action.payload.token;
        //     localStorage.setItem("accessToken", JSON.stringify(action.payload.accessToken));
        // }
        addUser: (state, action) => {
            state.isLogged = action.payload.isLogged,
            state.isAdmin = action.payload.isAdmin,
            localStorage.setItem("isLogged", action.payload.isLogged);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loading = false;
                state.token = action.payload.accessToken;
                localStorage.setItem("accessToken", JSON.stringify(state.token))
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false,
                state.token = action.payload.accessToken
                localStorage.setItem("accessToken", JSON.stringify(state.token))
            })
            .addCase(registerUser.rejected, (state,action) => {
                state.loading = false,
                state.error = action.payload
            })
    }
});

export const { addUser } = UserSlice.actions;
export default UserSlice.reducer;
