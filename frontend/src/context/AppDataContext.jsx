import { useEffect, useMemo, useState } from 'react'
import { AppDataContext } from './AppDataContextObject'
import {
  createClient as createClientRequest,
  createDevice as createDeviceRequest,
  isApiConfigured,
  getActiveOrders,
} from '../services/api'

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
  const [orders, setOrders] = useState(initialOrders)

  useEffect(() => {
    if (!isApiConfigured) {
      setOrders(initialOrders)
      return undefined
    }

    let isMounted = true

    getActiveOrders()
      .then((activeOrders) => {
        if (!isMounted) {
          return
        }

        setOrders(
          activeOrders.map((order) => ({
            id: order.id,
            clientName: order.client?.fullName || 'Unknown client',
            device: order.device ? `${order.device.brand} ${order.device.model}` : 'Unknown device',
            status: order.status,
            priority: order.priority,
            cost: order.cost ?? 0,
          })),
        )
      })
      .catch(() => {
        if (isMounted) {
          setOrders(initialOrders)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  async function addClient(client) {
    if (!isApiConfigured) {
      const localClient = {
        ...client,
        id: Date.now(),
      }

      setClients((prev) => [localClient, ...prev])
      return localClient
    }

    const createdClient = await createClientRequest(client)
    setClients((prev) => [createdClient, ...prev])
    return createdClient
  }

  async function addDevice(device) {
    if (!isApiConfigured) {
      const localDevice = {
        ...device,
        id: Date.now(),
      }

      setDevices((prev) => [localDevice, ...prev])
      return localDevice
    }

    const createdDevice = await createDeviceRequest(device)
    setDevices((prev) => [createdDevice, ...prev])
    return createdDevice
  }

  const value = useMemo(
    () => ({
      clients,
      devices,
      orders,
      addClient,
      addDevice,
    }),
    [clients, devices, orders],
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}
