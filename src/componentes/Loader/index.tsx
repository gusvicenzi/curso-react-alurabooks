import './Loader.css'

interface Props {
  color?: string
}

export const Loader = ({ color }: Props) => {
  return (
    <div className='loader-container'>
      <div className='lds-ellipsis' style={{ color }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
