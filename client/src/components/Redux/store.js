import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from './Productslice'
import UserReducer from './Userslice';

export const store = configureStore({
    reducer: {
        product: ProductReducer,
        credentials: UserReducer,
    }
})