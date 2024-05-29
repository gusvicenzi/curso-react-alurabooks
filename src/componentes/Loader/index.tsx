import './Loader.css'

export const Loader = () => {
  return (
    <div className='loader-container'>
      <div className='lds-ellipsis'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
