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
// export const useCarrinho = (slug: string) => {
//   return useQuery<{
//     livro: ILivro
//   }>(GET_LIVRO, {
//     variables: { slug }
//   })
// }
