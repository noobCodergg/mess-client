import axios from "axios";

const API = axios.create({
  baseURL: "https://mess-server-2.onrender.com/api/meal",
  withCredentials: true,
});

export const updateMealStatus = ({ userId, date, mealType, status }) => 
  API.post("/update-meal", { userId, date, mealType, status });

export const getmealByUser = (userId) => API.get(`/get-meals-by-user/${userId}`)
export const getSummery = () =>API.get('/get-summery')