import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";

interface Isignup {
  name: string;
  email: string;
  password: string;
}

interface Ilogin {
  email: string;
  password: string;
}

export const useAuthStore = create((set): any => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isAuthLoading: true,

  checkingAuth: async () => {
    set({ isAuthLoading: true });

    try {
      const res = await axios.get("http://localhost:9000/api/user/profile", {
        withCredentials: true, // ✅ Send the cookie automatically
      });

      set({ authUser: res.data.user, isAuthLoading: false });
    } catch (error: any) {
      console.log("Auth check failed:", error);
      set({ authUser: null, isAuthLoading: false });
      set({ isAuthLoading: false });
    }
  },

  signUp: async (data: Isignup) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post(
        `http://localhost:9000/api/user/register`,
        data
      );
      set({ authUser: res.data });
      toast.success("Account created successfully");
      window.location.href = "/login";
      //  return res
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: Ilogin) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post(
        `http://localhost:9000/api/user/login`,
        data,
        {
          withCredentials: true,
        }
      );

      const { token, data: user } = res.data;

      // ✅ Save token to localStorage
      localStorage.setItem("token", token);

      // ✅ Set default Authorization header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      set({ authUser: user });
      toast.success("Logged in successfully");
    } catch (error: any) {
      console.error("Error logging in:", error);
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      // Send POST request to logout and clear the cookie
      await axios.post(
        "http://localhost:9000/api/user/logout",
        {},
        {
          withCredentials: true, // Ensures the token cookie is sent
        }
      );
      // also removing token from the token from local storage
      localStorage.removeItem("token");
      // Clear local auth state
      set({ authUser: null });

      toast.success("Logout successful");

      // Optional: redirect to login/home
      
    } catch (error: any) {
      console.error("Error logging out:", error);
      toast.error(
        error?.response?.data?.message || "Error logging out. Please try again."
      );
    }
  },

  
}));
