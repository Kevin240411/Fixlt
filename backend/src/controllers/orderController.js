const prisma = require('../config/prisma')

async function createRepairOrder(req, res) {
  try {
    const { clientId, deviceId, status = 'PENDING', priority = 'MEDIUM', cost, notes } = req.body

    if (!clientId || !deviceId) {
      return res.status(400).json({ message: 'clientId and deviceId are required.' })
    }

    const order = await prisma.repairOrder.create({
      data: {
        clientId,
        deviceId,
        createdById: req.user.id,
        status,
        priority,
        cost,
        notes,
      },
      include: {
        client: true,
        device: true,
      },
    })

    return res.status(201).json(order)
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create repair order.', error: error.message })
  }
}

async function listActiveRepairOrders(req, res) {
  try {
    const orders = await prisma.repairOrder.findMany({
      where: {
        status: {
          in: ['PENDING', 'IN_PROGRESS', 'WAITING_PARTS'],
        },
      },
      include: {
        client: true,
        device: true,
      },
      orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
    })

    return res.status(200).json(orders)
  } catch (error) {
    return res.status(500).json({ message: 'Unable to list active orders.', error: error.message })
  }
}

async function updateRepairOrder(req, res) {
  try {
    const id = Number(req.params.id)
    const { status, priority, cost, notes } = req.body

    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: 'Invalid repair order id.' })
    }

    const data = {}

    if (status !== undefined) {
      data.status = status
    }

    if (priority !== undefined) {
      data.priority = priority
    }

    if (cost !== undefined) {
      data.cost = cost
    }

    if (notes !== undefined) {
      data.notes = notes
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: 'At least one field is required to update.' })
    }

    const order = await prisma.repairOrder.update({
      where: { id },
      data,
      include: {
        client: true,
        device: true,
      },
    })

    return res.status(200).json(order)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Repair order not found.' })
    }

    return res.status(500).json({ message: 'Unable to update repair order.', error: error.message })
  }
}

async function deleteRepairOrder(req, res) {
  try {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: 'Invalid repair order id.' })
    }

    await prisma.repairOrder.delete({
      where: { id },
    })

    return res.status(204).send()
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Repair order not found.' })
    }

    return res.status(500).json({ message: 'Unable to delete repair order.', error: error.message })
  }
}

module.exports = {
  createRepairOrder,
  listActiveRepairOrders,
  updateRepairOrder,
  deleteRepairOrder,
}
