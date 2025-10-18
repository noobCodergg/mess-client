import axios from "axios";

const API = axios.create({
    baseURL: "https://mess-server-2.onrender.com/api/shop", 
    withCredentials: true,
  });

export const registration = (data) =>API.post('/registration',data)
export const addToShop = (data) =>API.post('/shop-entry',data);
export const getRecordByUser = (userId, month) =>API.get('/get-record-by-user',{params:{userId,month}})
export const getMonthlytotals = () => API.get('/get-records')
