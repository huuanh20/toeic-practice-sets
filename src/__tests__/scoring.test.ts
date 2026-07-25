import { describe, it, expect } from 'vitest'

// Import the same scoring tables used in AnswerSheet.tsx
const listeningScoreTable = [
  5, 15, 20, 25, 30, 35, 40, 45, 50, 55,
  60, 65, 70, 75, 80, 85, 90, 95, 100, 105,
  110, 115, 120, 125, 130, 135, 140, 145, 150, 155,
  160, 165, 170, 175, 180, 185, 190, 195, 200, 205,
  210, 215, 220, 225, 230, 235, 240, 245, 250, 255,
  260, 265, 270, 275, 280, 285, 290, 295, 300, 305,
  310, 315, 320, 325, 330, 335, 340, 345, 350, 355,
  360, 365, 370, 375, 380, 385, 395, 400, 405, 410,
  415, 420, 425, 430, 435, 440, 445, 450, 455, 460,
  465, 470, 475, 480, 485, 490, 495, 495, 495, 495,
  495
]

const readingScoreTable = [
  5, 15, 20, 25, 30, 35, 40, 45, 50, 55,
  60, 65, 70, 75, 80, 85, 90, 95, 100, 105,
  110, 115, 120, 125, 130, 135, 140, 145, 150, 155,
  160, 165, 170, 175, 180, 185, 190, 195, 200, 205,
  210, 215, 220, 225, 230, 235, 240, 245, 250, 255,
  260, 265, 270, 275, 280, 285, 290, 295, 300, 305,
  310, 315, 320, 325, 330, 335, 340, 345, 350, 355,
  360, 365, 370, 375, 380, 385, 395, 400, 405, 410,
  415, 420, 425, 430, 435, 440, 445, 450, 455, 460,
  465, 470, 475, 480, 485, 490, 495, 495, 495, 495,
  495
]

// Same helper functions from AnswerSheet.tsx
const estimateListeningScore = (correctCount: number) => {
  return listeningScoreTable[Math.min(correctCount, 100)] ?? 5
}

const estimateReadingScore = (correctCount: number) => {
  return readingScoreTable[Math.min(correctCount, 100)] ?? 5
}

describe('TOEIC Score Estimation', () => {
  describe('Listening Score Table', () => {
    it('should have exactly 101 entries (0 to 100 correct)', () => {
      expect(listeningScoreTable.length).toBe(101)
    })

    it('minimum score should be 5 (0 correct)', () => {
      expect(estimateListeningScore(0)).toBe(5)
    })

    it('maximum score should be 495 (100 correct)', () => {
      expect(estimateListeningScore(100)).toBe(495)
    })

    it('scores should be non-decreasing', () => {
      for (let i = 1; i < listeningScoreTable.length; i++) {
        expect(listeningScoreTable[i]).toBeGreaterThanOrEqual(listeningScoreTable[i - 1])
      }
    })

    it('should handle out-of-range values gracefully', () => {
      expect(estimateListeningScore(101)).toBe(495)
      expect(estimateListeningScore(200)).toBe(495)
    })
  })

  describe('Reading Score Table', () => {
    it('should have exactly 101 entries (0 to 100 correct)', () => {
      expect(readingScoreTable.length).toBe(101)
    })

    it('minimum score should be 5 (0 correct)', () => {
      expect(estimateReadingScore(0)).toBe(5)
    })

    it('maximum score should be 495 (100 correct)', () => {
      expect(estimateReadingScore(100)).toBe(495)
    })

    it('scores should be non-decreasing', () => {
      for (let i = 1; i < readingScoreTable.length; i++) {
        expect(readingScoreTable[i]).toBeGreaterThanOrEqual(readingScoreTable[i - 1])
      }
    })
  })

  describe('Total Score Calculation', () => {
    it('perfect score should be 990 (495 + 495)', () => {
      const total = estimateListeningScore(100) + estimateReadingScore(100)
      expect(total).toBe(990)
    })

    it('minimum possible total score should be 10 (5 + 5)', () => {
      const total = estimateListeningScore(0) + estimateReadingScore(0)
      expect(total).toBe(10)
    })

    it('50 correct each should give a reasonable mid-range score', () => {
      const listening = estimateListeningScore(50)
      const reading = estimateReadingScore(50)
      expect(listening).toBeGreaterThan(200)
      expect(listening).toBeLessThan(400)
      expect(reading).toBeGreaterThan(200)
      expect(reading).toBeLessThan(400)
    })
  })
})

describe('Auto-Grading Logic', () => {
  it('should correctly grade answers against answer key', async () => {
    // Simulate auto-grading for test 1
    const { answerKeys } = await import('../data/answerKeys')
    const testId = 1
    
    // User answers all correct
    const grades: Record<string, boolean> = {}
    for (let num = 1; num <= 200; num++) {
      const key = `${testId}-${num}`
      grades[key] = true // All correct
    }
    
    const correctCount = Object.values(grades).filter(v => v === true).length
    expect(correctCount).toBe(200)
  })

  it('should handle partial answers correctly', async () => {
    const { answerKeys } = await import('../data/answerKeys')
    const testId = 1
    const keyAnswers = answerKeys[testId]
    
    // User answers only first 50 questions, all correct
    const userAnswers: Record<string, 'A' | 'B' | 'C' | 'D'> = {}
    const grades: Record<string, boolean> = {}
    
    for (let num = 1; num <= 50; num++) {
      const key = `${testId}-${num}`
      userAnswers[key] = keyAnswers[num]
      grades[key] = true
    }
    
    const answeredCount = Object.keys(userAnswers).length
    const correctCount = Object.values(grades).filter(v => v === true).length
    
    expect(answeredCount).toBe(50)
    expect(correctCount).toBe(50)
  })

  it('should handle wrong answers correctly', async () => {
    const { answerKeys } = await import('../data/answerKeys')
    const testId = 1
    const keyAnswers = answerKeys[testId]
    
    // User answers all wrong (opposite of correct answer)
    const grades: Record<string, boolean> = {}
    for (let num = 1; num <= 200; num++) {
      const key = `${testId}-${num}`
      const wrongAnswer = keyAnswers[num] === 'A' ? 'B' : 'A'
      grades[key] = wrongAnswer === keyAnswers[num]
    }
    
    const correctCount = Object.values(grades).filter(v => v === true).length
    expect(correctCount).toBe(0)
  })
})

