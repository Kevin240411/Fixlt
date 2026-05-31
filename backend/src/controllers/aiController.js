const { classifyFaultSeverity } = require('../services/aiPrioritizationService')

async function prioritizeReportedFault(req, res) {
  try {
    const { reported_fault: reportedFault } = req.body

    if (!reportedFault || typeof reportedFault !== 'string') {
      return res.status(400).json({ message: 'reported_fault must be a non-empty string.' })
    }

    const priority = await classifyFaultSeverity(reportedFault)
    return res.status(200).json(priority)
  } catch (error) {
    return res.status(500).json({ message: 'AI prioritization failed.', error: error.message })
  }
}

module.exports = {
  prioritizeReportedFault,
}
