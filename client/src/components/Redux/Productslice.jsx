import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const gettingProducts = createAsyncThunk(
  "something",
  async (data,  { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/products/list");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message || err);
    }
  }
);

export const gettingProductsById = createAsyncThunk ("productsByID", async(id, { rejectWithValue}) => {
    try {

        const response = await axios.get(`http://localhost:3000/api/v1/products/list/${id}`) 
        return response.data;

    } catch(err) {
        return rejectWithValue(err)
    }
})

const productSlice = createSlice({
    name: "product",
    initialState: {
      users: [],
      selectedProduct: null, 
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(gettingProducts.pending, (state) => {
          state.loading = true;
        })
        .addCase(gettingProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload.products; // 
        })
        .addCase(gettingProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(gettingProductsById.pending, (state,action) => {
            state.loading = true
        })
        .addCase(gettingProductsById.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.user; 
        })
        .addCase(gettingProductsById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
    },
  });
  

export default productSlice.reducer;

