import { Link, useNavigate } from 'react-router-dom'
import BotaoNavegacao from '../BotaoNavegacao'
import ModalCadastroUsuario from '../ModalCadastroUsuario'
import ModalLoginUsuario from '../ModalLoginUsuario'
import logo from './assets/logo.png'
import usuario from './assets/usuario.svg'
import './BarraNavegacao.css'
import { useEffect, useState } from 'react'
import { useClearToken, useGetToken } from '../../hooks/session'
// import { getCategorias } from '../../http'
// import { useQuery } from '@tanstack/react-query'
import { Loader } from '../Loader'
import { gql, useQuery } from '@apollo/client'
import { ICategoria } from '../../interfaces/ICategoria'

const GET_CATEGORIAS = gql`
  query GetCategorias {
    categorias {
      id
      slug
      nome
    }
  }
`

const BarraNavegacao = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  const [isSignInModalOpened, setSignInIsModalOpened] = useState(false)
  const [isSignUpModalOpened, setSignUpIsModalOpened] = useState(false)

  const navigate = useNavigate()
  const token = useGetToken()
  const clearToken = useClearToken

  const { data, loading: isLoading } = useQuery<{
    categorias: ICategoria[]
  }>(GET_CATEGORIAS)

  useEffect(() => {
    setIsUserLoggedIn(!!token)
  }, [token])

  const handleLogout = () => {
    setIsUserLoggedIn(false)
    clearToken()
    navigate('/')
  }

  // const { data: categorias, isLoading } = useQuery({
  //   queryKey: ['categorias'],
  //   queryFn: getCategorias
  // })
  const categorias = data?.categorias

  const LoggedInActions = (
    <>
      <li>
        <Link to='/minha-conta/pedidos'>Minha conta</Link>
      </li>
      <li>
        <BotaoNavegacao
          texto='Logout'
          textoAltSrc='Botão de logout'
          imagemSrc={usuario}
          onClick={handleLogout}
        />
      </li>
    </>
  )

  const NotLoggedInActions = (
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
  )

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
            {categorias?.map(({ id, nome, slug }) => (
              <li key={`cat-${id}`}>
                <Link to={`/categorias/${slug}`}>{nome}</Link>
              </li>
            ))}
            {!categorias && isLoading && <Loader color='#002f52' />}
          </ul>
        </li>
      </ul>
      <ul className='acoes'>
        {isUserLoggedIn ? LoggedInActions : NotLoggedInActions}
      </ul>
    </nav>
  )
}

export default BarraNavegacao
