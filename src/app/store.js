import { configureStore } from '@reduxjs/toolkit'
import taskSliceReducer from '../features/tasks/taskSlice'
import uiSlice from '../features/tasks/ui'
import authSlice from '../features/tasks/authSlice'



export const store = configureStore({
  reducer: {
    tasks:taskSliceReducer,
    ui:uiSlice,
    auth:authSlice
  },
})