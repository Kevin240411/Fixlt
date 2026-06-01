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

async function updateClient(req, res) {
  try {
    const id = Number(req.params.id)
    const { fullName, phone, email, address } = req.body

    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: 'Invalid client id.' })
    }

    const data = {}

    if (fullName !== undefined) {
      data.fullName = fullName
    }

    if (phone !== undefined) {
      data.phone = phone
    }

    if (email !== undefined) {
      data.email = email
    }

    if (address !== undefined) {
      data.address = address
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: 'At least one field is required to update.' })
    }

    const client = await prisma.client.update({
      where: { id },
      data,
    })

    return res.status(200).json(client)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Client not found.' })
    }

    return res.status(500).json({ message: 'Unable to update client.', error: error.message })
  }
}

async function deleteClient(req, res) {
  try {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: 'Invalid client id.' })
    }

    await prisma.client.delete({
      where: { id },
    })

    return res.status(204).send()
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Client not found.' })
    }

    return res.status(500).json({ message: 'Unable to delete client.', error: error.message })
  }
}

module.exports = {
  createClient,
  listClients,
  updateClient,
  deleteClient,
}
