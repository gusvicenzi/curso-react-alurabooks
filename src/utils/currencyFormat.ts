// src/utils/formatador-moeda.ts
export const currencyFormat = (value: number) =>
  Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
