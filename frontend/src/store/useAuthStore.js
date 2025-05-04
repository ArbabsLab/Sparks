import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';


export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSignUp: false,
    isLogin: false,
    isUpdating: false,

    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data})
        }catch (e){
            set({authUser: null})
        } finally{
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({isSignUp: true})
        try{
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data});
            toast.success("Account created");
            
        }catch(e){
            toast.error(e.response.data.message);
        }finally{
            set({isSignUp: false});
        }
    },

    logout: async () => {
        await axiosInstance.post("/auth/logout");
        set({authUser: null});
        toast.success("Logged Out")
    },

    login: async (formstuff) => {
        set({isLogin: true})
        try{
            const res = await axiosInstance.post("/auth/login", formstuff);
            set({authUser: res.data});
            toast.success("Logged In");
        }catch(e){
            toast.error(e.response.data.message);
        }finally{
            set({isLogin: false})
        }
    }
}))