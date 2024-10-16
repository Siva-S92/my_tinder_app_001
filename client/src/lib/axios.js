import axios from 'axios';


export const axiosInstance = axios.create({
    // TO DO UPDATE THE BASEURL HERE, SO THAT IT WORKS IN THE DEPLOYMENT AS WELL 
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
})