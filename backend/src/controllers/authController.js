const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../config/prisma')

function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '12h' },
  )
}

async function register(req, res) {
  try {
    const { fullName, email, password, role = 'technician' } = req.body

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'fullName, email and password are required.' })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(409).json({ message: 'Email already in use.' })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash,
        role,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
    })

    return res.status(201).json({
      user,
      token: signToken(user),
    })
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed.', error: error.message })
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required.' })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    const passwordOk = await bcrypt.compare(password, user.passwordHash)
    if (!passwordOk) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    return res.status(200).json({
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      token: signToken(user),
    })
  } catch (error) {
    return res.status(500).json({ message: 'Login failed.', error: error.message })
  }
}

module.exports = {
  register,
  login,
}
