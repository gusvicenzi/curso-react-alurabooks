import { TituloPrincipal } from '../../componentes/TituloPrincipal'
import { getCategoria } from '../../http'
import { useParams } from 'react-router-dom'
import { Loader } from '../../componentes/Loader'
import { useQuery } from '@tanstack/react-query'
import { ListaLivros } from '../../componentes/ListaLivros'

export const Categoria = () => {
  const params = useParams()

  const { data: categoria, isLoading } = useQuery({
    queryKey: ['categoriaPorSlug', params.slug],
    queryFn: () => {
      if (params.slug) return getCategoria(params.slug)
      throw new Error('Nenhum slug')
    }
  })

  if (isLoading && !categoria) return <Loader />

  return (
    <section>
      {categoria?.nome && (
        <>
          <TituloPrincipal texto={categoria.nome} />
          <ListaLivros categoria={categoria} />
        </>
      )}
    </section>
  )
}
