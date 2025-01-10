import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appwriteService from '../appwrite/config';


const initialState = {
    posts: [],
    postStatus: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('fetchPosts', async () => {
    try {
        const response = await appwriteService.getPosts([]);        
        return response.documents; 
    } catch (error) {
        return error
    }
});



const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload)
            // console.log("addPost::", action.payload);
        },
        updatePost: (state, action) => {
            state.posts = state.posts.map(post => post.$id === action.payload.$id ? action.payload : post)
            // console.log("updatePost::", action.payload);
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter(post => post.$id !== action.payload.$id)
            // console.log("deletePost::", action.payload);
            
        },
    },
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

export const { addPost, updatePost, removePost } = postSlice.actions

export default postSlice.reducer;