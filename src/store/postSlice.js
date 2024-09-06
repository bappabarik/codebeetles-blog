import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    post: null
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setPost: (state, action) => {
            state.post = action.payload;
        }
    }
});

export const { setPosts, setPost } = postSlice.actions;

export default postSlice.reducer;