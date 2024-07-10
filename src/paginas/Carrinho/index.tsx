import { AbBotao } from 'ds-alurabooks'
import { Link } from 'react-router-dom'
import { TituloPrincipal } from '../../componentes/TituloPrincipal'
import { currencyFormat } from '../../utils/currencyFormat'

import './Carrinho.css'
import ItemCarrinho from '../../componentes/ItemCarrinho'
import { useCarrinhoContext } from '../../context/carrinho'
import { LoadingCarrinho } from '../../componentes/LoadingCarrinho'

export const Carrinho = () => {
  const { carrinho, loading } = useCarrinhoContext()

  return (
    <section className='pagina-carrinho'>
      {loading && <LoadingCarrinho />}
      <TituloPrincipal texto='Minha sacola' />
      <div className='conteudo'>
        <h4>Itens selecionados</h4>
        <div className='itens'>
          {carrinho?.itens.map((item: any, index: any) => (
            <ItemCarrinho key={index} item={item} />
          ))}
        </div>
        <div>
          <Link to='/'>Continuar comprando</Link>
        </div>
        <footer>
          <ul>
            <li>Total da compra</li>
            <li>
              <strong>{currencyFormat(carrinho?.total || 0)}</strong>
            </li>
            <li>
              <AbBotao texto='Finalizar compra' />
            </li>
          </ul>
        </footer>
      </div>
    </section>
  )
}
