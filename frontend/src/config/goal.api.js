import api from "./api";

export const addGoalApi = (data) => api.post("/goals", data);
export const getPrioritizedGoalsApi = () => api.get("/goals/prioritize");
