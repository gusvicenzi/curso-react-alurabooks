import { useParams } from 'react-router-dom'
import { Loader } from '../../componentes/Loader'
import {
  AbBotao,
  AbGrupoOpcoes,
  AbInputQuantidade,
  AbGrupoOpcao,
  AbTag
} from 'ds-alurabooks'
import { currencyFormat } from '../../utils/currencyFormat'
import { TituloPrincipal } from '../../componentes/TituloPrincipal'
import './Livro.css'
import { useState } from 'react'
import { BlocoSobre } from '../../componentes/BlocoSobre'
import { useLivro } from '../../hooks/graphql/livro/hooks'

export const Livro = () => {
  const params = useParams()

  const [quantidade, setQuantidade] = useState<number>(1)
  const [_opcaoSelecionada, setOpcaoSelecionada] = useState<AbGrupoOpcao>()

  const { data, loading: isLoading, error } = useLivro(params.slug ?? '')

  const livro = data?.livro

  if (isLoading && !livro) return <Loader />

  if (error) {
    console.log(error.message)
    return <h1>Ops! Algum erro inesperado aconteceu</h1>
  }

  if (livro === null) {
    return <h1>Livro não encontrado!</h1>
  }

  const opcoes: AbGrupoOpcao[] = livro
    ? livro?.opcoesCompra.map(opt => ({
        ...opt,
        corpo: currencyFormat(opt.preco),
        rodape: opt.formatos?.toString() || ''
      }))
    : []

  return (
    <>
      {livro && (
        <section className='livro-info'>
          <TituloPrincipal texto='Detalhes do Livro' />
          <div>
            <div className='container'>
              <figure>
                <img src={livro.imagemCapa} alt={livro.descricao} />
              </figure>
              <div className='detalhes'>
                <h2>{livro.titulo}</h2>
                <p>{livro.descricao}</p>
                <p>Por: {livro.autor.nome}</p>
                <h3>Selecione o formato do seu livro:</h3>
                <div className='opcoes'>
                  <AbGrupoOpcoes
                    valorPadrao={opcoes[0]}
                    opcoes={opcoes}
                    onChange={setOpcaoSelecionada}
                  />
                </div>
                <p>
                  <strong>
                    *Você terá acesso às futuras atualizações do livro.
                  </strong>
                </p>
                <footer>
                  <div className='qtdContainer'>
                    <AbInputQuantidade
                      value={quantidade}
                      onChange={setQuantidade}
                    />
                  </div>
                  <div>
                    <AbBotao texto='Comprar' />
                  </div>
                </footer>
              </div>
            </div>
            <div>
              <BlocoSobre titulo='Sobre o Autor' corpo={livro.autor.sobre} />
              <BlocoSobre titulo='Sobre o Livro' corpo={livro.sobre} />
            </div>
            <div className='tags'>
              {data.livro.tags?.map(tag => (
                <AbTag contexto='secundario' texto={tag.nome} key={tag.id} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
