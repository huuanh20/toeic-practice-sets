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

describe('localStorage Storage Operations', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  describe('Answer Storage', () => {
    it('should save and retrieve answers correctly', () => {
      const answers = { '1-1': 'A', '1-2': 'B', '1-3': 'C' }
      localStorage.setItem('toeic-answers', JSON.stringify(answers))
      
      const retrieved = JSON.parse(localStorage.getItem('toeic-answers')!)
      expect(retrieved).toEqual(answers)
    })

    it('should handle empty answers', () => {
      localStorage.setItem('toeic-answers', JSON.stringify({}))
      
      const retrieved = JSON.parse(localStorage.getItem('toeic-answers')!)
      expect(retrieved).toEqual({})
    })

    it('should handle 200 answers without data loss', () => {
      const answers: Record<string, string> = {}
      for (let i = 1; i <= 200; i++) {
        answers[`1-${i}`] = ['A', 'B', 'C', 'D'][i % 4]
      }
      
      localStorage.setItem('toeic-answers', JSON.stringify(answers))
      const retrieved = JSON.parse(localStorage.getItem('toeic-answers')!)
      
      expect(Object.keys(retrieved).length).toBe(200)
      for (let i = 1; i <= 200; i++) {
        expect(retrieved[`1-${i}`]).toBe(answers[`1-${i}`])
      }
    })
  })

  describe('Clear Answers for a Test', () => {
    it('should only clear answers for the specified test', () => {
      const answers: Record<string, string> = {
        '1-1': 'A', '1-2': 'B', '1-3': 'C',
        '2-1': 'D', '2-2': 'A', '2-3': 'B',
      }
      
      // Clear test 1 answers
      const cleared: Record<string, string> = {}
      Object.keys(answers).forEach(key => {
        if (!key.startsWith('1-')) {
          cleared[key] = answers[key]
        }
      })
      
      expect(Object.keys(cleared).length).toBe(3)
      expect(cleared['2-1']).toBe('D')
      expect(cleared['1-1']).toBeUndefined()
    })
  })

  describe('Attempt Storage', () => {
    it('should save attempts with all required fields', () => {
      const attempt = {
        id: 'test-uuid-123',
        testId: 1,
        timestamp: '25/07/2026 18:00',
        correctCount: 150,
        incorrectCount: 50,
        estimatedScore: 750,
        answers: { '1-1': 'A', '1-2': 'B' },
        grades: { '1-1': true, '1-2': false }
      }
      
      localStorage.setItem('toeic-attempts', JSON.stringify([attempt]))
      const retrieved = JSON.parse(localStorage.getItem('toeic-attempts')!)
      
      expect(retrieved).toHaveLength(1)
      expect(retrieved[0].testId).toBe(1)
      expect(retrieved[0].correctCount).toBe(150)
      expect(retrieved[0].estimatedScore).toBe(750)
    })

    it('should store multiple attempts in order (newest first)', () => {
      const attempts = [
        { id: 'a2', testId: 1, timestamp: '25/07/2026 19:00', correctCount: 180 },
        { id: 'a1', testId: 1, timestamp: '25/07/2026 18:00', correctCount: 150 },
      ]
      
      localStorage.setItem('toeic-attempts', JSON.stringify(attempts))
      const retrieved = JSON.parse(localStorage.getItem('toeic-attempts')!)
      
      expect(retrieved[0].id).toBe('a2')
      expect(retrieved[1].id).toBe('a1')
    })

    it('should delete a specific attempt by id', () => {
      const attempts = [
        { id: 'a1', testId: 1 },
        { id: 'a2', testId: 1 },
        { id: 'a3', testId: 2 },
      ]
      
      const filtered = attempts.filter(a => a.id !== 'a2')
      expect(filtered).toHaveLength(2)
      expect(filtered.map(a => a.id)).toEqual(['a1', 'a3'])
    })
  })

  describe('Theme Storage', () => {
    it('should store and retrieve theme', () => {
      localStorage.setItem('toeic-theme', JSON.stringify('dark'))
      const theme = JSON.parse(localStorage.getItem('toeic-theme')!)
      expect(theme).toBe('dark')
    })

    it('should support all three themes', () => {
      for (const theme of ['light', 'dark', 'sepia']) {
        localStorage.setItem('toeic-theme', JSON.stringify(theme))
        expect(JSON.parse(localStorage.getItem('toeic-theme')!)).toBe(theme)
      }
    })
  })

  describe('PDF Position Memory', () => {
    it('should save and restore per-test, per-tab positions', () => {
      const positions: Record<string, { page: number; zoom: number }> = {
        '1-practice': { page: 5, zoom: 1.2 },
        '1-transcript': { page: 12, zoom: 1.0 },
        '2-practice': { page: 3, zoom: 0.8 },
      }
      
      localStorage.setItem('toeic-pdf-positions', JSON.stringify(positions))
      const retrieved = JSON.parse(localStorage.getItem('toeic-pdf-positions')!)
      
      expect(retrieved['1-practice'].page).toBe(5)
      expect(retrieved['1-practice'].zoom).toBe(1.2)
      expect(retrieved['2-practice'].page).toBe(3)
    })
  })

  describe('Backup/Restore Code', () => {
    it('should encode and decode backup data correctly', () => {
      const data = {
        'toeic-answers': { '1-1': 'A', '1-2': 'B' },
        'toeic-grades': { '1-1': true, '1-2': false },
        'toeic-attempts': [{ id: 'a1', testId: 1 }],
      }
      
      // Encode (same as in AnswerSheet.tsx)
      const code = btoa(unescape(encodeURIComponent(JSON.stringify(data))))
      
      // Decode (same as in AnswerSheet.tsx)
      const decoded = JSON.parse(decodeURIComponent(escape(atob(code))))
      
      expect(decoded).toEqual(data)
    })

    it('should handle Vietnamese characters in notes correctly', () => {
      const data = {
        'toeic-notes': { 1: 'Ghi chú tiếng Việt: đây là bài test' }
      }
      
      const code = btoa(unescape(encodeURIComponent(JSON.stringify(data))))
      const decoded = JSON.parse(decodeURIComponent(escape(atob(code))))
      
      expect(decoded['toeic-notes'][1]).toBe('Ghi chú tiếng Việt: đây là bài test')
    })
  })
})
