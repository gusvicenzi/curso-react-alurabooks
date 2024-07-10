import { createContext, useContext } from 'react'
import { ICarrinho } from '../../interfaces/ICarrinho'
import {
  useAdicionarItemAoCarrinho,
  useCarrinho,
  useRemoverItemAoCarrinho
} from '../../hooks/graphql/carrinho/hooks'
import { IItemCarrinho } from '../../interfaces/IItemCarrinho'

export interface ICarrinhoContext {
  carrinho?: ICarrinho
  adicionarItemCarrinho: (item: IItemCarrinho) => void
  removerItemCarrinho: (item: IItemCarrinho) => void
  loading: boolean
}

export const CarrinhoContext = createContext<ICarrinhoContext>({
  adicionarItemCarrinho: () => null,
  removerItemCarrinho: () => null,
  loading: false
})

interface CarrinhoProviderProps {
  children: React.ReactNode
}
export const useCarrinhoContext = () =>
  useContext<ICarrinhoContext>(CarrinhoContext)

export const CarrinhoProvider = ({ children }: CarrinhoProviderProps) => {
  const { data, loading: loadingCarrinho } = useCarrinho()

  const [adicionaItem, { loading: loadingAdicionarItem }] =
    useAdicionarItemAoCarrinho()
  const [removeItem, { loading: loadingRemoverItem }] =
    useRemoverItemAoCarrinho()

  const adicionarItemCarrinho = (item: IItemCarrinho) => {
    console.log('[CarrinhoProvider] - adicionarItemCarrinho', item)
    adicionaItem({
      variables: {
        item: {
          livroId: item.livro.id,
          opcaoCompraId: item.opcaoCompra.id,
          quantidade: item.quantidade
        }
      }
    })
  }

  const removerItemCarrinho = (item: IItemCarrinho) => {
    console.log('[CarrinhoProvider] - removerItemCarrinho', item)
    removeItem({
      variables: {
        item: {
          livroId: item.livro.id,
          opcaoCompraId: item.opcaoCompra.id,
          quantidade: item.quantidade
        }
      }
    })
  }

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho: data?.carrinho,
        adicionarItemCarrinho,
        removerItemCarrinho,
        loading: loadingCarrinho || loadingAdicionarItem || loadingRemoverItem
      }}>
      {children}
    </CarrinhoContext.Provider>
  )
}
