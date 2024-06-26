import axios, { AxiosError } from 'axios'
import { useGetToken } from '../hooks/session'
import { history } from '../App'
import { ICategoria } from '../interfaces/ICategoria'
import { ILivro } from '../interfaces/ILivro'
import { IAutor } from '../interfaces/IAutor'

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

export const getLivrosPorCategoria = async (categoria: ICategoria) => {
  try {
    const { data } = await httpBackend.get<ILivro[]>('livros', {
      params: { categoria: categoria.id }
    })
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAutor = async (id: number) => {
  try {
    const { data } = await httpBackend.get<IAutor>(`/autores/${id}`)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getLivro = async (slug: string) => {
  try {
    const { data } = await httpBackend.get<ILivro[]>('/livros', {
      params: { slug }
    })

    if (data.length === 0) return null

    return data[0]
  } catch (error) {
    console.log(error)
    throw error
  }
}
