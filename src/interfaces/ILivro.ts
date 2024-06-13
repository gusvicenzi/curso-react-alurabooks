import { IAutor } from './IAutor'
import { IOpcaoCompra } from './IOpcaoCompra'

export interface ILivro {
  id: number
  categoria: number
  titulo: string
  slug: string
  descricao: string
  isbn: string
  numeroPaginas: number
  publicacao: string
  imagemCapa: string
  autor: IAutor
  autorId: number
  opcoesCompra: IOpcaoCompra[]
  sobre: string
}
