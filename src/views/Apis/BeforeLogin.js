import axios from 'axios'

const environment = 'local' // Change to 'local' if needed

const BASE_URL =
  environment === 'local'
    ? 'https://asoft.click/api/incometax-service/'
    : 'http://localhost:8686/api/incometax-service/'


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})


const getToken = () => {
  return localStorage.getItem('token') || null
}

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})


export const loginUser = async (email, password) => {
const data = {"email":email,"password":password}
console.log("Login Data:", data)
  try {
    const response = await api({
      method: 'POST',
      url: 'auth/userEmailPassword',
      data,
    });
    return response.data
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message)
  }
}
