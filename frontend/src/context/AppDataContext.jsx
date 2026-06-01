import { useEffect, useState } from 'react'
import { AppDataContext } from './AppDataContextObject'
import {
  createClient as createClientRequest,
  createDevice as createDeviceRequest,
  updateClient as updateClientRequest,
  deleteClient as deleteClientRequest,
  tryGetClients,
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
      return []
    }

    return tryGetClients()
  }

  async function loadOrders() {
    if (!isApiConfigured) {
      return initialOrders
    }

    const activeOrders = await getActiveOrders()
    return activeOrders.map((order) => ({
      id: order.id,
      clientName: order.client?.fullName || 'Unknown client',
      device: order.device ? `${order.device.brand} ${order.device.model}` : 'Unknown device',
      status: order.status,
      priority: order.priority,
      cost: order.cost ?? 0,
    }))
  }

  async function updateExistingOrder(orderId, patch) {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, ...patch } : order)))
  }

  async function removeOrder(orderId) {
    setOrders((prev) => prev.filter((order) => order.id !== orderId))
  }

  async function updateExistingClient(clientId, patch) {
    if (!isApiConfigured) {
      setClients((prev) => prev.map((client) => (client.id === clientId ? { ...client, ...patch } : client)))
      return
    }

    await updateClientRequest(clientId, patch)
    const items = await loadClients()
    setClients(items)
  }

  async function removeClient(clientId) {
    if (!isApiConfigured) {
      setClients((prev) => prev.filter((client) => client.id !== clientId))
      return
    }

    await deleteClientRequest(clientId)
    const items = await loadClients()
    setClients(items)
  }

  useEffect(() => {
    let isMounted = true

    ;(async () => {
      try {
        const items = await loadOrders()
        if (isMounted) {
          setOrders(items)
        }
      } catch {
        if (isMounted) {
          setOrders(initialOrders)
        }
      }
    })()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!isApiConfigured) {
      return undefined
    }

    let isMounted = true

    ;(async () => {
      try {
        const items = await loadClients()
        if (isMounted) {
          setClients(items)
        }
      } catch {
        if (isMounted) {
          setClients([])
        }
      }
    })()

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
    const items = await loadClients()
    setClients(items)
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

  const value = {
    clients,
    devices,
    orders,
    addClient,
    addDevice,
    updateExistingClient,
    removeClient,
    updateExistingOrder,
    removeOrder,
  }

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}
