import { gql, useQuery } from '@apollo/client'

const GET_CARRINHO = gql`
  query GetCarrinho {
    carrinho {
      total
      itens {
        livro {
          id
          slug
          titulo
          imagemCapa
          autor {
            nome
          }
        }
        opcaoCompra {
          preco
        }
        quantidade
      }
    }
  }
`
export const useCarrinho = () => {
  return useQuery(GET_CARRINHO)
}
