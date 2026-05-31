const express = require('express')
const rateLimit = require('express-rate-limit')
const { prioritizeReportedFault } = require('../controllers/aiController')
const { requireAuth, requireRole } = require('../middleware/authMiddleware')

const router = express.Router()
const aiLimiter = rateLimit({ windowMs: 60_000, limit: 20, standardHeaders: true, legacyHeaders: false })

// AI module route: receives fault text and returns a single priority string.
router.post('/prioritize', aiLimiter, requireAuth, requireRole('admin', 'technician'), prioritizeReportedFault)

module.exports = router
