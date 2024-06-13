import './ListaLivros.css'
import { ICategoria } from '../../interfaces/ICategoria'
import { CardLivro } from '../CardLivro'
import { Loader } from '../Loader'
import { AbCampoTexto } from 'ds-alurabooks'
import { useEffect, useState } from 'react'
import { useLivros } from '../../hooks/graphql/livros/hooks'
import { useReactiveVar } from '@apollo/client'
import { filtroLivrosVar, livrosVar } from '../../hooks/graphql/livros/state'

interface ListaLivrosProps {
  categoria: ICategoria
}

export const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const [textoParaBusca, setTextoParaBusca] = useState('')

  useEffect(() => {
    filtroLivrosVar({
      ...filtroLivrosVar(),
      titulo: textoParaBusca.length >= 3 ? textoParaBusca : ''
    })
  }, [textoParaBusca])

  filtroLivrosVar({
    ...filtroLivrosVar(),
    categoria
  })

  const livros = useReactiveVar(livrosVar)

  const { loading: isLoadingLivrosDaCategoria } = useLivros()

  return (
    <section>
      <form className='form-busca-livro'>
        <AbCampoTexto
          value={textoParaBusca}
          onChange={setTextoParaBusca}
          placeholder='Digite o título'
        />
      </form>
      {isLoadingLivrosDaCategoria && <Loader />}
      {!livros?.length && !isLoadingLivrosDaCategoria && (
        <h1>Nenhum livro encontrado</h1>
      )}
      <div className='lista-livros'>
        {livros?.map(livro => (
          <CardLivro key={`cardLivro-${livro.id}`} livro={livro} />
        ))}
      </div>
    </section>
  )
}
