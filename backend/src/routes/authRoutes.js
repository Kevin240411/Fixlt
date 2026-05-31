const express = require('express')
const { login, register } = require('../controllers/authController')

const router = express.Router()

// Sample auth routes used as the baseline pattern for future modules.
router.post('/register', register)
router.post('/login', login)

module.exports = router
