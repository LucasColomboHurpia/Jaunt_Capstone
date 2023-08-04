import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL, DEV_API_URL } from "./constants";

const api = axios.create({
    baseURL: API_URL,
    timeout: 6000
})

api.interceptors.request.use(async (config) => {
	const token = await AsyncStorage.getItem('auth_token');
	
  if (token) {
    config.headers['authorization'] = `Bearer ${token}`
  }

  return config
}, error => {
	// Do something with request error here
	// notification.error({
	// 	message: 'Error'
	// })
  Promise.reject(error)
})

export default api