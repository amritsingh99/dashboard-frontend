import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers : {
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
})

const initialState = {
    mode: "dark",
    userId : "63701cc1f03239d40b000044"
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setMode : (state) => {
            state.mode = state.mode === 'light' ? "dark" : 'light';
        }
    }
})

export const { setMode } = globalSlice.actions
export const { setToken } = authSlice.actions
export const { reducer } = authSlice 
export default globalSlice.reducer;