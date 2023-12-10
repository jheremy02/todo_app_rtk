import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, deleteTaskThunk, getTasksThunk, resetTasks, updateTaskThunk } from "../features/tasks/taskSlice";
import { load_data_to_edit, showEditModal } from "../features/tasks/ui";
import { useEffect } from "react";
import { deleteTaskService, updateTaskService } from "./Tasks/service";
import { getTasks } from "./Tasks/handlersTasks";
import { toast } from "react-toastify";

function TaskList() {
  const tasks = useSelector((state) => state.tasks.taskList);

  const dispatch = useDispatch();

  async function onClickDelete(task) {
    
    try {
      const response = await dispatch(deleteTaskThunk(task))

      if (!response.error) {
        dispatch(getTasksThunk({}))
      }
      
    } catch (error) {
      
      toast.error(error.message)
    }
  }

  function handleEditOnClick(id_task) {
    const taskFound = tasks.find((task) => task.id === id_task);

    dispatch(showEditModal(true));
    dispatch(load_data_to_edit(taskFound));
  }

  async function handleClickToggle(task,event) {
   
      try {
        const taskUpdated={
          ...task,
          status:event.target.checked
        }
        const response = await dispatch(updateTaskThunk(taskUpdated))
          await dispatch(getTasksThunk({}))
      } catch (error) {
        
        toast.error(error.message)
      }
  }

  useEffect(() => {
    //getTasks(dispatch)
    (async () =>{
      const response =await  dispatch(getTasksThunk({}))
    
    })()
  }, []);

  return (
    <div className="relative overflow-x-auto mt-8">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th scope="row" className="px-6 py-4  dark:text-white">
                {task.id}
              </th>
              <td className="px-6 py-4">{task.title}</td>
              <td className="px-6 py-4">{task.description}</td>
              <td>

              <label className="relative inline-flex items-center mr-5 cursor-pointer">
  <input type="checkbox" value="" onClick={(event)=> handleClickToggle(task,event)  } className="sr-only peer"  checked={task.status} />
  <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
</label>

              </td>
              <td>
                <button
                  type="button"
                  onClick={() => onClickDelete(task)}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleEditOnClick(task.id);
                  }}
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
