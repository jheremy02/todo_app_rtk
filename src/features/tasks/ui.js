import { createSlice } from '@reduxjs/toolkit'

const initialState = {
        data:{},
        show:false
    }

function showEditModalReducer(state,action) {

        state.show=action.payload
        
}

const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showEditModal:showEditModalReducer,
    load_data_to_edit : (state,action)=>{

      state.data=action.payload

    }
    
  }
});

export const {showEditModal,load_data_to_edit} = ui.actions

export default ui.reducer