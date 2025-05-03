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
    }
}))