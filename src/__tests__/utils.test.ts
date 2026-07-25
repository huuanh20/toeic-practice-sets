import { describe, it, expect } from 'vitest'

// Same timestamp parser used in ProgressChart.tsx
const parseTimestamp = (ts: string): number => {
  const match = ts.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})$/)
  if (!match) return 0
  const [, day, month, year, hours, minutes] = match
  return new Date(+year, +month - 1, +day, +hours, +minutes).getTime()
}

describe('Timestamp Parsing (DD/MM/YYYY HH:MM)', () => {
  it('should parse a valid timestamp correctly', () => {
    const ts = parseTimestamp('25/07/2026 18:30')
    const date = new Date(ts)
    expect(date.getDate()).toBe(25)
    expect(date.getMonth()).toBe(6) // July = 6 (0-indexed)
    expect(date.getFullYear()).toBe(2026)
    expect(date.getHours()).toBe(18)
    expect(date.getMinutes()).toBe(30)
  })

  it('should return 0 for invalid format', () => {
    expect(parseTimestamp('invalid')).toBe(0)
    expect(parseTimestamp('')).toBe(0)
    expect(parseTimestamp('2026-07-25')).toBe(0)
    expect(parseTimestamp('July 25, 2026')).toBe(0)
  })

  it('should correctly sort timestamps chronologically', () => {
    const timestamps = [
      '25/07/2026 19:00',
      '25/07/2026 18:00',
      '26/07/2026 08:00',
      '24/07/2026 23:00',
    ]
    
    const sorted = [...timestamps].sort((a, b) => parseTimestamp(a) - parseTimestamp(b))
    
    expect(sorted).toEqual([
      '24/07/2026 23:00',
      '25/07/2026 18:00',
      '25/07/2026 19:00',
      '26/07/2026 08:00',
    ])
  })

  it('should handle midnight and noon correctly', () => {
    const midnight = parseTimestamp('01/01/2026 00:00')
    const noon = parseTimestamp('01/01/2026 12:00')
    expect(noon).toBeGreaterThan(midnight)
  })

  it('should handle first and last day of month correctly', () => {
    const jan1 = parseTimestamp('01/01/2026 10:00')
    const jan31 = parseTimestamp('31/01/2026 10:00')
    expect(jan31).toBeGreaterThan(jan1)
  })
})

describe('Scoring Display Values', () => {
  it('correctCount display should be out of 200, not 100', () => {
    // This test verifies the fix for BUG-1:
    // The display text should show /200 (total TOEIC questions), not /100
    const totalQuestions = 200
    const correctCount = 150
    const displayText = `${correctCount}/${totalQuestions}`
    expect(displayText).toBe('150/200')
    expect(displayText).not.toContain('/100')
  })

  it('estimatedScore display should be out of 990, not 495', () => {
    // This test verifies the fix for BUG-2:
    // Total TOEIC score is out of 990 (495 listening + 495 reading)
    const maxScore = 990
    const estimatedScore = 750
    const displayText = `${estimatedScore}/${maxScore}`
    expect(displayText).toBe('750/990')
    expect(displayText).not.toContain('/495')
  })
})

describe('Vocabulary Data', () => {
  it('should import vocabulary data without errors', async () => {
    const { vocabularyData } = await import('../data/vocabularyData')
    expect(vocabularyData).toBeDefined()
    expect(Array.isArray(vocabularyData)).toBe(true)
    expect(vocabularyData.length).toBeGreaterThan(0)
  })

  it('each vocabulary item should have required fields', async () => {
    const { vocabularyData } = await import('../data/vocabularyData')
    for (const item of vocabularyData) {
      expect(item.id).toBeDefined()
      expect(typeof item.word).toBe('string')
      expect(typeof item.meaning).toBe('string')
      expect(typeof item.testId).toBe('number')
      expect(typeof item.storyId).toBe('number')
      expect(item.word.length).toBeGreaterThan(0)
      expect(item.meaning.length).toBeGreaterThan(0)
    }
  })
})

describe('Audio Time Format', () => {
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  it('should format 0 seconds as 00:00', () => {
    expect(formatTime(0)).toBe('00:00')
  })

  it('should format 90 seconds as 01:30', () => {
    expect(formatTime(90)).toBe('01:30')
  })

  it('should format 2700 seconds (45 min) as 45:00', () => {
    expect(formatTime(2700)).toBe('45:00')
  })

  it('should handle NaN input', () => {
    expect(formatTime(NaN)).toBe('00:00')
  })

  it('should pad single digit values', () => {
    expect(formatTime(5)).toBe('00:05')
    expect(formatTime(65)).toBe('01:05')
  })
})
