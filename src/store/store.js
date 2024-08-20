import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import progressBarSlice from './progressBarSlice';
import themeSlice from './themeSlice';


const store = configureStore({
    reducer: {
        auth: authSlice,
        progressBar: progressBarSlice,
        theme: themeSlice
    }
})

export default store