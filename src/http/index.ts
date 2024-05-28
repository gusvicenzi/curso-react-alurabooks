import axios from 'axios'
import { useGetToken } from '../hooks/session'

export const httpBackend = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

httpBackend.interceptors.request.use(
  cfg => {
    const token = useGetToken()
    if (token && cfg.headers) {
      cfg.headers.Authorization = `Bearer ${token}`
    }
    return cfg
  },
  error => {
    return Promise.reject(error)
  }
)
