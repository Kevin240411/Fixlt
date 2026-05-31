const express = require('express')
const rateLimit = require('express-rate-limit')
const { createDevice } = require('../controllers/deviceController')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()
const intakeLimiter = rateLimit({ windowMs: 60_000, limit: 30, standardHeaders: true, legacyHeaders: false })

// Device ingestion endpoint: accepts incoming workshop devices.
router.post('/', intakeLimiter, requireAuth, createDevice)

module.exports = router
