export function ClientsTable({ clients, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Address</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-700">
          {clients.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-slate-500" colSpan="5">
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
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                      onClick={() => {
                        const nextName = window.prompt('Nuevo nombre:', client.fullName)
                        if (!nextName) {
                          return
                        }

                        const nextPhone = window.prompt('Nuevo telefono:', client.phone)
                        if (!nextPhone) {
                          return
                        }

                        const nextEmail = window.prompt('Nuevo email (opcional):', client.email || '')
                        const nextAddress = window.prompt('Nueva direccion (opcional):', client.address || '')

                        onEdit(client.id, {
                          fullName: nextName.trim(),
                          phone: nextPhone.trim(),
                          email: nextEmail ? nextEmail.trim() : null,
                          address: nextAddress ? nextAddress.trim() : null,
                        })
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                      onClick={() => {
                        if (window.confirm(`Eliminar al cliente ${client.fullName}?`)) {
                          onDelete(client.id)
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