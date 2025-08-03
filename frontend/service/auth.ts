import api from "@/app/api";
import { LoginData, RegisterData } from "@/interface/IAuth";
import { handleApiError } from "@/utils/handleApiError";

export const register = async (userDataRegister: RegisterData) => {
  try {
    const response = await api.post("/auth/register", userDataRegister);
    return response.data;
  } catch (error) {
    handleApiError(error, "Register Failed");
  }
};

export const login = async (userDataLogin: LoginData) => {
  try {
    const response = await api.post("/auth/login", userDataLogin);
    return response.data;
  } catch (error) {
    handleApiError(error, "Login Failed");
  }
};
