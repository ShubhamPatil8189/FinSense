import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, // 👈 IMPORTANT (cookies)
});

export const addGoalApi = (data) => API.post("/goals", data);
export const getPrioritizedGoalsApi = () => API.get("/goals/prioritize");
