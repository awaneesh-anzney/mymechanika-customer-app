import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 👈 NestJS backend
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
