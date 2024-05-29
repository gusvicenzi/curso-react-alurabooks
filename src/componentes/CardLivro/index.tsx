import './CardLivro.css'
import { Link } from 'react-router-dom'
import { ILivro } from '../../interfaces/ILivro'
import { currencyFormat } from '../../utils/currencyFormat'
import { minPriceLivro } from '../../utils/minPriceLivro'
import { AbBotao } from 'ds-alurabooks'

export const CardLivro = ({ livro }: { livro: ILivro }) => {
  return (
    <div className='livro' key={livro.id}>
      <img src={livro.imagemCapa} alt={livro.descricao} />
      <ul>
        <li>
          <strong>{livro.titulo}</strong>
        </li>
        <li>
          A partir de:{' '}
          <strong>{currencyFormat(minPriceLivro(livro.opcoesCompra))}</strong>
        </li>
        <li className='link-container'>
          <Link to={`/livro/${livro.slug}`}>
            <AbBotao texto='Comprar' />
          </Link>
        </li>
      </ul>
    </div>
  )
}
