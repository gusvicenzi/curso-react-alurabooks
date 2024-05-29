import axios, { AxiosError } from 'axios'
import { useGetToken } from '../hooks/session'
import { history } from '../App'

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

httpBackend.interceptors.response.use(
  res => {
    return res
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      history.push('/')
    }
    return Promise.reject(error)
  }
)
