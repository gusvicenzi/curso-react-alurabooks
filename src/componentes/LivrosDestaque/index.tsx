import { AbBotao, AbCard } from 'ds-alurabooks'
import { useEffect, useState } from 'react'
import { ILivro } from '../../interfaces/ILivro'

import './LivrosDestaque.css'
import { currencyFormat } from '../../utils/currencyFormat'
import { Loader } from '../Loader'
import { minPriceLivro } from '../../utils/minPriceLivro'

interface LivrosDestaqueProps {
  livros: ILivro[]
}

const LivrosDestaque = ({ livros }: LivrosDestaqueProps) => {
  const [livroSelecionado, setLivroSelecionado] = useState<ILivro>()

  useEffect(() => {
    if (livros?.length) setLivroSelecionado(livros[0])
  }, [livros])

  return (
    <section className='LivrosDestaque'>
      {livros?.length ? (
        <div>
          <ul className='livros'>
            {livros?.map(livro => {
              return (
                <li
                  key={livro.titulo}
                  onClick={() => setLivroSelecionado(livro)}
                  className={
                    livroSelecionado?.titulo === livro.titulo
                      ? 'selecionado'
                      : ''
                  }>
                  <img
                    src={livro.imagemCapa}
                    alt={`Capa do livro ${livro.titulo} escrito por ${livro.autor}`}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <Loader />
      )}
      {livroSelecionado && (
        <AbCard>
          <div className='selecionado-detalhes'>
            <header>
              <h5>Sobre o livro:</h5>
            </header>
            <h6>{livroSelecionado.titulo}</h6>
            <p>{livroSelecionado.descricao}</p>
            <p>Por: {livroSelecionado.autor.nome}</p>
            <footer>
              <div className='preco'>
                <em>A partir de:</em>
                <strong>
                  {currencyFormat(minPriceLivro(livroSelecionado.opcoesCompra))}
                </strong>
              </div>
              <div>
                <AbBotao texto='Comprar' />
              </div>
            </footer>
          </div>
        </AbCard>
      )}
    </section>
  )
}

export default LivrosDestaque
