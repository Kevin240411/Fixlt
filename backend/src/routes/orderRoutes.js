const express = require('express')
const rateLimit = require('express-rate-limit')
const {
  createRepairOrder,
  listActiveRepairOrders,
} = require('../controllers/orderController')
const { requireAuth, requireRole } = require('../middleware/authMiddleware')

const router = express.Router()
const orderLimiter = rateLimit({ windowMs: 60_000, limit: 60, standardHeaders: true, legacyHeaders: false })

// Admins and technicians can create/track active repair orders.
router.post('/', orderLimiter, requireAuth, requireRole('admin', 'technician'), createRepairOrder)
router.get('/active', orderLimiter, listActiveRepairOrders)

module.exports = router