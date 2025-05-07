import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5001' : '/';

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSignUp: false,
  isLogin: false,
  isUpdating: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
      get().connectSocket();
    } catch (e) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSignUp: true });
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      set({ authUser: res.data });
      toast.success('Account created');
      get().connectSocket();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Signup failed');
    } finally {
      set({ isSignUp: false });
    }
  },

  login: async (formstuff) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post('/auth/login', formstuff);
      set({ authUser: res.data });
      toast.success('Logged In');
      get().connectSocket();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Login failed');
    } finally {
      set({ isLogin: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdating: true });
    try {
      const res = await axiosInstance.put('/auth/update-profile', data);
      set({ authUser: res.data });
      toast.success('Profile updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      set({ isUpdating: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();

    if (!authUser) return;
    if (socket?.connected) return;

    const newSocket = io(BASE_URL, {
      query: { userId: authUser._id },
    });

    newSocket.connect();

    set({ socket: newSocket });

    newSocket.on('getOnlineUsers', (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
