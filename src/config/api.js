import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL, DEV_API_URL } from "./constants";

const api = axios.create({
    baseURL: DEV_API_URL,
    timeout: 6000
})

api.interceptors.request.use(async (config) => {
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTRjN2JkYTQ0YmMzMjUwMjgxMjkzZCIsImlhdCI6MTY4OTgwMzM4MSwiZXhwIjoxNjk3NTc5MzgxfQ.4eKB3rQQPWxbhNJE_8f_2oK11Q19lqnwzmNzFa6YyM8';
	
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