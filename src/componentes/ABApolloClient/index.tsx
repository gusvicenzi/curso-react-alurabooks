import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { ReactNode } from 'react'

const client = new ApolloClient({
  uri: 'http://localhost:9000/graphql',
  cache: new InMemoryCache()
})

type Props = {
  children: ReactNode
}

export const ABApolloClient = ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
