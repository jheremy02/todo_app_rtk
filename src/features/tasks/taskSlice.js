import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTaskService, deleteTaskService, getTasksService, updateTaskService } from "../../components/Tasks/service";
import { toast } from "react-toastify";


export const createTaskThunk=createAsyncThunk('tasks/createTaskThunk',async(newTask,thunkAPI)=>{

    const response = await createTaskService(newTask)

    return response
  
})

export const getTasksThunk=createAsyncThunk('tasks/getTasksThunk',async(params,thunkAPI)=>{

  const response = await getTasksService(params)

  return response

})

export const updateTaskThunk= createAsyncThunk('tasks/updateTaskThunk',async(updatedTask)=>{
  const response = await updateTaskService(updatedTask)
  return response
})


export const deleteTaskThunk = createAsyncThunk('tasks/deleteTaskThunk',async (task)=>{
  const response = await deleteTaskService(task)
  return response
}
)


const initialState = {
  taskList:[],
  isLoading:null,
  error:null
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.taskList.push(action.payload);
    },
    deleteTask: (state, action) => {
      const taskFound = state.find((task) => task.id === action.payload.id);
      if (taskFound) {
        state.splice(state.indexOf(taskFound), 1);
      }
    },

    editTask: (state, action) => {
      const taskFound = state.find((task) => task.id === action.payload.id);
      const indexTaskFound = state.indexOf(taskFound);

      if (indexTaskFound >= 0) {
        state[indexTaskFound] = action.payload;
      }
    },

    resetTasks: (state, action) => {
      state.taskList.splice(0,state.taskList.length);
      console.log("clean");
    },
  },
  extraReducers:(builder)=>{

    builder.addCase(createTaskThunk.pending, (state, action) => {
      // Add user to the state array
      state.isLoading=state.isLoading?toast.dismiss(state.isLoading):toast.loading('Cargando...')
    })
    builder.addCase(createTaskThunk.fulfilled, (state, action) => {
      // Add user to the state array
      state.taskList.push(action.payload)
      toast.dismiss(state.isLoading)
    })

    builder.addCase(createTaskThunk.rejected, (state, action) => {
      // Add user to the state array
      toast.dismiss(state.isLoading)
      const {error}=action
      toast.error(error.message)

    })

    builder.addCase(getTasksThunk.pending, (state, action) => {
      // Add user to the state array
      state.isLoading=state.isLoading?toast.dismiss(state.isLoading):toast.loading('Cargando...')
    })

    builder.addCase(getTasksThunk.fulfilled, (state, action) => {
      // Add user to the state array
      toast.dismiss(state.isLoading)
      state.taskList=(action.payload)
      state.isLoading=null
      
    })

    builder.addCase(getTasksThunk.rejected, (state, action) => {
      // Add user to the state array
      toast.dismiss(state.isLoading)
      state.isLoading=null
      const {error}=action
      toast.error(error.message)

    })

    builder.addCase(updateTaskThunk.pending, (state, action) => {
      // Add user to the state array
      state.isLoading=state.isLoading?toast.dismiss(state.isLoading):toast.loading('Cargando...')
    })

    builder.addCase(updateTaskThunk.fulfilled, (state, action) => {
      // Add user to the state array
      toast.dismiss(state.isLoading)
      state.isLoading=null
      toast.success('Actualizado con exito!!')
    })

    builder.addCase(updateTaskThunk.rejected, (state, action) => {
      // Add user to the state array
      toast.dismiss(state.isLoading)
      state.isLoading=null
      const {error}=action
      toast.error(error.message)

    })


    builder.addCase(deleteTaskThunk.pending, (state, action) => {
      // Add user to the state array
      state.isLoading=state.isLoading?toast.dismiss(state.isLoading):toast.loading('Cargando...')
    })

    builder.addCase(deleteTaskThunk.fulfilled, (state, action) => {
      // Add user to the state array
      toast.dismiss(state.isLoading)
      state.isLoading=null
      toast.success('Eliminado con exito!!')
    })

    builder.addCase(deleteTaskThunk.rejected, (state, action) => {
      // Add user to the state array
      toast.dismiss(state.isLoading)
      state.isLoading=null
      const {error}=action
      toast.error(error.message)

    })

    


  }
});

export const { addTask, deleteTask, editTask, resetTasks } = taskSlice.actions;

export default taskSlice.reducer;
