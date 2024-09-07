import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appwriteService from '../appwrite/config';


const initialState = {
    posts: [],
    postStatus: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('fetchPosts', async () => {
    try {
        const response = await appwriteService.getPosts();        
        return response.documents; 
    } catch (error) {
        return error
    }
});



const postSlice = createSlice({
    name: "post",
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.postStatus = 'loading';
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.postStatus = 'succeeded';
            state.posts = action.payload;  // Update posts in the state
            // console.log("Posts updated in state:", state.posts);
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.postStatus = 'failed';
            state.error = action.error.message || 'Failed to fetch posts';
            console.error("Error in rejected state:", action.error);
        })
    }
});

export default postSlice.reducer;