import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/meal",
  withCredentials: true,
});

export const updateMealStatus = ({ userId, date, mealType, status }) => 
  API.post("/update-meal", { userId, date, mealType, status });

export const getmealByUser = (userId) => API.get(`/get-meals-by-user/${userId}`)
export const getSummery = () =>API.get('/get-summery')