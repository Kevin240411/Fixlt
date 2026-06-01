export function ClientsTable({ clients }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Address</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-700">
          {clients.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-slate-500" colSpan="4">
                No saved clients yet.
              </td>
            </tr>
          ) : (
            clients.map((client) => (
              <tr key={client.id}>
                <td className="px-4 py-3 font-medium">{client.fullName}</td>
                <td className="px-4 py-3">{client.phone}</td>
                <td className="px-4 py-3">{client.email || '-'}</td>
                <td className="px-4 py-3">{client.address || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}