import { useEffect, useState } from 'react'
import './Pedidos.css'
import { AbBotao } from 'ds-alurabooks'
import axios from 'axios'
import { useGetToken } from '../../hooks/session'
import { IPedido } from '../../interfaces/IPedido'

export const Pedidos = () => {
  const [pedidos, setPedidos] = useState<IPedido[]>([])

  const token = useGetToken()

  const getPedidos = async () => {
    try {
      const { data: pedidoResponse } = await axios.get<IPedido[]>(
        'http://localhost:8000/pedidos',
        {
          headers: { Authorization: `Bearer ${token} ` }
        }
      )
      setPedidos(pedidoResponse)
    } catch (error) {
      console.log(error)
    }
  }

  const excluirPedido = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/pedidos/${id}`,
        {
          headers: { Authorization: `Bearer ${token} ` }
        }
      )
      if (response.status === 200) await getPedidos()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!pedidos.length) getPedidos()
  }, [])

  return (
    <div className='pedidos'>
      <h1>Pedidos</h1>

      {pedidos.map(({ id, data, total, entrega }) => (
        <div className='pedido' key={`pedido-${id}`}>
          <ul>
            <li>
              Pedido: <strong>{id}</strong>
            </li>
            <li>
              Data do pedido:{' '}
              <strong>{new Date(data).toLocaleDateString()}</strong>
            </li>
            <li>
              Valor total:{' '}
              <strong>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(total)}
              </strong>
            </li>
            <li>
              Entrega realizada em:{' '}
              <strong>{new Date(entrega).toLocaleDateString()}</strong>
            </li>
            <li>
              <button className='deleteBtn' onClick={() => excluirPedido(id)}>
                Excluir
              </button>
            </li>
          </ul>
          <AbBotao texto='Detalhes' />
        </div>
      ))}
    </div>
  )
}
