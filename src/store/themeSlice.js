import { createSlice } from "@reduxjs/toolkit";
import authService from "../appwrite/auth";

const initialState = {
    theme : true
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        addTheme: (state, action) => {
            state.theme = action.payload;
            authService.updatePreferences(action.payload)
        },
        setInitialTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
})

export const {addTheme, setInitialTheme} = themeSlice.actions;

export default themeSlice.reducer;