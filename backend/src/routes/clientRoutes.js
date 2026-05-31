const express = require('express')
const rateLimit = require('express-rate-limit')
const { createClient } = require('../controllers/clientController')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()
const intakeLimiter = rateLimit({ windowMs: 60_000, limit: 30, standardHeaders: true, legacyHeaders: false })

// Keep all client mutation routes protected by JWT middleware.
router.post('/', intakeLimiter, requireAuth, createClient)

module.exports = router
