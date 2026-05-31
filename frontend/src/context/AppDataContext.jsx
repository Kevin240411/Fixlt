import { useMemo, useState } from 'react'
import { AppDataContext } from './AppDataContextObject'

const initialOrders = [
  {
    id: 1001,
    clientName: 'Ana Rivera',
    device: 'Samsung Galaxy S22',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    cost: 120,
  },
  {
    id: 1002,
    clientName: 'Leo Martins',
    device: 'Dell Inspiron 15',
    status: 'WAITING_PARTS',
    priority: 'MEDIUM',
    cost: 85,
  },
]

export function AppDataProvider({ children }) {
  const [clients, setClients] = useState([])
  const [devices, setDevices] = useState([])
  const [orders] = useState(initialOrders)

  const value = useMemo(
    () => ({
      clients,
      devices,
      orders,
      addClient: (client) => setClients((prev) => [client, ...prev]),
      addDevice: (device) => setDevices((prev) => [device, ...prev]),
    }),
    [clients, devices, orders],
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}
