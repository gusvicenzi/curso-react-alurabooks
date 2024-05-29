import './TituloPrincipal.css'

interface TituloPrincipalProps {
  texto: string
}

export const TituloPrincipal = ({ texto }: TituloPrincipalProps) => {
  return <h1 className='TituloPrincipal'>{texto}</h1>
}
