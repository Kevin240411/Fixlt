const prisma = require('../config/prisma')

async function createClient(req, res) {
  try {
    const { fullName, phone, email, address } = req.body

    if (!fullName || !phone) {
      return res.status(400).json({ message: 'fullName and phone are required.' })
    }

    const client = await prisma.client.create({
      data: { fullName, phone, email, address },
    })

    return res.status(201).json(client)
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create client.', error: error.message })
  }
}

async function listClients(req, res) {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return res.status(200).json(clients)
  } catch (error) {
    return res.status(500).json({ message: 'Unable to list clients.', error: error.message })
  }
}

module.exports = {
  createClient,
  listClients,
}
