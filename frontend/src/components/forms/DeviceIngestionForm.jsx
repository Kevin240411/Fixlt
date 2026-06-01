import { useState } from 'react'
import { useAppData } from '../../hooks/useAppData'
import { isApiConfigured } from '../../services/api'

const initialDevice = {
  brand: '',
  model: '',
  serialNumber: '',
  reportedFault: '',
}

export function DeviceIngestionForm() {
  const { addDevice } = useAppData()
  const [form, setForm] = useState(initialDevice)
  const [status, setStatus] = useState('')

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!form.brand.trim() || !form.model.trim() || !form.serialNumber.trim() || !form.reportedFault.trim()) {
      return
    }

    try {
      await addDevice({
        ...form,
        brand: form.brand.trim(),
        model: form.model.trim(),
        serialNumber: form.serialNumber.trim(),
        reportedFault: form.reportedFault.trim(),
      })
      setForm(initialDevice)
      setStatus(isApiConfigured ? 'Device saved to the backend.' : 'Backend not configured; saved locally.')
    } catch (error) {
      setStatus(error.message)
    }
  }

  return (
    <form className="space-y-3 rounded-lg border border-slate-200 bg-white p-4" onSubmit={onSubmit}>
      <h2 className="text-lg font-semibold text-slate-900">Device Ingestion</h2>
      <input className="w-full rounded border border-slate-300 px-3 py-2 text-sm" name="brand" placeholder="Brand" value={form.brand} onChange={onChange} />
      <input className="w-full rounded border border-slate-300 px-3 py-2 text-sm" name="model" placeholder="Model" value={form.model} onChange={onChange} />
      <input className="w-full rounded border border-slate-300 px-3 py-2 text-sm" name="serialNumber" placeholder="Serial number" value={form.serialNumber} onChange={onChange} />
      <textarea className="w-full rounded border border-slate-300 px-3 py-2 text-sm" name="reportedFault" placeholder="Reported fault" rows="3" value={form.reportedFault} onChange={onChange} />
      {status ? <p className="text-sm text-slate-600">{status}</p> : null}
      <button className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700" type="submit">
        Save Device
      </button>
    </form>
  )
}
