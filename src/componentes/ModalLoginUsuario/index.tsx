import { AbBotao, AbCampoTexto, AbModal } from 'ds-alurabooks'
import { useState } from 'react'

import imagemPrincipal from './assets/login.png'

import './ModalLoginUsuario.css'
import { isAxiosError } from 'axios'
import { ILoginResponse } from '../../interfaces/IUserSession'
import { useSaveToken } from '../../hooks/session'
import { httpBackend } from '../../http'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}
const ModalCadastroUsuario = ({ onClose, isOpen, onLogin }: ModalProps) => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const saveToken = useSaveToken()

  const aoSubmeterFormular = async (
    evento: React.FormEvent<HTMLFormElement>
  ) => {
    evento.preventDefault()
    if (!email || !senha) return alert('Formuláro inválido!')

    const usuario = {
      email,
      senha
    }
    console.log(usuario)
    try {
      const { data } = await httpBackend.post<ILoginResponse>(
        '/public/login',
        usuario
      )

      console.log('retorno login', data)
      saveToken(data.access_token)

      setEmail('')
      setSenha('')

      onLogin()
    } catch (error) {
      console.log(error)

      const msg = 'Ocorreu um erro ao entrar: '
      if (isAxiosError(error))
        return alert(msg + error?.response?.data?.message)
      alert('Ocorreu um erro inesperado!')
    }
  }

  return (
    <AbModal titulo='Login' aberta={isOpen} aoFechar={() => onClose()}>
      <section className='corpoModalCadastro'>
        <figure>
          <img
            src={imagemPrincipal}
            alt='Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura'
          />
        </figure>
        <form onSubmit={aoSubmeterFormular}>
          <AbCampoTexto
            label='E-mail'
            value={email}
            onChange={setEmail}
            type='email'
          />
          <AbCampoTexto
            label='Senha'
            value={senha}
            onChange={setSenha}
            type='password'
          />
          <div className='acoes'>
            <AbBotao texto='Entrar' />
          </div>
          {/* <div className='acoes'>
            <AbBotao texto='Criar conta' />
          </div> */}
        </form>
      </section>
    </AbModal>
  )
}

export default ModalCadastroUsuario
