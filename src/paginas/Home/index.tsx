import { AbCampoTexto } from 'ds-alurabooks'
import { useState } from 'react'
import Banner from '../../componentes/Banner'
import LivrosDestaque from '../../componentes/LivrosDestaque'
import Newsletter from '../../componentes/Newsletter'
import TagsCategorias from '../../componentes/TagsCategorias'
import Titulo from '../../componentes/Titulo'

import './Home.css'
import { gql, useQuery } from '@apollo/client'
import { ILivro } from '../../interfaces/ILivro'
// import { useQuery } from '@tanstack/react-query'
// import { getLivrosDestaque } from '../../http'

const GET_DESTAQUES = gql`
  query GetDestaques {
    destaques {
      lancamentos {
        id
        titulo
        slug
        descricao
        imagemCapa
        autor {
          id
          nome
        }
        opcoesCompra {
          id
          preco
        }
      }
      maisVendidos {
        id
        titulo
        slug
        descricao
        imagemCapa
        autor {
          id
          nome
        }
        opcoesCompra {
          id
          preco
        }
      }
    }
  }
`

const Home = () => {
  const [busca, setBusca] = useState('')

  // const { data: lancamentos } = useQuery({
  //   queryKey: ['lancamentos'],
  //   queryFn: () => getLivrosDestaque('lancamentos')
  // })

  // const { data: maisVendidos } = useQuery({
  //   queryKey: ['maisVendidos'],
  //   queryFn: () => getLivrosDestaque('mais-vendidos')
  // })

  const { data } = useQuery<{
    destaques: {
      lancamentos: ILivro[]
      maisVendidos: ILivro[]
    }
  }>(GET_DESTAQUES)

  return (
    <section className='home'>
      <Banner
        subtitulo='Encontre em nossa estante o que precisa para seu desenvolvimento!'
        titulo='Já sabe por onde começar?'>
        <form className='buscar'>
          <AbCampoTexto
            placeholder='Qual será sua próxima leitura?'
            value={busca}
            onChange={setBusca}
            darkmode={true}
            placeholderAlign='center'
          />
        </form>
      </Banner>
      <Titulo texto='ÚLTIMOS LANÇAMENTOS' />
      <LivrosDestaque livros={data?.destaques.lancamentos ?? []} />
      <Titulo texto='MAIS VENDIDOS' />
      <LivrosDestaque livros={data?.destaques.maisVendidos ?? []} />
      <TagsCategorias />
      <Newsletter />
    </section>
  )
}

export default Home
