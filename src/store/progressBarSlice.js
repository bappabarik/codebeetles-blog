import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    progress: 10,
    loading: true
}

const progressBarSlice = createSlice({
    name: "progressBar",
    initialState,
    reducers: {
        addProgress: (state, action) => {
            state.progress = action.payload;
            
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const {addProgress, setLoading} = progressBarSlice.actions;

export default progressBarSlice.reducer;