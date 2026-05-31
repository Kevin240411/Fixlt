const express = require('express')
const { createClient } = require('../controllers/clientController')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

// Keep all client mutation routes protected by JWT middleware.
router.post('/', requireAuth, createClient)

module.exports = router
