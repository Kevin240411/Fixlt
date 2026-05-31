const express = require('express')
const {
  createRepairOrder,
  listActiveRepairOrders,
} = require('../controllers/orderController')
const { requireAuth, requireRole } = require('../middleware/authMiddleware')

const router = express.Router()

// Admins and technicians can create/track active repair orders.
router.post('/', requireAuth, requireRole('admin', 'technician'), createRepairOrder)
router.get('/active', requireAuth, requireRole('admin', 'technician'), listActiveRepairOrders)

module.exports = router
