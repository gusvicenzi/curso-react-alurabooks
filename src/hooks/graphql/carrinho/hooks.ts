import { gql, useMutation, useQuery } from '@apollo/client'

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
          id
          preco
        }
        quantidade
      }
    }
  }
`

const ADICIONAR_ITEM = gql`
  mutation AdicionarItem($item: ItemCarrinhoInput!) {
    adicionarItem(item: $item)
  }
`
const RREMOVER_ITEM = gql`
  mutation RemoverItem($item: ItemCarrinhoInput!) {
    removerItem(item: $item)
  }
`
export const useCarrinho = () => {
  return useQuery(GET_CARRINHO)
}

export const useAdicionarItemAoCarrinho = () => {
  return useMutation(ADICIONAR_ITEM, {
    refetchQueries: [{ query: GET_CARRINHO }]
  })
}

export const useRemoverItemAoCarrinho = () => {
  return useMutation(RREMOVER_ITEM, {
    refetchQueries: [{ query: GET_CARRINHO }]
  })
}
