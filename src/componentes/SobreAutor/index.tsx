import { useQuery } from '@tanstack/react-query'
import { getAutor } from '../../http'
import { BlocoSobre } from '../BlocoSobre'

interface SobreAutorProps {
  autorId: number
}

export const SobreAutor = ({ autorId }: SobreAutorProps) => {
  const { data: autor } = useQuery({
    queryKey: ['autor', autorId],
    queryFn: () => {
      if (autorId) return getAutor(autorId)
      throw new Error('Nenhum slug')
    },

    retry: 2
  })

  return <BlocoSobre titulo='Sobre o Autor' corpo={autor?.sobre} />
}
