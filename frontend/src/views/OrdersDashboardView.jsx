import { ClientRegistrationForm } from '../components/forms/ClientRegistrationForm'
import { DeviceIngestionForm } from '../components/forms/DeviceIngestionForm'
import { ClientsTable } from '../components/clients/ClientsTable'
import { OrdersTable } from '../components/orders/OrdersTable'
import { useAppData } from '../hooks/useAppData'

export function OrdersDashboardView() {
  const { clients, orders, updateExistingOrder, removeOrder } = useAppData()

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">FixIt - Repair Orders Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">Current active repair orders with quick intake forms.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <ClientRegistrationForm />
        <DeviceIngestionForm />
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">Saved Clients</h2>
        <ClientsTable clients={clients} />
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">Active Repairs</h2>
        <OrdersTable orders={orders} onEdit={updateExistingOrder} onDelete={removeOrder} />
      </section>
    </main>
  )
}
