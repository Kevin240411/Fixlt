const prisma = require('../config/prisma')

async function createDevice(req, res) {
  try {
    const { brand, model, serialNumber, reported_fault: reportedFault } = req.body

    if (!brand || !model || !serialNumber || !reportedFault) {
      return res.status(400).json({ message: 'brand, model, serialNumber and reported_fault are required.' })
    }

    const device = await prisma.device.create({
      data: {
        brand,
        model,
        serialNumber,
        reportedFault,
      },
    })

    return res.status(201).json(device)
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create device.', error: error.message })
  }
}

module.exports = {
  createDevice,
}
