export function OrdersTable({ orders, onEdit, onDelete }) {
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
                      onClick={() => {
                        const nextStatus = window.prompt('Nuevo status:', order.status)
                        if (!nextStatus) {
                          return
                        }

                        onEdit(order.id, { status: nextStatus.trim().toUpperCase() })
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                      onClick={() => {
                        if (window.confirm(`Eliminar la orden #${order.id}?`)) {
                          onDelete(order.id)
                        }
                      }}
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
