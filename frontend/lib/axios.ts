// API Configuration for Axios
import axios from "axios";

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
});

export default apiClient;
