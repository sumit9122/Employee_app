import axios from 'axios';
const BASE_URL = "http://65.2.132.88:7070/admin";

export const postAPIData = (endpoint, payload, token) => {
    return axios.post(`${BASE_URL}${endpoint}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getAPIData = (endpoint, token) => {
    return axios.get(`${BASE_URL}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

