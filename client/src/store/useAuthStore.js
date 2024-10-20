import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { disconnectSocket, initializeSocket } from "../socket/socket.client";

export const useAuthStore = create((set) => ({
  authUser: null,
  checkingAuth: true,
  loading: false,

  signUp: async (signupData) => {
    try {
      console.log(signupData);
      set({ loading: true });
      const res = await axiosInstance.post("/auth/signup", signupData);
      console.log(res.data);

      set({ authUser: res.data.user });
      initializeSocket(res.data.user._id)
      toast.success("Account Created Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  login: async (loginData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/login", loginData);
      console.log(res.data);

      set({ authUser: res.data.user });
      initializeSocket(res.data.user._id)
      toast.success(`${res.data.user.name} logged in successfully`);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      disconnectSocket();
      if(res.status === 200){
        toast.success(res.data.message)
        set({ authUser: null });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      initializeSocket(res.data.user._id)
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null });
      console.log(error);
    } finally {
      set({ checkingAuth: false });
    }
  },
}));
