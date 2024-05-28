import { Link } from 'react-router-dom'
import BotaoNavegacao from '../BotaoNavegacao'
import ModalCadastroUsuario from '../ModalCadastroUsuario'
import ModalLoginUsuario from '../ModalLoginUsuario'
import logo from './assets/logo.png'
import usuario from './assets/usuario.svg'
import './BarraNavegacao.css'
import { useEffect, useState } from 'react'
import { useGetToken } from '../../hooks/session'

const BarraNavegacao = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  const [isSignInModalOpened, setSignInIsModalOpened] = useState(false)
  const [isSignUpModalOpened, setSignUpIsModalOpened] = useState(false)

  const token = useGetToken()

  useEffect(() => {
    setIsUserLoggedIn(!!token)
  }, [token])

  return (
    <nav className='ab-navbar'>
      <h1 className='logo'>
        <Link to='/'>
          <img className='logo' src={logo} alt='Logo da AluraBooks' />
        </Link>
      </h1>
      <ul className='navegacao'>
        <li>
          <a href='#!'>Categorias</a>
          <ul className='submenu'>
            <li>
              <Link to='/'>Frontend</Link>
            </li>
            <li>
              <Link to='/'>Programação</Link>
            </li>
            <li>
              <Link to='/'>Infraestrutura</Link>
            </li>
            <li>
              <Link to='/'>Business</Link>
            </li>
            <li>
              <Link to='/'>Design e UX</Link>
            </li>
          </ul>
        </li>
      </ul>
      <ul className='acoes'>
        {!isUserLoggedIn && (
          <>
            <li>
              <BotaoNavegacao
                texto='Login'
                textoAltSrc='Icone representando um usuário'
                imagemSrc={usuario}
                onClick={() => setSignInIsModalOpened(true)}
              />
              <ModalLoginUsuario
                isOpen={isSignInModalOpened}
                onClose={() => setSignInIsModalOpened(false)}
                onLogin={() => {
                  setSignInIsModalOpened(false)
                  setIsUserLoggedIn(true)
                }}
              />
            </li>
            <li>
              <BotaoNavegacao
                texto='Cadastrar-se'
                textoAltSrc='Icone representando um usuário'
                imagemSrc={usuario}
                onClick={() => setSignUpIsModalOpened(true)}
              />
              <ModalCadastroUsuario
                isOpen={isSignUpModalOpened}
                onClose={() => setSignUpIsModalOpened(false)}
              />
            </li>
          </>
        )}
        {isUserLoggedIn && (
          <>
            <Link to='/minha-conta/pedidos'>Minha conta</Link>
          </>
        )}
      </ul>
    </nav>
  )
}

export default BarraNavegacao
