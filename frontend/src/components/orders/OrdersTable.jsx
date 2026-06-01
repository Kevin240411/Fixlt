export function OrdersTable({ orders, onEdit, onDelete }) {
  const allowedStatuses = ['PENDING', 'IN_PROGRESS', 'WAITING_PARTS', 'COMPLETED', 'CANCELLED']

  async function handleEdit(order) {
    const nextStatus = window.prompt(
      `Nuevo status (${allowedStatuses.join(', ')}):`,
      order.status,
    )

    if (!nextStatus) {
      return
    }

    const normalizedStatus = nextStatus.trim().toUpperCase()

    if (!allowedStatuses.includes(normalizedStatus)) {
      window.alert('Status invalido. Usa uno de los valores permitidos.')
      return
    }

    try {
      await onEdit(order.id, { status: normalizedStatus })
    } catch (error) {
      window.alert(error.message || 'No se pudo editar la orden.')
    }
  }

  async function handleDelete(order) {
    if (!window.confirm(`Eliminar la orden #${order.id}?`)) {
      return
    }

    try {
      await onDelete(order.id)
    } catch (error) {
      window.alert(error.message || 'No se pudo eliminar la orden.')
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Order #</th>
            <th className="px-4 py-3">Client</th>
            <th className="px-4 py-3">Device</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Cost</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-700">
          {orders.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-slate-500" colSpan="7">
                No active repairs yet.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-3 font-medium">{order.id}</td>
                <td className="px-4 py-3">{order.clientName}</td>
                <td className="px-4 py-3">{order.device}</td>
                <td className="px-4 py-3">{order.status}</td>
                <td className="px-4 py-3">{order.priority}</td>
                <td className="px-4 py-3">${order.cost}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                      onClick={() => handleEdit(order)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                      onClick={() => handleDelete(order)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
