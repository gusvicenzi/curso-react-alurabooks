import { AbBotao, AbCampoTexto, AbModal } from 'ds-alurabooks'
import { useState } from 'react'

import imagemPrincipal from './assets/login.png'

import './ModalCadastroUsuario.css'
import axios, { AxiosError } from 'axios'
import { useSaveToken } from '../../hooks/session'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}
const ModalCadastroUsuario = ({ onClose, isOpen }: ModalProps) => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [endereco, setEndereco] = useState('')
  const [complemento, setComplemento] = useState('')
  const [cep, setCep] = useState('')
  const [senha, setSenha] = useState('')
  const [senhaConfirmada, setSenhaConfirmada] = useState('')
  const saveToken = useSaveToken()

  const aoSubmeterFormular = async (
    evento: React.FormEvent<HTMLFormElement>
  ) => {
    evento.preventDefault()
    if (
      !nome ||
      !email ||
      !endereco ||
      !complemento ||
      !cep ||
      !senha ||
      !senhaConfirmada
    )
      return alert('Formuláro inválido!')
    if (senha !== senhaConfirmada) return alert('Senha não confere')

    const usuario = {
      nome,
      email,
      senha,
      endereco,
      cep,
      complemento
    }
    console.log(usuario)
    try {
      const { data } = await axios.post(
        'http://localhost:8000/public/registrar',
        usuario
      )

      console.log('retorno cadastro', data)
      saveToken(data.access_token)

      setNome('')
      setEmail('')
      setEndereco('')
      setComplemento('')
      setCep('')
      setSenha('')
      setSenhaConfirmada('')

      onClose()

      alert('Usuário foi cadastrado com sucesso!')
    } catch (error) {
      console.log(error)

      const msg = 'Ocorreu um erro ao cadastrar o usuário: '
      if (error instanceof AxiosError)
        return alert(msg + error?.response?.data?.message)
      if (error instanceof Error) return alert(msg + error?.message)
      alert(msg)
    }
  }

  return (
    <AbModal titulo='Cadastrar' aberta={isOpen} aoFechar={() => onClose()}>
      <section className='corpoModalCadastro'>
        <figure>
          <img
            src={imagemPrincipal}
            alt='Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura'
          />
        </figure>
        <form onSubmit={aoSubmeterFormular}>
          <AbCampoTexto label='Nome' value={nome} onChange={setNome} />
          <AbCampoTexto
            label='E-mail'
            value={email}
            onChange={setEmail}
            type='email'
          />
          <AbCampoTexto
            label='Endereço'
            value={endereco}
            onChange={setEndereco}
          />
          <AbCampoTexto
            label='Complemento'
            value={complemento}
            onChange={setComplemento}
          />
          <AbCampoTexto label='CEP' value={cep} onChange={setCep} />
          <AbCampoTexto
            label='Senha'
            value={senha}
            onChange={setSenha}
            type='password'
          />
          <AbCampoTexto
            label='Confirmação da senha'
            value={senhaConfirmada}
            onChange={setSenhaConfirmada}
            type='password'
          />
          <div className='acoes'>
            <AbBotao texto='Cadastrar' />
          </div>
        </form>
      </section>
    </AbModal>
  )
}

export default ModalCadastroUsuario
