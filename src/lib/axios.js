import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  withCredentials: true,
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network level failure or timeout gracefully
    if (!error.response) {
      console.error("[API Network Error]", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
