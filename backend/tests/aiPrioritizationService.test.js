const {
  buildSeverityPrompt,
  normalizeSeverity,
} = require('../src/services/aiPrioritizationService')

describe('aiPrioritizationService', () => {
  test('normalizes allowed severity values', () => {
    expect(normalizeSeverity('HIGH')).toBe('HIGH')
    expect(normalizeSeverity(' medium ')).toBe('MEDIUM')
    expect(normalizeSeverity('low')).toBe('LOW')
  })

  test('falls back to MEDIUM for invalid outputs', () => {
    expect(normalizeSeverity('Critical')).toBe('MEDIUM')
    expect(normalizeSeverity('')).toBe('MEDIUM')
  })

  test('builds a strict hidden severity prompt', () => {
    const prompt = buildSeverityPrompt('Laptop does not charge')

    expect(prompt).toContain('Return only one word: HIGH, MEDIUM, or LOW.')
    expect(prompt).toContain('Laptop does not charge')
  })
})
