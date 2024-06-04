import { useParams } from 'react-router-dom'
import { Loader } from '../../componentes/Loader'
import { useQuery } from '@tanstack/react-query'
import { getLivro } from '../../http'
import { AbBotao, AbGrupoOpcoes, AbInputQuantidade } from 'ds-alurabooks'
import { currencyFormat } from '../../utils/currencyFormat'
import { TituloPrincipal } from '../../componentes/TituloPrincipal'
import './Livro.css'

export const Livro = () => {
  const params = useParams()

  const { data: livro, isLoading } = useQuery({
    queryKey: ['livroPorSlug', params.slug],
    queryFn: () => {
      if (params.slug) return getLivro(params.slug)
      throw new Error('Nenhum slug')
    }
  })

  if (isLoading && !livro) return <Loader />

  return (
    <>
      {livro && (
        <section className='livro'>
          <TituloPrincipal texto='Detalhes do Livro' />
          <div>
            <div className='container'>
              <figure>
                <img src={livro.imagemCapa} alt={livro.descricao} />
              </figure>
              <div className='detalhes'>
                <h2>{livro.titulo}</h2>
                <p>{livro.descricao}</p>
                <p>Por: {livro.autor}</p>
                <h3>Selecione o formato do seu livro:</h3>
                <div className='opcoes'>
                  <AbGrupoOpcoes
                    opcoes={livro.opcoesCompra.map(opt => ({
                      ...opt,
                      corpo: currencyFormat(opt.preco),
                      rodape: opt.formatos?.toString() || ''
                    }))}
                  />
                </div>
                <p>
                  <strong>
                    *Você terá acesso às futuras atualizações do livro.
                  </strong>
                </p>
                <footer>
                  <div className='qtdContainer'>
                    <AbInputQuantidade />
                  </div>
                  <div>
                    <AbBotao texto='Comprar' />
                  </div>
                </footer>
              </div>
            </div>
            {/* <div>
              {livro && <SobreAutor autorId={livro.autor} />}
              <BlocoSobre titulo='Sobre o Livro' corpo={livro?.sobre} />
            </div> */}
          </div>
        </section>
      )}
    </>
  )
}
