import api from "../config/api"
import { API_URL } from "../config/constants"

const ENDPOINT = "preferences";

export const getPreferences = async () => {
    try {
        const response = await api.get(`${API_URL }/${ENDPOINT}`);
        if(response.status === 200) {
            return response.data.preference
        }
    } catch (error) {
        console.log(error)
    }
}

export const setPreferences = async (data) => {
    try {
        const response = await api.post(`${API_URL }/${ENDPOINT}`, data);
        if(response.status === 200) {
            return response.data.preference
        }
    } catch (error) {
        console.log(error)
    }
}