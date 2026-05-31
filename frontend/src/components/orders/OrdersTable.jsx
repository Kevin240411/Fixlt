export function OrdersTable({ orders }) {
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
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-700">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-3 font-medium">{order.id}</td>
              <td className="px-4 py-3">{order.clientName}</td>
              <td className="px-4 py-3">{order.device}</td>
              <td className="px-4 py-3">{order.status}</td>
              <td className="px-4 py-3">{order.priority}</td>
              <td className="px-4 py-3">${order.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
