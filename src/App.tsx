import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import './App.css'
import Rotas from './rotas'
import { createBrowserHistory } from 'history'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ABApolloClient } from './componentes/ABApolloClient'

export const history = createBrowserHistory({ window })

const queryClient = new QueryClient()
function App() {
  return (
    <HistoryRouter history={history}>
      <ABApolloClient>
        <QueryClientProvider client={queryClient}>
          <Rotas />
        </QueryClientProvider>
      </ABApolloClient>
    </HistoryRouter>
  )
}

export default App
