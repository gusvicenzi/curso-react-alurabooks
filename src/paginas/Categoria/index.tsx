import { useEffect, useState } from 'react'
import { TituloPrincipal } from '../../componentes/TituloPrincipal'
import { ICategoria } from '../../interfaces/ICategoria'
import { httpBackend } from '../../http'
import { useParams } from 'react-router-dom'
import { Loader } from '../../componentes/Loader'

export const Categoria = () => {
  const [categoria, setCategoria] = useState<ICategoria>()
  const [isLoading, setIsLoading] = useState(true)

  const params = useParams()

  const getCategoria = async (slug: string) => {
    setIsLoading(true)
    try {
      const { data } = await httpBackend.get<ICategoria[]>('/categorias', {
        params: { slug }
      })
      setCategoria(data[0])
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (params?.slug) getCategoria(params.slug)
  }, [params.slug])

  if (isLoading) return <Loader />

  return (
    <section>
      {categoria?.nome && <TituloPrincipal texto={categoria?.nome ?? ''} />}
    </section>
  )
}
