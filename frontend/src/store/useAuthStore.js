import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';

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
            toast.error(error.response.data.message);
        }finally{
            set({isSignUp: false});
        }
    }
}))