import client, {
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from "../../api/client";
import { storage } from "../../utils/storage";

export const login = ({ username, password }) => {
  return client.post("/auth/login", { username, password }).then((response) => {
    setAuthorizationHeader(response.accessToken);
    storage.set("auth_task_app", response.accessToken);
  });
};

export const registerUser = async ({ username, password }) => {
  try {
    const response = await client.post("/auth/register", {
      username,
      password,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    await Promise.resolve();
    removeAuthorizationHeader();
    storage.remove("auth_task_app");

  } catch (error) {
    
    throw new Error(error.message);
  }
};
