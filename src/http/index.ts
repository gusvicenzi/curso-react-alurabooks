import axios, { AxiosError } from 'axios'
import { useGetToken } from '../hooks/session'
import { history } from '../App'
import { ICategoria } from '../interfaces/ICategoria'
import { ILivro } from '../interfaces/ILivro'

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

export const getCategorias = async () => {
  const { data } = await httpBackend.get<ICategoria[]>('categorias')
  return data
}

export const getCategoria = async (slug: string) => {
  try {
    const { data } = await httpBackend.get<ICategoria[]>('/categorias', {
      params: { slug }
    })
    return data[0]
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getLivrosDestaque = async (
  list: 'lancamentos' | 'mais-vendidos'
) => {
  const { data } = await httpBackend.get<ILivro[]>(`public/${list}`)
  return data
}
