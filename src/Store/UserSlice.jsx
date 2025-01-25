import { createSlice } from '@reduxjs/toolkit'

const initialValue={
    name:"",
    email:""
}

const userSlice=createSlice({
    name:"user",
    initialState:initialValue,
    reducers:{
        createUser:(state,actions)=>{
            state.name=actions.payload.name
            state.email=actions.payload.email
        },
        logoutUser:(state,actions)=>{
            state.name = '';
            state.email = '';
        }


    }
})

export const{createUser,logoutUser}=userSlice.actions
export default userSlice.reducer