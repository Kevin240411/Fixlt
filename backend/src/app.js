const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const aiRoutes = require('./routes/aiRoutes')
const clientRoutes = require('./routes/clientRoutes')
const deviceRoutes = require('./routes/deviceRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()

function getAllowedOrigins() {
  const baseOrigins = ['http://localhost:5173', 'http://localhost:3000']
  const configuredOrigins = [process.env.CORS_ORIGIN, process.env.FRONTEND_URL]
    .filter(Boolean)
    .flatMap((value) => value.split(','))
    .map((value) => value.trim())
    .filter(Boolean)

  const vercelOrigin = process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []

  return [...new Set([...baseOrigins, ...configuredOrigins, ...vercelOrigin])]
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || getAllowedOrigins().includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    credentials: true,
  }),
)

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'FixIt API is running.',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/devices', deviceRoutes)
app.use('/api/orders', orderRoutes)

module.exports = app