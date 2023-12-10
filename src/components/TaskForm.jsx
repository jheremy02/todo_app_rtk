import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask, createTaskThunk, getTasksThunk, resetTasks } from "../features/tasks/taskSlice";
import { createTaskService, getTasksService } from "./Tasks/service";
import { getTasks } from "./Tasks/handlersTasks";
import { toast } from "react-toastify";
function TaskForm() {
  const tasks = useSelector((state) => state.tasks);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    //const loading=toast.loading("Loading")
    try {
      const newTask = {
        title: data.task_title,
        description: data.task_description,
        status:false
      };
      //const responseCreate = await createTaskService(newTask);
      const responseCreate= await dispatch(createTaskThunk(newTask))
      const responseTasks=await dispatch(getTasksThunk({}))
      //await getTasks(dispatch);
      //toast.dismiss(loading)
      //toast.success("task created successfully")
      reset();
    } catch (error) {
      toast.error(error.message)
    }
  };

 

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="task_title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title{" "}
          </label>
          <input
            type="text"
            id="task_title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="title"
            {...register("task_title")}
            required
          />
        </div>
        <div>
          <label
            htmlFor="dtask_description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            id="task_description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="description"
            {...register("task_description")}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add
      </button>
    </form>
  );
}

export default TaskForm;
