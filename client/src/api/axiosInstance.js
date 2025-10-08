import axios from "axios";

// 1. Get the base URL from the Vite environment variables
// Note: This assumes you have VITE_API_URL=http://localhost:5000/api in your client/.env file.
const BASE_URL = import.meta.env.VITE_API_URL; 

// 2. Define a constant for the session storage key
// Best practice to avoid typos across files.
const ACCESS_TOKEN_KEY = "accessToken"; 

const axiosInstance = axios.create({
  baseURL: BASE_URL, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    // 3. Use the constant key for storage access
    const accessToken = JSON.parse(sessionStorage.getItem(ACCESS_TOKEN_KEY)) || "";

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;