import { IOpcaoCompra } from '../interfaces/IOpcaoCompra'

export const minPriceLivro = (options: IOpcaoCompra[]) => {
  return options.reduce((prevOpc, opc) =>
    opc.preco < prevOpc.preco ? opc : prevOpc
  ).preco
}
