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

module.exports = {
  createRepairOrder,
  listActiveRepairOrders,
}
