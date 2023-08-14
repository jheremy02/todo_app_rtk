import { createSlice } from '@reduxjs/toolkit'
import { storage } from '../../utils/storage';

const accessToken = storage.get("auth_task_app");


const initialState = {
    auth: !!accessToken
}   

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    authLogin:(state,action)=>{

        state.auth=true
    },

    authLogout:(state,action)=>{

        state.auth=false
    }
  },
});

export const {authLogin,authLogout} = authSlice.actions

export default authSlice.reducer