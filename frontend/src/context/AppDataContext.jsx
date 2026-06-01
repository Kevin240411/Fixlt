import { useEffect, useMemo, useState } from 'react'
import { AppDataContext } from './AppDataContextObject'
import {
  createClient as createClientRequest,
  createDevice as createDeviceRequest,
  getClients,
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

  async function loadClients() {
    if (!isApiConfigured) {
      return
    }

    const items = await getClients()
    setClients(items)
  }

  async function loadOrders() {
    if (!isApiConfigured) {
      setOrders(initialOrders)
      return
    }

    const activeOrders = await getActiveOrders()
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
  }

  useEffect(() => {
    let isMounted = true

    loadOrders()
      .then(() => {
        if (!isMounted && isApiConfigured) {
          return
        }
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

  useEffect(() => {
    if (!isApiConfigured) {
      return undefined
    }

    let isMounted = true

    loadClients()
      .then(() => {
        if (!isMounted) {
          return
        }
      })
      .catch(() => {
        if (isMounted) {
          setClients([])
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
    await loadClients()
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
