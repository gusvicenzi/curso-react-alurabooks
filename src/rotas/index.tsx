import { Route, Routes } from 'react-router-dom'
import Home from '../paginas/Home'
import PaginaBase from '../paginas/PaginaBase'
import AreaLogada from '../paginas/AreaLogada'

const Rotas = () => {
  return (
    <Routes>
      <Route path='/' element={<PaginaBase />}>
        <Route path='/' element={<Home />} />
      </Route>
      <Route path='/minha-conta' element={<AreaLogada />}>
        <Route path='pedidos' element={<PaginaBase />} />
      </Route>
    </Routes>
  )
}

export default Rotas
