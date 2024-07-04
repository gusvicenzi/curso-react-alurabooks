import { AbBotao } from 'ds-alurabooks'
import { Link } from 'react-router-dom'
import { TituloPrincipal } from '../../componentes/TituloPrincipal'
import { useCarrinho } from '../../hooks/graphql/carrinho/hooks'
import { currencyFormat } from '../../utils/currencyFormat'

import './Carrinho.css'
import ItemCarrinho from '../../componentes/ItemCarrinho'

export const Carrinho = () => {
  const { data } = useCarrinho()

  return (
    <section className='pagina-carrinho'>
      <TituloPrincipal texto='Minha sacola' />
      <div className='conteudo'>
        <h4>Itens selecionados</h4>
        <div className='itens'>
          {data?.carrinho?.itens.map((item: any, index: any) => (
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
              <strong>{currencyFormat(data?.carrinho?.total || 0)}</strong>
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
