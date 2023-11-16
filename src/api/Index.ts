import axios from 'axios'
import { BASE_URL } from '../config/Constants'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

instance.interceptors.request.use(
  function (config) {

    return config
  },
  async function (error) {
    return await Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    if (error?.response?.status === 401) {
      return await Promise.reject(error)
    } else {
       return await Promise.reject(error)
    }
  }
)
export default instance