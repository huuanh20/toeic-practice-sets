export interface Attempt {
  id: string;
  testId: number;
  timestamp: string;      // Formatted date and time (e.g. "15/07/2026 13:58")
  correctCount: number;   // Number of correct answers
  incorrectCount: number; // Number of incorrect answers
  estimatedScore: number; // Estimated Listening score
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>; // Raw answers selected (keys: "testId-num")
  grades: Record<string, boolean>;                // Grading results (keys: "testId-num")
}
