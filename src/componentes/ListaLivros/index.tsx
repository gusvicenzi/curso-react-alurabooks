import './ListaLivros.css'
// import { useQuery } from '@tanstack/react-query'
import { ICategoria } from '../../interfaces/ICategoria'
import { CardLivro } from '../CardLivro'
import { Loader } from '../Loader'
import { gql, useQuery } from '@apollo/client'
import { ILivro } from '../../interfaces/ILivro'
import { AbBotao, AbCampoTexto } from 'ds-alurabooks'
import { FormEvent, useState } from 'react'

interface ListaLivrosProps {
  categoria: ICategoria
}

const GET_LIVROS = gql`
  query GetLivro($categoriaId: Int, $titulo: String) {
    livros(categoriaId: $categoriaId, titulo: $titulo) {
      id
      slug
      imagemCapa
      titulo
      descricao
      opcoesCompra {
        id
        preco
      }
    }
  }
`

export const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  // const { data: livrosDaCategoria, isLoading: isLoadingLivrosDaCategoria } =
  //   useQuery({
  //     queryKey: ['livrosCategoria', categoria],
  //     queryFn: () => {
  //       if (categoria) return getLivrosPorCategoria(categoria)
  //       throw new Error('Nenhuma categoria')
  //     }
  //   })
  const [textoParaBusca, setTextoParaBusca] = useState('')

  const {
    data,
    loading: isLoadingLivrosDaCategoria,
    refetch
  } = useQuery<{
    livros: ILivro[]
  }>(GET_LIVROS, { variables: { categoriaId: categoria.id } })

  const livrosDaCategoria = data?.livros

  if (!livrosDaCategoria?.length && isLoadingLivrosDaCategoria)
    return <Loader />

  const buscarLivros = (ev: FormEvent) => {
    ev.preventDefault()

    if (textoParaBusca) {
      refetch({ categoriaId: categoria.id, titulo: textoParaBusca })
    }
  }

  return (
    <section>
      <form onSubmit={buscarLivros} className='form-busca-livro'>
        <AbCampoTexto
          value={textoParaBusca}
          onChange={setTextoParaBusca}
          placeholder='Digite o título'
        />
        <div>
          <AbBotao texto='Buscar' />
        </div>
      </form>
      <div className='lista-livros'>
        {livrosDaCategoria?.map(livro => (
          <CardLivro key={`cardLivro-${livro.id}`} livro={livro} />
        ))}
      </div>
    </section>
  )
}
