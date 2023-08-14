import { addTask, resetTasks } from "../../features/tasks/taskSlice";
import { getTasksService } from "./service";

export async function getTasks(dispatch) {
    try {
      const response = await getTasksService();
      if (response) {
        dispatch(resetTasks("reset"));
        const tasks = [...response];
        tasks.forEach((task) => {
          dispatch(addTask(task));
        });
      }
    } catch (error) {
      console.log(error);
    }
  }