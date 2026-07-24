import { useState, useEffect } from 'react';
import { Check, X, Trash2, Award, BookOpen, CheckCircle, Filter } from 'lucide-react';
import { answerKeys } from '../data/answerKeys';
import type { Attempt } from '../types/attempt';
import { ProgressChart } from './ProgressChart';

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
];

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
];

const TOTAL_QUESTIONS = 200;
const LISTENING_END = 100;

const sectionHeaders: Record<number, string> = {
  1: '🎧 PART 1 — Photos (1-6)',
  7: '🎧 PART 2 — Q&A (7-31)',
  32: '🎧 PART 3 — Conversations (32-70)',
  71: '🎧 PART 4 — Talks (71-100)',
  101: '📖 PART 5 — Incomplete Sentences (101-130)',
  131: '📖 PART 6 — Text Completion (131-146)',
  147: '📖 PART 7 — Reading Comprehension (147-200)',
};

interface AnswerSheetProps {
  testId: number;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  onAnswerChange: (questionNum: number, answer: 'A' | 'B' | 'C' | 'D' | null) => void;
  grades: Record<string, boolean>;
  onGradeChange: (questionNum: number, isCorrect: boolean | null) => void;
  onClearAnswers: () => void;
  onAutoGrade?: () => void;
  attempts: Attempt[];
  onSaveAttempt: (correctCount: number, incorrectCount: number, estimatedScore: number) => void;
  onDeleteAttempt: (attemptId: string) => void;
}

