import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: "",
    platform: "All",
    status: "All",
};

const uiSlice = createSlice({
    name: "ui",

    initialState,

    reducers: {
        setSearch(state, action) {
            state.search = action.payload;
        },

        setPlatform(state, action) {
            state.platform = action.payload;
        },

        setStatus(state, action) {
            state.status = action.payload;
        },

        clearFilters(state) {
            state.search = "";
            state.platform = "All";
            state.status = "All";
        },
    },
});

export const { setSearch, setPlatform, setStatus, clearFilters } =
    uiSlice.actions;

export default uiSlice.reducer;
