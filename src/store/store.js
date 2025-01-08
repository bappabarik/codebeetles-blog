import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import progressBarSlice from './progressBarSlice';
import themeSlice from './themeSlice';
import postSlice from './postSlice';
import editorSlice from './editorSlice'


const store = configureStore({
    reducer: {
        auth: authSlice,
        progressBar: progressBarSlice,
        theme: themeSlice,
        post: postSlice,
        editor: editorSlice
    }
})

export default store