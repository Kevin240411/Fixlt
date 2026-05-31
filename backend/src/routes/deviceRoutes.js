const express = require('express')
const { createDevice } = require('../controllers/deviceController')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

// Device ingestion endpoint: accepts incoming workshop devices.
router.post('/', requireAuth, createDevice)

module.exports = router