export function AnswerSheet({
  testId,
  answers,
  onAnswerChange,
  grades,
  onGradeChange,
  onClearAnswers,
  onAutoGrade,
  attempts,
  onSaveAttempt,
  onDeleteAttempt
}: AnswerSheetProps) {
  const [tab, setTab] = useState<'doing' | 'grading' | 'history'>('doing');
  const [showOnlyWrong, setShowOnlyWrong] = useState<boolean>(false);
  const [selectedAttemptId, setSelectedAttemptId] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    message: '',
    onConfirm: () => {}
  });

  const [isBackupOpen, setIsBackupOpen] = useState<boolean>(false);
  const [backupCodeInput, setBackupCodeInput] = useState<string>('');

  const isGrading = tab === 'grading';
  const hasKey = testId in answerKeys;

  // Helper to estimate TOEIC scores based on correct answers from standard tables
  const estimateListeningScore = (correctCount: number) => {
    return listeningScoreTable[Math.min(correctCount, 100)] ?? 5;
  };

  const estimateReadingScore = (correctCount: number) => {
    return readingScoreTable[Math.min(correctCount, 100)] ?? 5;
  };

  const [timeLeft, setTimeLeft] = useState<number>(45 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    const expiration = Date.now() + timeLeft * 1000;
    localStorage.setItem(`toeic-timer-expiration-${testId}`, expiration.toString());
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
    localStorage.removeItem(`toeic-timer-expiration-${testId}`);
    localStorage.setItem(`toeic-timer-left-${testId}`, timeLeft.toString());
  };

  const handleTimeUp = () => {
    // 1. Trigger auto grading
    if (onAutoGrade) onAutoGrade();
    
    // 2. Compute stats synchronously
    const keyAnswers = answerKeys[testId];
    let correct = 0;
    let incorrect = 0;
    for (let num = 1; num <= TOTAL_QUESTIONS; num++) {
      const qKey = `${testId}-${num}`;
      const userAns = answers[qKey];
      if (userAns !== undefined) {
        const correctAns = keyAnswers?.[num];
        if (correctAns && userAns === correctAns) {
          correct++;
        } else {
          incorrect++;
        }
      }
    }
    // Compute listening + reading correct counts
    let lCorrect = 0;
    let rCorrect = 0;
    for (let num = 1; num <= TOTAL_QUESTIONS; num++) {
      const qKey = `${testId}-${num}`;
      const userAns = answers[qKey];
      if (userAns !== undefined) {
        const correctAns = keyAnswers?.[num];
        if (correctAns && userAns === correctAns) {
          if (num <= LISTENING_END) lCorrect++;
          else rCorrect++;
        }
      }
    }
    const score = estimateListeningScore(lCorrect) + estimateReadingScore(rCorrect);

    // 3. Save attempt to history & reset sheet
    onSaveAttempt(correct, incorrect, score);
    setTab('history');

    // 4. Show custom modal warning
    setConfirmModal({
      isOpen: true,
      message: "⏰ Hết giờ 45 phút! Bài làm của bạn đã tự động được nộp và chấm điểm.",
      onConfirm: () => {}
    });
  };

  // Reset tab and details when test changes
  useEffect(() => {
    setTab('doing');
    setSelectedAttemptId(null);
  }, [testId]);

  // Sync / Load Timer on Test change or mount
  useEffect(() => {
    const savedTime = localStorage.getItem(`toeic-timer-left-${testId}`);
    const savedExpiration = localStorage.getItem(`toeic-timer-expiration-${testId}`);

    if (savedExpiration) {
      const expiration = parseInt(savedExpiration, 10);
      const remaining = Math.max(0, Math.ceil((expiration - Date.now()) / 1000));
      if (remaining > 0) {
        setTimeLeft(remaining);
        setIsTimerRunning(true);
        return;
      } else {
        setTimeLeft(0);
        setIsTimerRunning(false);
        handleTimeUp();
        return;
      }
    }

    if (savedTime) {
      setTimeLeft(parseInt(savedTime, 10));
    } else {
      setTimeLeft(45 * 60);
    }
    setIsTimerRunning(false);
  }, [testId]);

  // Tick effect
  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      const savedExpiration = localStorage.getItem(`toeic-timer-expiration-${testId}`);
      if (savedExpiration) {
        const expiration = parseInt(savedExpiration, 10);
        const remaining = Math.max(0, Math.ceil((expiration - Date.now()) / 1000));
        if (remaining <= 0) {
          setTimeLeft(0);
          setIsTimerRunning(false);
          localStorage.removeItem(`toeic-timer-expiration-${testId}`);
          localStorage.removeItem(`toeic-timer-left-${testId}`);
          clearInterval(interval);
          handleTimeUp();
        } else {
          setTimeLeft(remaining);
        }
      } else {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            clearInterval(interval);
            handleTimeUp();
            return 0;
          }
          localStorage.setItem(`toeic-timer-left-${testId}`, (prev - 1).toString());
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, testId]);

  // Reset timer state when answers are cleared (e.g. answers for testId become empty)
  useEffect(() => {
    const activeTestAnswers = Object.keys(answers).filter(k => k.startsWith(`${testId}-`));
    if (activeTestAnswers.length === 0) {
      setTimeLeft(45 * 60);
      setIsTimerRunning(false);
      localStorage.removeItem(`toeic-timer-left-${testId}`);
      localStorage.removeItem(`toeic-timer-expiration-${testId}`);
    }
  }, [answers, testId]);

  const handleAnswerSelect = (num: number, ans: 'A' | 'B' | 'C' | 'D' | null) => {
    if (!isTimerRunning && timeLeft > 0 && tab === 'doing') {
      startTimer();
    }
    onAnswerChange(num, ans);
  };

  const getAnswerKey = (num: number) => `${testId}-${num}`;
  
  // Count stats
  const answeredCount = Object.keys(answers).filter(k => k.startsWith(`${testId}-`)).length;
  
  const correctCount = Object.entries(grades)
    .filter(([k, val]) => k.startsWith(`${testId}-`) && val === true)
    .length;
    
  const incorrectCount = Object.entries(grades)
    .filter(([k, val]) => k.startsWith(`${testId}-`) && val === false)
    .length;

  // Separate Listening (1-100) and Reading (101-200) correct counts
  const listeningCorrect = Object.entries(grades)
    .filter(([k, val]) => {
      if (!k.startsWith(`${testId}-`) || val !== true) return false;
      const num = parseInt(k.split('-')[1]);
      return num <= LISTENING_END;
    }).length;

  const readingCorrect = Object.entries(grades)
    .filter(([k, val]) => {
      if (!k.startsWith(`${testId}-`) || val !== true) return false;
      const num = parseInt(k.split('-')[1]);
      return num > LISTENING_END;
    }).length;

  const listeningScore = estimateListeningScore(listeningCorrect);
  const readingScore = estimateReadingScore(readingCorrect);
  const totalScore = listeningScore + readingScore;

  return (
    <div className="flex h-full w-80 flex-col border-l border-app-border bg-app-card shadow-lg select-none">
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-app-border bg-app-card px-4 shrink-0">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-app-accent" />
          <span className="text-sm font-bold text-app-text">Answer Sheet (Test {testId})</span>
        </div>
        <button
          onClick={() => {
            setConfirmModal({
              isOpen: true,
              message: "Bạn muốn xóa toàn bộ đáp án đang làm của Test " + testId + "?",
              onConfirm: () => onClearAnswers()
            });
          }}
          title="Xóa bài đang làm"
          className="rounded p-1.5 text-app-text/40 hover:bg-app-hover hover:text-rose-500 transition-colors cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Timer Bar */}
      {tab === 'doing' && (
        <div className="flex items-center justify-between border-b border-app-border bg-app-card px-4 py-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className={`flex h-2 w-2 rounded-full ${isTimerRunning ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`}></span>
            <span className="text-xs font-bold text-app-text/70 uppercase tracking-wider">Thời gian nghe:</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`text-sm font-mono font-extrabold tracking-wider ${timeLeft <= 60 ? 'text-rose-500 animate-pulse' : 'text-app-accent'}`}>
              {formatTime(timeLeft)}
            </span>
            
            <button
              onClick={isTimerRunning ? pauseTimer : startTimer}
              className={`rounded px-2.5 py-1 text-[10px] font-bold border transition-all cursor-pointer shadow-xs ${
                isTimerRunning
                  ? 'border-amber-500/30 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20'
                  : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20'
              }`}
            >
              {isTimerRunning ? 'Tạm dừng' : 'Bắt đầu'}
            </button>
          </div>
        </div>
      )}

      {/* Mode Selector */}
      <div className="flex flex-col border-b border-app-border bg-app-bg/50 p-2 gap-2 shrink-0">
        <div className="flex gap-1 bg-app-bg p-0.5 rounded-lg border border-app-border">
          <button
            onClick={() => setTab('doing')}
            className={`flex-1 rounded-md py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
              tab === 'doing'
                ? 'bg-app-accent text-white shadow-xs'
                : 'text-app-text/60 hover:bg-app-hover'
            }`}
          >
            Doing
          </button>
          <button
            onClick={() => {
              setTab('grading');
              if (onAutoGrade) onAutoGrade();
            }}
            className={`flex-1 rounded-md py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
              tab === 'grading'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-app-text/60 hover:bg-app-hover'
            }`}
          >
            Grading
          </button>
          <button
            onClick={() => setTab('history')}
            className={`flex-1 rounded-md py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
              tab === 'history'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-app-text/60 hover:bg-app-hover'
            }`}
          >
            History
          </button>
        </div>
        {isGrading && (
          <div className={`text-[10px] text-center font-medium py-1 rounded select-text ${
            hasKey ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/5' : 'text-amber-600 dark:text-amber-400 bg-amber-500/5'
          }`}>
            {hasKey 
              ? '✨ Đã tự động chấm điểm theo đáp án chuẩn!' 
              : '⚠️ Chưa có đáp án tự động cho Test này (Tự chấm bằng nút Check/X)'}
          </div>
        )}
      </div>

      {/* Scrollable Questions list or History attempts */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
        {tab === 'history' ? (
          /* History View */
          <div className="flex flex-col gap-3">
            {/* Progress Chart */}
            <ProgressChart attempts={attempts} />

            {attempts.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-app-border rounded-xl bg-app-bg/10 min-h-60">
                <Award className="h-10 w-10 text-app-text/20 mb-2" />
                <span className="text-xs font-semibold text-app-text/60">Chưa có lịch sử làm bài</span>
                <p className="text-[10px] text-app-text/40 mt-1 max-w-[200px] leading-relaxed">
                  Hãy làm bài trắc nghiệm và bấm "Nộp bài & Lưu lịch sử" ở tab Chấm điểm để lưu kết quả.
                </p>
              </div>
            ) : (
              attempts.map((attempt) => {
                const isDetailOpen = selectedAttemptId === attempt.id;
                return (
                  <div key={attempt.id} className="rounded-xl border border-app-border bg-app-card p-3 shadow-xs transition-all flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-app-text/40 font-bold uppercase">{attempt.timestamp}</span>
                        <span className="text-xs font-extrabold text-app-text mt-1">
                          Đúng: <span className="text-emerald-500">{attempt.correctCount}/100</span>
                        </span>
                        <span className="text-xs text-app-text/60 mt-0.5">
                          Điểm ước lượng: <span className="font-bold text-app-accent">{attempt.estimatedScore}/495</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedAttemptId(isDetailOpen ? null : attempt.id)}
                          className="rounded px-2.5 py-1 text-[10px] font-bold border border-app-border bg-app-bg text-app-text/75 hover:bg-app-hover hover:text-app-text transition-all cursor-pointer"
                        >
                          {isDetailOpen ? "Đóng" : "Chi tiết"}
                        </button>
                        <button
                          onClick={() => {
                            setConfirmModal({
                              isOpen: true,
                              message: "Xóa lịch sử lần làm bài này?",
                              onConfirm: () => {
                                onDeleteAttempt(attempt.id);
                                if (isDetailOpen) setSelectedAttemptId(null);
                              }
                            });
                          }}
                          className="rounded p-1 text-app-text/40 hover:bg-app-hover hover:text-rose-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {isDetailOpen && (
                      <div className="mt-2.5 border-t border-app-border/40 pt-2 flex flex-col gap-2">
                        <span className="text-[9px] font-bold text-app-text/40 uppercase tracking-wider block">
                          Bản đồ câu trả lời:
                        </span>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[8px] font-bold text-app-text/40">🎧 Listening (1-100)</span>
                          <div className="grid grid-cols-10 gap-1 rounded-lg border border-app-border bg-app-bg/30 p-2">
                            {Array.from({ length: 100 }, (_, i) => {
                              const num = i + 1;
                              const qKey = `${attempt.testId}-${num}`;
                              const isCorrect = attempt.grades[qKey];
                              const ans = attempt.answers[qKey];
                              let bgClass = "bg-app-card text-app-text/30 border border-app-border/40";
                              const correctAns = answerKeys[attempt.testId]?.[num];
                              let titleText = `Câu ${num}: Chưa trả lời`;
                              if (ans) {
                                if (isCorrect) {
                                  bgClass = "bg-emerald-500/90 text-white font-bold shadow-xs";
                                  titleText = `Câu ${num}: Bạn chọn ${ans} (Đúng)`;
                                } else {
                                  bgClass = "bg-rose-500/90 text-white font-bold shadow-xs";
                                  titleText = `Câu ${num}: Bạn chọn ${ans} (Sai). Đáp án đúng: ${correctAns || 'Chưa rõ'}`;
                                }
                              }
                              return (
                                <div key={num} title={titleText} className={`flex aspect-square items-center justify-center rounded text-[9px] font-bold ${bgClass}`}>
                                  {num}
                                </div>
                              );
                            })}
                          </div>
                          <span className="text-[8px] font-bold text-app-text/40 mt-1">📖 Reading (101-200)</span>
                          <div className="grid grid-cols-10 gap-1 rounded-lg border border-app-border bg-app-bg/30 p-2">
                            {Array.from({ length: 100 }, (_, i) => {
                              const num = i + 101;
                              const qKey = `${attempt.testId}-${num}`;
                              const isCorrect = attempt.grades[qKey];
                              const ans = attempt.answers[qKey];
                              let bgClass = "bg-app-card text-app-text/30 border border-app-border/40";
                              const correctAns = answerKeys[attempt.testId]?.[num];
                              let titleText = `Câu ${num}: Chưa trả lời`;
                              if (ans) {
                                if (isCorrect) {
                                  bgClass = "bg-emerald-500/90 text-white font-bold shadow-xs";
                                  titleText = `Câu ${num}: Bạn chọn ${ans} (Đúng)`;
                                } else {
                                  bgClass = "bg-rose-500/90 text-white font-bold shadow-xs";
                                  titleText = `Câu ${num}: Bạn chọn ${ans} (Sai). Đáp án đúng: ${correctAns || 'Chưa rõ'}`;
                                }
                              }
                              return (
                                <div key={num} title={titleText} className={`flex aspect-square items-center justify-center rounded text-[9px] font-bold ${bgClass}`}>
                                  {num}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Full scrollable list of 100 questions */}
                        <div className="max-h-40 overflow-y-auto border border-app-border rounded-lg bg-app-bg/50 p-2 flex flex-col gap-1 text-[10px]">
                          <span className="font-bold text-app-text/60 uppercase tracking-wider text-[8px] mb-1 block sticky top-0 bg-app-card/90 py-0.5 backdrop-blur-xs">
                            Chi tiết đáp án 200 câu:
                          </span>
                          {Array.from({ length: TOTAL_QUESTIONS }, (_, i) => {
                            const num = i + 1;
                            const qKey = `${attempt.testId}-${num}`;
                            const isCorrect = attempt.grades[qKey];
                            const ans = attempt.answers[qKey];
                            const correctAns = answerKeys[attempt.testId]?.[num];

                            if (!ans) {
                              return (
                                <div key={num} className="flex items-center justify-between py-0.5 border-b border-app-border/20 last:border-b-0 text-app-text/30">
                                  <span>Câu {num.toString().padStart(2, '0')}:</span>
                                  <span className="font-semibold italic">Chưa trả lời</span>
                                </div>
                              );
                            }

                            return (
                              <div key={num} className="flex items-center justify-between py-0.5 border-b border-app-border/20 last:border-b-0">
                                <span className="font-bold text-app-text/50">Câu {num.toString().padStart(2, '0')}:</span>
                                {isCorrect ? (
                                  <>
                                    <span className="text-emerald-500 font-bold">Bạn chọn {ans}</span>
                                    <span className="text-emerald-600 font-semibold text-[9px]">(Đúng)</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-rose-500 font-bold">Bạn chọn {ans}</span>
                                    <span className="text-emerald-500 font-semibold text-[9px]">Đúng: {correctAns || 'Chưa rõ'}</span>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Sync & Backup Utility */}
            <div className="border border-app-border bg-app-bg/30 p-3 rounded-xl flex flex-col gap-2 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-app-text/50 uppercase tracking-wider">
                  💾 Đồng bộ & Sao lưu dữ liệu
                </span>
                <button
                  onClick={() => setIsBackupOpen(!isBackupOpen)}
                  className="text-[10px] font-bold text-app-accent hover:underline cursor-pointer"
                >
                  {isBackupOpen ? "Đóng" : "Mở rộng"}
                </button>
              </div>

              {isBackupOpen && (
                <div className="flex flex-col gap-2 pt-2 border-t border-app-border/40">
                  <p className="text-[10px] text-app-text/50 leading-relaxed">
                    Sao chép dữ liệu bài làm và lịch sử giữa 2 trình duyệt Chrome khác nhau của bạn:
                  </p>
                  
                  <button
                    onClick={() => {
                      try {
                        const data: Record<string, string | null> = {};
                        for (let i = 0; i < localStorage.length; i++) {
                          const key = localStorage.key(i);
                          if (key && key.startsWith('toeic-')) {
                            data[key] = localStorage.getItem(key);
                          }
                        }
                        const code = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
                        navigator.clipboard.writeText(code);
                        alert("✨ Đã sao chép mã sao lưu vào bộ nhớ tạm! Hãy mở Chrome còn lại, dán mã vào phần Khôi phục bên dưới.");
                      } catch (e) {
                        alert("Lỗi khi tạo mã sao lưu!");
                      }
                    }}
                    className="w-full rounded-lg border border-app-accent/30 bg-app-accent/10 py-1.5 text-[10px] font-bold text-app-accent hover:bg-app-accent/20 transition-all cursor-pointer text-center"
                  >
                    Bước 1: Sao chép dữ liệu (Chrome cũ)
                  </button>

                  <div className="flex flex-col gap-1.5 mt-1">
                    <span className="text-[10px] font-bold text-app-text/50">Bước 2: Khôi phục (Chrome mới):</span>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        placeholder="Dán mã sao lưu vào đây..."
                        value={backupCodeInput}
                        onChange={(e) => setBackupCodeInput(e.target.value)}
                        className="flex-1 rounded-lg border border-app-border bg-app-bg px-2.5 py-1 text-[10px] text-app-text placeholder-app-text/30 outline-hidden"
                      />
                      <button
                        onClick={() => {
                          if (!backupCodeInput.trim()) {
                            alert("Vui lòng dán mã sao lưu!");
                            return;
                          }
                          try {
                            const jsonStr = decodeURIComponent(escape(atob(backupCodeInput.trim())));
                            const data = JSON.parse(jsonStr);
                            let count = 0;
                            Object.entries(data).forEach(([key, val]) => {
                              if (key.startsWith('toeic-') && typeof val === 'string') {
                                localStorage.setItem(key, val);
                                count++;
                              }
                            });
                            if (count > 0) {
                              alert("✨ Khôi phục dữ liệu thành công! Trang web sẽ tải lại.");
                              window.location.reload();
                            } else {
                              alert("Không tìm thấy dữ liệu TOEIC hợp lệ!");
                            }
                          } catch (e) {
                            alert("Mã sao lưu không hợp lệ, vui lòng kiểm tra lại!");
                          }
                        }}
                        className="rounded-lg bg-emerald-600 px-3 py-1 text-[10px] font-bold text-white hover:bg-emerald-500 transition-all cursor-pointer"
                      >
                        Khôi phục
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Normal Question list (Doing / Grading) */
          Array.from({ length: TOTAL_QUESTIONS }, (_, i) => {
            const num = i + 1;
            const header = sectionHeaders[num];

            // Filter: only show wrong answers in grading mode
            if (showOnlyWrong && isGrading) {
              const key = getAnswerKey(num);
              const grade = grades[key];
              if (grade !== false) {
                // Still render section headers even if filtering
                if (header) {
                  return (
                    <div key={`header-${num}`} className="mt-3 mb-1 px-1">
                      <span className="text-[10px] font-bold text-app-accent uppercase tracking-wider">{header}</span>
                    </div>
                  );
                }
                return null;
              }
            }
            const key = getAnswerKey(num);
            const selectedAns = answers[key];
            const grade = grades[key];

            const elements: React.ReactNode[] = [];

            // Add section header if applicable
            if (header && !showOnlyWrong) {
              elements.push(
                <div key={`header-${num}`} className={`${num > 1 ? 'mt-3' : ''} mb-1 px-1`}>
                  <span className="text-[10px] font-bold text-app-accent uppercase tracking-wider">{header}</span>
                </div>
              );
            }

            elements.push(
              <div 
                key={num}
                className={`flex items-center justify-between rounded-lg p-2 transition-all ${
                  grade === true 
                    ? 'bg-emerald-500/10 border border-emerald-500/20' 
                    : grade === false
                    ? 'bg-rose-500/10 border border-rose-500/20'
                    : 'bg-app-bg border border-app-border/40 hover:border-app-border'
                }`}
              >
                {/* Question Number */}
                <div className="flex items-center gap-1.5 w-12">
                  <span className="text-xs font-bold text-app-text/50">{num.toString().padStart(3, '0')}.</span>
                  {grade === true && <Check className="h-3.5 w-3.5 text-emerald-500 stroke-[3]" />}
                  {grade === false && <X className="h-3.5 w-3.5 text-rose-500 stroke-[3]" />}
                </div>

                {/* Answers A, B, C, D */}
                <div className="flex items-center gap-2">
                  {(['A', 'B', 'C', 'D'] as const).map((ans) => (
                    <button
                      key={ans}
                      disabled={isGrading}
                      onClick={() => handleAnswerSelect(num, selectedAns === ans ? null : ans)}
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all border cursor-pointer ${
                        selectedAns === ans
                          ? 'bg-app-accent text-white border-app-accent shadow-xs'
                          : 'bg-app-card text-app-text/70 border-app-border hover:bg-app-hover disabled:hover:bg-transparent'
                      }`}
                    >
                      {ans}
                    </button>
                  ))}
                </div>

                {/* Grading Buttons (only in Grading mode) + correct answer hint */}
                <div className="w-14 flex justify-end gap-1">
                  {isGrading && selectedAns && (
                    <>
                      {grade === false && (
                        <span className="text-[9px] font-bold text-emerald-500 mr-0.5" title="Đáp án đúng">
                          {answerKeys[testId]?.[num] || '?'}
                        </span>
                      )}
                      <button
                        onClick={() => onGradeChange(num, grade === true ? null : true)}
                        title="Mark Correct"
                        className={`rounded p-1 transition-all cursor-pointer ${
                          grade === true
                            ? 'bg-emerald-500 text-white'
                            : 'text-emerald-500 hover:bg-emerald-500/10'
                        }`}
                      >
                        <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                      </button>
                      <button
                        onClick={() => onGradeChange(num, grade === false ? null : false)}
                        title="Mark Incorrect"
                        className={`rounded p-1 transition-all cursor-pointer ${
                          grade === false
                            ? 'bg-rose-500 text-white'
                            : 'text-rose-500 hover:bg-rose-500/10'
                        }`}
                      >
                        <X className="h-3.5 w-3.5 stroke-[2.5]" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );

            return elements;
          })
        )}
      </div>

      {/* Summary Footer */}
      <div className="border-t border-app-border bg-app-bg p-4 flex flex-col gap-3 shrink-0">
        {tab === 'doing' ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-semibold text-app-text/70">
              <span>Answered: {answeredCount} / {TOTAL_QUESTIONS}</span>
              <button
                onClick={() => {
                  setTab('grading');
                  if (onAutoGrade) onAutoGrade();
                }}
                className="text-app-accent hover:underline flex items-center gap-1 cursor-pointer font-bold"
              >
                <CheckCircle className="h-3.5 w-3.5" /> Start Grading
              </button>
            </div>
            {answeredCount > 0 && (
              <button
                onClick={() => {
                  setConfirmModal({
                    isOpen: true,
                    message: "Xóa toàn bộ đáp án đang làm của Test " + testId + "?",
                    onConfirm: () => onClearAnswers()
                  });
                }}
                className="flex w-full items-center justify-center gap-1 rounded bg-rose-500/10 border border-rose-500/20 py-1.5 text-[11px] font-bold text-rose-600 hover:bg-rose-500/20 active:scale-98 transition-all cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Xóa bài đang làm
              </button>
            )}
          </div>
        ) : tab === 'grading' ? (
          <div className="flex flex-col gap-2.5">
            {/* Score Stats */}
            <div className="flex items-center justify-between text-xs font-bold text-app-text/70">
              <span className="text-emerald-600">Correct: {correctCount}</span>
              <span className="text-rose-600">Incorrect: {incorrectCount}</span>
              <span className="text-app-text/40">Un-graded: {TOTAL_QUESTIONS - correctCount - incorrectCount}</span>
            </div>

            {/* Filter wrong answers toggle */}
            <button
              onClick={() => setShowOnlyWrong(!showOnlyWrong)}
              className={`flex w-full items-center justify-center gap-1.5 rounded-lg border py-1.5 text-[11px] font-bold transition-all cursor-pointer ${
                showOnlyWrong
                  ? 'border-rose-500/30 bg-rose-500/10 text-rose-600'
                  : 'border-app-border bg-app-bg text-app-text/60 hover:bg-app-hover'
              }`}
            >
              <Filter className="h-3.5 w-3.5" />
              {showOnlyWrong ? 'Đang lọc: Chỉ câu sai' : 'Lọc xem câu sai'}
            </button>
            
            {/* Estimate Score Output */}
            <div className="flex flex-col gap-1.5 rounded-lg bg-app-accent/10 border border-app-accent/20 p-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-app-text/60">🎧 Listening:</span>
                <span className="text-xs font-extrabold text-app-accent">{listeningScore} / 495</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-app-text/60">📖 Reading:</span>
                <span className="text-xs font-extrabold text-app-accent">{readingScore} / 495</span>
              </div>
              <div className="flex items-center justify-between border-t border-app-accent/20 pt-1.5">
                <div className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-app-accent" />
                  <span className="text-xs font-bold text-app-text">Total TOEIC:</span>
                </div>
                <span className="text-base font-extrabold text-app-accent">{totalScore} / 990</span>
              </div>
            </div>

            {/* Save & Reset Button */}
            <button
              onClick={() => {
                setConfirmModal({
                  isOpen: true,
                  message: "Lưu lịch sử bài làm này và reset để làm lại từ đầu?",
                  onConfirm: () => {
                    onSaveAttempt(correctCount, incorrectCount, totalScore);
                    setTab('history');
                  }
                });
              }}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-app-accent py-2 text-xs font-bold text-white hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-xs mt-1"
            >
              <CheckCircle className="h-4 w-4 animate-pulse" />
              Nộp bài & Lưu lịch sử
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between text-[11px] text-app-text/50 font-medium">
            <span>Tổng số lần làm: {attempts.length}</span>
            <button
              onClick={() => setTab('doing')}
              className="text-app-accent hover:underline cursor-pointer font-bold"
            >
              Làm Đề Mới
            </button>
          </div>
        )}
      </div>

      {/* Premium Confirm Modal Overlay */}
      {confirmModal.isOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-app-card border border-app-border rounded-xl p-4 shadow-xl max-w-[260px] text-center flex flex-col gap-3 animate-scale-in">
            <span className="text-xs font-bold text-app-text select-text">{confirmModal.message}</span>
            <div className="flex gap-2">
              <button
                id="modal-cancel-btn"
                onClick={() => setConfirmModal({ isOpen: false, message: '', onConfirm: () => {} })}
                className="flex-1 rounded-lg border border-app-border bg-app-bg py-1.5 text-xs font-bold text-app-text/70 hover:bg-app-hover cursor-pointer"
              >
                Hủy
              </button>
              <button
                id="modal-confirm-btn"
                onClick={() => {
                  confirmModal.onConfirm();
                  setConfirmModal({ isOpen: false, message: '', onConfirm: () => {} });
                }}
                className="flex-1 rounded-lg bg-rose-500 py-1.5 text-xs font-bold text-white hover:opacity-90 active:scale-98 transition-all cursor-pointer animate-pulse-light"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
