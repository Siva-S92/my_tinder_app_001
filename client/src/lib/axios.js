import axios from 'axios';
import { serverURL } from '../constant';




const BASE_URL = import.meta.env.MODE === "development" ? `${serverURL}/api` : "/api";

export const axiosInstance = axios.create({
    // TO DO UPDATE THE BASEURL HERE, SO THAT IT WORKS IN THE DEPLOYMENT AS WELL 
    baseURL: BASE_URL,
    withCredentials: true,
})