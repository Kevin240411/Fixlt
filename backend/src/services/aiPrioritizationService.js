const { GoogleGenAI } = require('@google/genai')

const ALLOWED_PRIORITIES = ['HIGH', 'MEDIUM', 'LOW']
const modelName = 'gemini-2.5-flash'

function normalizeSeverity(value) {
  const normalized = String(value || '').trim().toUpperCase()
  return ALLOWED_PRIORITIES.includes(normalized) ? normalized : 'MEDIUM'
}

function buildSeverityPrompt(reportedFault) {
  return [
    'You are a severity classifier for repair workshop tickets.',
    'Return only one word: HIGH, MEDIUM, or LOW.',
    'Do not include punctuation, explanations, or extra words.',
    '',
    `Reported fault: """${reportedFault}"""`,
  ].join('\n')
}

async function classifyFaultSeverity(reportedFault) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing.')
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  const prompt = buildSeverityPrompt(reportedFault)

  const response = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
  })

  return normalizeSeverity(response.text)
}

module.exports = {
  ALLOWED_PRIORITIES,
  buildSeverityPrompt,
  normalizeSeverity,
  classifyFaultSeverity,
}
