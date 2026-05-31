require('dotenv').config()

const cors = require('cors')
const express = require('express')

const aiRoutes = require('./routes/aiRoutes')
const authRoutes = require('./routes/authRoutes')
const clientRoutes = require('./routes/clientRoutes')
const deviceRoutes = require('./routes/deviceRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'fixit-api' })
})

app.use('/api/auth', authRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/devices', deviceRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/ai', aiRoutes)

module.exports = app
