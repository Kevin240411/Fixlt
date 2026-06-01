function normalizeApiBaseUrl(value) {
  const normalized = String(value || '').trim().replace(/\/$/, '')

  if (!normalized) {
    return ''
  }

  const isLocalHost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(normalized)

  if (import.meta.env.PROD && isLocalHost) {
    return ''
  }

  return normalized
}

const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL)
export const isApiConfigured = Boolean(API_BASE_URL)

async function request(path, options = {}) {
  if (!isApiConfigured) {
    throw new Error('API base URL is not configured.')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json') ? await response.json() : await response.text()

  if (!response.ok) {
    const message = payload && typeof payload === 'object' ? payload.message : payload || 'Request failed.'
    throw new Error(message)
  }

  return payload
}

export function createClient(client) {
  return request('/api/clients', {
    method: 'POST',
    body: JSON.stringify(client),
  })
}

export function createDevice(device) {
  return request('/api/devices', {
    method: 'POST',
    body: JSON.stringify({
      ...device,
      reported_fault: device.reportedFault,
    }),
  })
}

export function getActiveOrders() {
  return request('/api/orders/active')
}
