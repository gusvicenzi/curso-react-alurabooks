export interface IUser {
  nome: string
  email: string
  senha: string
  endereco: string
  complemento: string
  cep: string
}

export interface ILoginResponse {
  access_token: string
  user: Omit<IUser, 'senha'>
}
