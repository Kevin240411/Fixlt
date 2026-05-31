const express = require('express')
const { prioritizeReportedFault } = require('../controllers/aiController')
const { requireAuth, requireRole } = require('../middleware/authMiddleware')

const router = express.Router()

// AI module route: receives fault text and returns a single priority string.
router.post('/prioritize', requireAuth, requireRole('admin', 'technician'), prioritizeReportedFault)

module.exports = router
