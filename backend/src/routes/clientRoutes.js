const express = require('express')
const rateLimit = require('express-rate-limit')
const { createClient, listClients, updateClient, deleteClient } = require('../controllers/clientController')

const router = express.Router()
const intakeLimiter = rateLimit({ windowMs: 60_000, limit: 30, standardHeaders: true, legacyHeaders: false })

// Client intake is public so the deployed forms can persist data without a login flow.
router.post('/', intakeLimiter, createClient)
router.get('/', intakeLimiter, listClients)
router.put('/:id', intakeLimiter, updateClient)
router.delete('/:id', intakeLimiter, deleteClient)

module.exports = router
