import axios from "axios";
import type { Employee } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getEmployees = async () => {
  const response = await axios.get<Employee[]>(`${API_URL}/employees`);
  return response.data;
};

export const addEmployee = async (employee: Omit<Employee, "id">) => {
  const response = await axios.post<Employee>(`${API_URL}/employees`, employee);
  return response.data;
};
