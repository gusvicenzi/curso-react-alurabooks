import './ListaLivros.css'
import { useQuery } from '@tanstack/react-query'
import { ICategoria } from '../../interfaces/ICategoria'
import { getLivrosPorCategoria } from '../../http'
import { CardLivro } from '../CardLivro'
import { Loader } from '../Loader'

interface ListaLivrosProps {
  categoria: ICategoria
}

export const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const { data: livrosDaCategoria, isLoading: isLoadingLivrosDaCategoria } =
    useQuery({
      queryKey: ['livrosCategoria', categoria],
      queryFn: () => {
        if (categoria) return getLivrosPorCategoria(categoria)
        throw new Error('Nenhuma categoria')
      }
    })

  if (!livrosDaCategoria?.length && isLoadingLivrosDaCategoria)
    return <Loader />

  return (
    <section className='lista-livros'>
      {livrosDaCategoria?.map(livro => (
        <CardLivro key={`cardLivro-${livro.id}`} livro={livro} />
      ))}
    </section>
  )
}
