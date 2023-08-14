import client from "../../api/client";
import { storage } from "../../utils/storage";

export const createTaskService = async (newTask) => {
  try {
    const response = client.post("/api/tasks", newTask);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateTaskService = async (taskUpdated) => {
  try {
    const response = await client.put(
      `/api/tasks/${taskUpdated.id}`,
      taskUpdated
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteTaskService = async (task) => {
  try {
    const response = await client.delete(`/api/tasks/${task.id}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTasksService = async () => {
  try {
    const token = storage.get("auth_task_app");
    const infoUser = JSON.parse(atob(token.split(".")[1]));
    if (infoUser.userId) {
      const response = await client.get("/api/tasks",{params:{userId:infoUser.userId}});
    return response;
    } else {
      return []
    }
    
  } catch (error) {
    throw new Error(error.message);
  }
};
