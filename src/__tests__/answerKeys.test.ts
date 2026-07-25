import { describe, it, expect } from 'vitest'
import { answerKeys } from '../data/answerKeys'

describe('Answer Keys Data', () => {
  it('should have answer keys for tests 1-6', () => {
    for (let testId = 1; testId <= 6; testId++) {
      expect(answerKeys[testId]).toBeDefined()
    }
  })

  it('each test should have exactly 200 answers', () => {
    for (let testId = 1; testId <= 6; testId++) {
      const keys = Object.keys(answerKeys[testId])
      expect(keys.length).toBe(200)
    }
  })

  it('answers should be sequential from 1 to 200', () => {
    for (let testId = 1; testId <= 6; testId++) {
      for (let q = 1; q <= 200; q++) {
        expect(answerKeys[testId][q]).toBeDefined()
      }
    }
  })

  it('all answers should be A, B, C, or D', () => {
    const validAnswers = ['A', 'B', 'C', 'D']
    for (let testId = 1; testId <= 6; testId++) {
      for (let q = 1; q <= 200; q++) {
        expect(validAnswers).toContain(answerKeys[testId][q])
      }
    }
  })
})
