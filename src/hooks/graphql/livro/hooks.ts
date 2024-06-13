import { gql, useQuery } from '@apollo/client'
import { ILivro } from '../../../interfaces/ILivro'

const GET_LIVRO = gql`
  query GetLivro($slug: String!) {
    livro(slug: $slug) {
      id
      slug
      imagemCapa
      titulo
      descricao
      sobre
      autor {
        id
        nome
        sobre
      }
      opcoesCompra {
        id
        preco
        formatos
      }
    }
  }
`

export const useLivro = (slug: string) => {
  return useQuery<{
    livro: ILivro
  }>(GET_LIVRO, {
    variables: { slug }
  })
}
