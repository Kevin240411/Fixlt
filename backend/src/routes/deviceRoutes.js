const express = require('express')
const rateLimit = require('express-rate-limit')
const { createDevice } = require('../controllers/deviceController')

const router = express.Router()
const intakeLimiter = rateLimit({ windowMs: 60_000, limit: 30, standardHeaders: true, legacyHeaders: false })

// Device ingestion is public for the deployed intake form.
router.post('/', intakeLimiter, createDevice)

module.exports = router
