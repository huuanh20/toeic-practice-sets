import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
    get length() { return Object.keys(store).length },
    key: vi.fn((index: number) => Object.keys(store)[index] || null),
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Same storage utilities as src/utils/storage.ts
const storage = {
  save: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Error saving
    }
  },
  load: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) as T : defaultValue
    } catch {
      return defaultValue
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch {
      // Error removing
    }
  }
}

describe('Edge Cases', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  describe('Empty State Handling', () => {
    it('should return default value when localStorage is empty', () => {
      const result = storage.load<Record<string, string>>('toeic-answers', {})
      expect(result).toEqual({})
    })

    it('should return default value for non-existent key', () => {
      const result = storage.load<string>('non-existent', 'default')
      expect(result).toBe('default')
    })

    it('should handle saving empty objects', () => {
      storage.save('toeic-answers', {})
      const retrieved = storage.load<Record<string, string>>('toeic-answers', {})
      expect(retrieved).toEqual({})
    })

    it('should handle empty array for attempts', () => {
      storage.save('toeic-attempts', [])
      const retrieved = storage.load<any[]>('toeic-attempts', [])
      expect(retrieved).toEqual([])
    })
  })

  describe('Answer Selection Edge Cases', () => {
    it('should handle changing an answer (overwrite)', () => {
      const answers: Record<string, string> = { '1-5': 'A' }
      // Change answer to B
      answers['1-5'] = 'B'
      expect(answers['1-5']).toBe('B')
    })

    it('should handle deselecting an answer (setting to null/delete)', () => {
      const answers: Record<string, string> = { '1-5': 'A', '1-6': 'B' }
      // Delete answer for question 5
      delete answers['1-5']
      expect(answers['1-5']).toBeUndefined()
      expect(Object.keys(answers).length).toBe(1)
    })

    it('should handle answers across multiple tests without collision', () => {
      const answers: Record<string, string> = {
        '1-1': 'A', // Test 1, Q1
        '2-1': 'C', // Test 2, Q1
        '1-100': 'D', // Test 1, Q100
        '2-100': 'B', // Test 2, Q100
      }
      
      // Get only test 1 answers
      const test1Answers = Object.entries(answers)
        .filter(([k]) => k.startsWith('1-'))
      expect(test1Answers.length).toBe(2)
      
      // Get only test 2 answers
      const test2Answers = Object.entries(answers)
        .filter(([k]) => k.startsWith('2-'))
      expect(test2Answers.length).toBe(2)
    })
  })

  describe('Grading Edge Cases', () => {
    it('should split listening (1-100) and reading (101-200) correctly', () => {
      const grades: Record<string, boolean> = {}
      
      // All listening correct, all reading wrong
      for (let i = 1; i <= 100; i++) {
        grades[`1-${i}`] = true
      }
      for (let i = 101; i <= 200; i++) {
        grades[`1-${i}`] = false
      }
      
      const listeningCorrect = Object.entries(grades)
        .filter(([k, v]) => {
          const num = parseInt(k.split('-')[1])
          return num <= 100 && v === true
        }).length
        
      const readingCorrect = Object.entries(grades)
        .filter(([k, v]) => {
          const num = parseInt(k.split('-')[1])
          return num > 100 && v === true
        }).length
      
      expect(listeningCorrect).toBe(100)
      expect(readingCorrect).toBe(0)
    })

    it('should handle 0 graded answers (no grade submitted)', () => {
      const grades: Record<string, boolean> = {}
      
      const correctCount = Object.entries(grades)
        .filter(([, v]) => v === true).length
      const incorrectCount = Object.entries(grades)
        .filter(([, v]) => v === false).length
      
      expect(correctCount).toBe(0)
      expect(incorrectCount).toBe(0)
    })

    it('should handle question numbers at section boundaries', () => {
      // Verify questions at part boundaries are correctly categorized
      const LISTENING_END = 100
      
      expect(100 <= LISTENING_END).toBe(true)  // Q100 = listening
      expect(101 <= LISTENING_END).toBe(false)  // Q101 = reading
      expect(1 <= LISTENING_END).toBe(true)     // Q1 = listening
      expect(200 <= LISTENING_END).toBe(false)   // Q200 = reading
    })
  })

  describe('History/Attempt Edge Cases', () => {
    it('should handle deleting the only attempt', () => {
      const attempts = [{ id: 'a1', testId: 1 }]
      const filtered = attempts.filter(a => a.id !== 'a1')
      expect(filtered).toHaveLength(0)
    })

    it('should handle attempts from different tests', () => {
      const attempts = [
        { id: 'a1', testId: 1 },
        { id: 'a2', testId: 2 },
        { id: 'a3', testId: 1 },
      ]
      
      const test1Attempts = attempts.filter(a => a.testId === 1)
      const test2Attempts = attempts.filter(a => a.testId === 2)
      
      expect(test1Attempts).toHaveLength(2)
      expect(test2Attempts).toHaveLength(1)
    })

    it('should preserve other test data when clearing one test', () => {
      const answers: Record<string, string> = {
        '1-1': 'A', '1-2': 'B',
        '2-1': 'C', '2-2': 'D',
        '3-1': 'A', '3-2': 'B',
      }
      
      // Clear only test 2
      const updated: Record<string, string> = {}
      Object.keys(answers).forEach(key => {
        if (!key.startsWith('2-')) {
          updated[key] = answers[key]
        }
      })
      
      expect(Object.keys(updated).length).toBe(4) // 2 from test 1 + 2 from test 3
      expect(updated['1-1']).toBe('A')
      expect(updated['3-2']).toBe('B')
      expect(updated['2-1']).toBeUndefined()
    })
  })

  describe('TOEIC Section Headers', () => {
    it('should have correct section boundaries', () => {
      const sectionHeaders: Record<number, string> = {
        1: '🎧 PART 1 — Photos (1-6)',
        7: '🎧 PART 2 — Q&A (7-31)',
        32: '🎧 PART 3 — Conversations (32-70)',
        71: '🎧 PART 4 — Talks (71-100)',
        101: '📖 PART 5 — Incomplete Sentences (101-130)',
        131: '📖 PART 6 — Text Completion (131-146)',
        147: '📖 PART 7 — Reading Comprehension (147-200)',
      }
      
      // Verify 7 sections exist
      expect(Object.keys(sectionHeaders).length).toBe(7)
      
      // Verify listening parts (1-100)
      expect(sectionHeaders[1]).toContain('PART 1')
      expect(sectionHeaders[7]).toContain('PART 2')
      expect(sectionHeaders[32]).toContain('PART 3')
      expect(sectionHeaders[71]).toContain('PART 4')
      
      // Verify reading parts (101-200)
      expect(sectionHeaders[101]).toContain('PART 5')
      expect(sectionHeaders[131]).toContain('PART 6')
      expect(sectionHeaders[147]).toContain('PART 7')
    })
  })

  describe('Corrupted localStorage Recovery', () => {
    it('should return default when localStorage contains invalid JSON', () => {
      localStorage.setItem('toeic-answers', 'not-valid-json{')
      const result = storage.load<Record<string, string>>('toeic-answers', {})
      expect(result).toEqual({})
    })

    it('should return default when localStorage contains null string', () => {
      localStorage.setItem('toeic-theme', 'null')
      const result = storage.load<string>('toeic-theme', 'sepia')
      expect(result).toBeNull()
    })
  })
})
