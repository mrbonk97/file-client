"use client";
import axios from "axios";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
