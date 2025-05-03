import { createSlice } from "@reduxjs/toolkit"
const initiateValue = {
    id:"",
    name:"",
    email: "",
    token: "",
    isAuthentificated: false,
}

export const adminSlice = createSlice ({
    name:"admin",
    initialState: initiateValue,
    reducers:{
        loginAdmin: (state, action) =>{
            state.name=action.payload.name;
            state.id=action.payload.id;
            state.email=action.payload.email;
            state.token=action.payload.token;
            state.isAuthentificated= true;
        },
        updateAdmin: (state, action) => {
            state.name=action.payload.name;
            state.id=action.payload.id;
            state.email=action.payload.email;
            state.token=action.payload.token;
        },
        logoutAdmin: (state) => {
            state= initiateValue;
    },
},});


export const {loginAdmin,logoutAdmin, updateAdmin} = adminSlice.actions;
export const adminReducer= adminSlice.reducer;