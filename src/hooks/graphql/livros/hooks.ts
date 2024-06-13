import { gql, useQuery, useReactiveVar } from '@apollo/client'
import { ILivro } from '../../../interfaces/ILivro'
import { filtroLivrosVar, livrosVar } from './state'

const GET_LIVROS = gql`
  query GetLivroPorCategoria($categoriaId: Int, $titulo: String) {
    livros(categoriaId: $categoriaId, titulo: $titulo) {
      id
      slug
      imagemCapa
      titulo
      descricao
      opcoesCompra {
        id
        preco
      }
    }
  }
`

export const useLivros = () => {
  const filtro = useReactiveVar(filtroLivrosVar)

  return useQuery<{
    livros: ILivro[]
  }>(GET_LIVROS, {
    variables: { categoriaId: filtro.categoria?.id, titulo: filtro.titulo },
    onCompleted: data => {
      if (data?.livros) livrosVar(data?.livros)
    }
  })
}
