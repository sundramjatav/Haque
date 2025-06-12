import axios from 'axios';
import logo from '../assets/Fundzy logo white-03.png'
import logo1 from '../assets/yemeko-logo.jpg'
import { store } from '../Redux/store';

export const MainContent = {
  AppName: "Fundzy",
  AppLogo: logo,
  appFavicon: logo,
}
export const backendConfig = {
  base: "http://192.168.1.15:5000/api",
  origin: "http://192.168.1.15:5000", 

  // base: "http://192.168.48.236:5000/api",
  // origin: "http://192.168.48.236:5000", 

  // base: "https://yumeko.api.smartchainstudio.in/api",
  // origin: "https://yumeko.api.smartchainstudio.in/",
};

export const Axios = axios.create({
  baseURL: backendConfig.base,
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state?.auth?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);