import { useParams } from 'react-router-dom'
import { Loader } from '../../componentes/Loader'
import { useQuery } from '@tanstack/react-query'
import { getLivro } from '../../http'
import {
  AbBotao,
  AbGrupoOpcoes,
  AbInputQuantidade,
  AbGrupoOpcao
} from 'ds-alurabooks'
import { currencyFormat } from '../../utils/currencyFormat'
import { TituloPrincipal } from '../../componentes/TituloPrincipal'
import './Livro.css'
import { useState } from 'react'
import { ILivro } from '../../interfaces/ILivro'
import { AxiosError } from 'axios'
import { SobreAutor } from '../../componentes/SobreAutor'
import { BlocoSobre } from '../../componentes/BlocoSobre'

export const Livro = () => {
  const params = useParams()

  const [opcaoSelecionada, setOpcaoSelecionada] = useState<AbGrupoOpcao>()

  const {
    data: livro,
    isLoading,
    error
  } = useQuery<ILivro | null, AxiosError>({
    queryKey: ['livroPorSlug', params.slug],
    queryFn: () => {
      if (params.slug) return getLivro(params.slug)
      throw new Error('Nenhum slug')
    },
    retry: 2
  })

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
                <p>Por: {livro.autor}</p>
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
                    <AbInputQuantidade />
                  </div>
                  <div>
                    <AbBotao texto='Comprar' />
                  </div>
                </footer>
              </div>
            </div>
            <div>
              {livro && <SobreAutor autorId={livro.autor} />}
              <BlocoSobre titulo='Sobre o Livro' corpo={livro?.sobre} />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
