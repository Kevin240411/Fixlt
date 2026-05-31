import { AppDataProvider } from './context/AppDataContext'
import { OrdersDashboardView } from './views/OrdersDashboardView'

function App() {
  return (
    <AppDataProvider>
      <div className="min-h-screen bg-slate-100">
        <OrdersDashboardView />
      </div>
    </AppDataProvider>
  )
}

export default App
