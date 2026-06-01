import { useState } from 'react'
import { useAppData } from '../../hooks/useAppData'
import { isApiConfigured } from '../../services/api'

const initialClient = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
}

export function ClientRegistrationForm() {
  const { addClient } = useAppData()
  const [form, setForm] = useState(initialClient)
  const [status, setStatus] = useState('')

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!form.fullName.trim() || !form.phone.trim()) {
      return
    }

    try {
      await addClient({
        ...form,
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
      })
      setForm(initialClient)
      setStatus(isApiConfigured ? 'Client saved to the backend.' : 'Backend not configured; saved locally.')
    } catch (error) {
      setStatus(error.message)
    }
  }

  return (
    <form className="space-y-3 rounded-lg border border-slate-200 bg-white p-4" onSubmit={onSubmit}>
      <h2 className="text-lg font-semibold text-slate-900">Client Registration</h2>
      <input className="w-full rounded border border-slate-300 px-3 py-2 text-sm" name="fullName" placeholder="Full name" value={form.fullName} onChange={onChange} />
      <input className="w-full rounded border border-slate-300 px-3 py-2 text-sm" name="phone" placeholder="Phone" value={form.phone} onChange={onChange} />
      <input className="w-full rounded border border-slate-300 px-3 py-2 text-sm" name="email" placeholder="Email" value={form.email} onChange={onChange} />
      <input className="w-full rounded border border-slate-300 px-3 py-2 text-sm" name="address" placeholder="Address" value={form.address} onChange={onChange} />
      {status ? <p className="text-sm text-slate-600">{status}</p> : null}
      <button className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" type="submit">
        Save Client
      </button>
    </form>
  )
}
