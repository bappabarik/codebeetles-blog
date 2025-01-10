import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editorInstance: null,
}

const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setEditorInstance: (state, action) => {
            state.editorRef = action.payload;
        }
    }
})

export const { setEditorInstance } = editorSlice.actions;

export default editorSlice.reducer;