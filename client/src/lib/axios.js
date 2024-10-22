import axios from 'axios';
import { serverURL } from '../constant';





export const axiosInstance = axios.create({
    // TO DO UPDATE THE BASEURL HERE, SO THAT IT WORKS IN THE DEPLOYMENT AS WELL 
    baseURL: `${serverURL}/api`,
    withCredentials: true,
})