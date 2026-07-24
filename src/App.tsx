import { useState, useEffect, useRef, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Toolbar } from './components/Toolbar';
import { PdfViewer } from './components/PdfViewer';
import { AudioPlayer } from './components/AudioPlayer';
import { NotesModal } from './components/NotesModal';
import { CommandPalette } from './components/CommandPalette';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { LibraryConfig } from './types/library';
import { AnswerSheet } from './components/AnswerSheet';
import { Loader2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ExternalLink, Sparkles, BookOpen, Menu } from 'lucide-react';
import { VocabularyQuiz } from './components/VocabularyQuiz';
import { answerKeys } from './data/answerKeys';
import type { Attempt } from './types/attempt';


export default function App() {
  const [config, setConfig] = useState<LibraryConfig | null>(null);
  const [loading, setLoading] = useState(true);

  // Persistent States
  const [theme, setTheme] = useLocalStorage<'light' | 'dark' | 'sepia'>('toeic-theme', 'sepia');
  const [notes, setNotes] = useLocalStorage<Record<number, string>>('toeic-notes', {});
  const [testProgress, setTestProgress] = useLocalStorage<Record<number, 'completed' | 'in-progress' | 'not-started'>>('toeic-progress', {});
  const [testAudioTimes, setTestAudioTimes] = useLocalStorage<Record<number, number>>('toeic-audio-times', {});
  const [sidebarWidth, setSidebarWidth] = useLocalStorage<number>('toeic-sidebar-width', 224);
  
  // PDF Read Position Memory: Record<`${testId}-${tab}`, { page: number; zoom: number }>
  const [pdfPositions, setPdfPositions] = useLocalStorage<Record<string, { page: number; zoom: number }>>('toeic-pdf-positions', {});

  // Recent Session State
  const [recent, setRecent] = useLocalStorage<{
    testId: number;
    tab: 'practice' | 'transcript' | 'vocabulary';
    page: number;
  }>('toeic-recent', { testId: 1, tab: 'practice', page: 2 });

  // Transient/Runtime States
  const [activeTestId, setActiveTestId] = useState(recent.testId);
  const [activeTab, setActiveTab] = useState(recent.tab);
  
  // Set initial page and zoom from memory
  const [page, setPage] = useState(recent.page);
  const [zoom, setZoom] = useState(1.0);
  const [numPages, setNumPages] = useState(0);
  
  const [playbackSpeed, setPlaybackSpeed] = useLocalStorage<number>('toeic-speed', 1.0);
  const [notesOpen, setNotesOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Split Screen States
  const [isSplit, setIsSplit] = useLocalStorage<boolean>('toeic-is-split', false);
  const [rightPage, setRightPage] = useState(1);
  const [rightZoom, setRightZoom] = useState(1.0);
  const [rightNumPages, setRightNumPages] = useState(0);

  // Vocabulary view mode state: 'pdf' = traditional PDF viewer, 'quizlet' = Quizlet interactive study
  const [vocabViewMode, setVocabViewMode] = useLocalStorage<'pdf' | 'quizlet'>('toeic-vocab-mode', 'pdf');

  // Answer Sheet States
  const [showAnswerSheet, setShowAnswerSheet] = useLocalStorage<boolean>('toeic-show-answer-sheet', false);
  const [answers, setAnswers] = useLocalStorage<Record<string, 'A' | 'B' | 'C' | 'D'>>('toeic-answers', {});
  const [grades, setGrades] = useLocalStorage<Record<string, boolean>>('toeic-grades', {});
  const [attempts, setAttempts] = useLocalStorage<Attempt[]>('toeic-attempts', []);

  // Mobile responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setMobileSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAutoGrade = useCallback(() => {
    const keyAnswers = answerKeys[activeTestId];
    if (!keyAnswers) return;

    setGrades((prev) => {
      const updated = { ...prev };
      for (let num = 1; num <= 200; num++) {
        const key = `${activeTestId}-${num}`;
        const userAns = answers[key];
        if (userAns !== undefined) {
          const correctAns = keyAnswers[num];
          updated[key] = userAns === correctAns;
        }
      }
      return updated;
    });
  }, [activeTestId, answers, setGrades]);

  // References
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isResizing = useRef(false);

  // Toggle Fullscreen Handler
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('Error enabling fullscreen', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Page Manual Paging (Updates PDF Read Position Memory)
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    
    // Save position to memory
    const key = `${activeTestId}-${activeTab}`;
    setPdfPositions((prev) => ({
      ...prev,
      [key]: { page: newPage, zoom }
    }));

    setRecent({ testId: activeTestId, tab: activeTab, page: newPage });
  };

  // Fetch library configuration
  useEffect(() => {
    fetch('/library/config.json')
      .then((res) => res.json())
      .then((data: LibraryConfig) => {
        setConfig(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load library configuration', err);
        setLoading(false);
      });
  }, []);

  // Update theme class on HTML body
  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(theme);
  }, [theme]);

  // Sync page and zoom when activeTestId or activeTab changes
  useEffect(() => {
    if (!config) return;
    const test = config.tests.find((t) => t.id === activeTestId) || config.tests[0];
    const key = `${activeTestId}-${activeTab}`;
    const saved = pdfPositions[key];

    if (saved) {
      setPage(saved.page);
      setZoom(saved.zoom);
    } else {
      let defaultPage = 1;
      if (activeTab === 'practice') defaultPage = test.practicePage;
      else if (activeTab === 'transcript') defaultPage = test.transcriptPage;
      
      setPage(defaultPage);
      setZoom(1.0);
    }
  }, [activeTestId, activeTab, config]);


  // Global Keyboard Shortcuts (Ctrl+K, Fullscreen 'F', PageUp/PageDown)
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.isContentEditable;

      if (isInput) return;

      // Ctrl + K -> Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }

      // F -> Toggle Fullscreen
      if (e.code === 'KeyF' && !e.ctrlKey && !e.metaKey && !notesOpen && !commandPaletteOpen) {
        e.preventDefault();
        handleToggleFullscreen();
      }

      // PageUp -> Previous Page
      if (e.key === 'PageUp' && !e.ctrlKey && !e.metaKey && !notesOpen && !commandPaletteOpen) {
        e.preventDefault();
        handlePageChange(Math.max(1, page - 1));
      }

      // PageDown -> Next Page
      if (e.key === 'PageDown' && !e.ctrlKey && !e.metaKey && !notesOpen && !commandPaletteOpen) {
        e.preventDefault();
        handlePageChange(Math.min(numPages, page + 1));
      }
    };

    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, [notesOpen, commandPaletteOpen, page, numPages, handlePageChange]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-app-bg text-app-text">
        <Loader2 className="h-10 w-10 animate-spin text-app-accent" />
        <span className="text-sm font-semibold">Initializing TOEIC Study Hub...</span>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-app-bg text-rose-500">
        <span className="text-lg font-bold">Library Error</span>
        <span className="text-sm">Could not find or load library configuration file at public/library/config.json</span>
      </div>
    );
  }

  const activeTest = config.tests.find((t) => t.id === activeTestId) || config.tests[0];

  // Media URL Resolver (supports /cdn-media/ proxy, remote URLs, or local /library/ files)
  const resolveMediaUrl = (fileOrUrl: string) => {
    if (!fileOrUrl) return '';
    if (fileOrUrl.startsWith('http://') || fileOrUrl.startsWith('https://') || fileOrUrl.startsWith('/')) {
      return fileOrUrl;
    }
    return `/library/${fileOrUrl}`;
  };

  // PDF URL Resolver
  const getPdfUrl = () => {
    if (activeTab === 'practice') return resolveMediaUrl(activeTest.practicePdf || config.practicePdf);
    if (activeTab === 'transcript') return resolveMediaUrl(config.transcriptPdf);
    return resolveMediaUrl(config.vocabularyPdf);
  };

  const getRightPdfUrl = () => {
    return resolveMediaUrl(config.vocabularyPdf);
  };

  // Switch Test Handler
  const handleSelectTest = (testId: number) => {
    setActiveTestId(testId);
    const test = config.tests.find((t) => t.id === testId);
    if (test) {
      let newPage = 1;
      if (activeTab === 'practice') newPage = test.practicePage;
      else if (activeTab === 'transcript') newPage = test.transcriptPage;
      
      setPage(newPage);
      setRecent({ testId, tab: activeTab, page: newPage });
    }
  };

  // Switch Tab Handler
  const handleTabChange = (tab: 'practice' | 'transcript' | 'vocabulary') => {
    setActiveTab(tab);
    let newPage = 1;
    if (tab === 'practice') newPage = activeTest.practicePage;
    else if (tab === 'transcript') newPage = activeTest.transcriptPage;
    
    setPage(newPage);
    setRecent({ testId: activeTestId, tab, page: newPage });
  };

  // Answer Sheet Handlers
  const handleAnswerChange = (questionNum: number, answer: 'A' | 'B' | 'C' | 'D' | null) => {
    const key = `${activeTestId}-${questionNum}`;
    setAnswers((prev) => {
      const updated = { ...prev };
      if (answer === null) {
        delete updated[key];
      } else {
        updated[key] = answer;
      }
      return updated;
    });
  };

  const handleGradeChange = (questionNum: number, isCorrect: boolean | null) => {
    const key = `${activeTestId}-${questionNum}`;
    setGrades((prev) => {
      const updated = { ...prev };
      if (isCorrect === null) {
        delete updated[key];
      } else {
        updated[key] = isCorrect;
      }
      return updated;
    });
  };

  const handleClearAnswers = () => {
    setAnswers((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (key.startsWith(`${activeTestId}-`)) {
          delete updated[key];
        }
      });
      return updated;
    });
    setGrades((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (key.startsWith(`${activeTestId}-`)) {
          delete updated[key];
        }
      });
      return updated;
    });
  };



  const handleSaveAttempt = (correctCount: number, incorrectCount: number, estimatedScore: number) => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timestamp = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

    const currentAnswers: Record<string, 'A' | 'B' | 'C' | 'D'> = {};
    const currentGrades: Record<string, boolean> = {};
    
    Object.keys(answers).forEach((k) => {
      if (k.startsWith(`${activeTestId}-`)) {
        currentAnswers[k] = answers[k];
      }
    });

    Object.keys(grades).forEach((k) => {
      if (k.startsWith(`${activeTestId}-`)) {
        currentGrades[k] = grades[k];
      }
    });

    const newAttempt: Attempt = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      testId: activeTestId,
      timestamp,
      correctCount,
      incorrectCount,
      estimatedScore,
      answers: currentAnswers,
      grades: currentGrades
    };

    setAttempts((prev) => [newAttempt, ...prev]);
    handleClearAnswers();
  };

  const handleDeleteAttempt = (attemptId: string) => {
    setAttempts((prev) => prev.filter((a) => a.id !== attemptId));
  };


  // Zoom Manual Changing (Updates PDF Read Position Memory)
  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
    
    // Save position to memory
    const key = `${activeTestId}-${activeTab}`;
    setPdfPositions((prev) => ({
      ...prev,
      [key]: { page, zoom: newZoom }
    }));
  };

  // Audio Time Updates
  const handleTimeUpdate = (time: number) => {
    setTestAudioTimes((prev) => ({
      ...prev,
      [activeTestId]: time
    }));

    // Mark as in-progress if the audio has been played for > 5 seconds
    const status = testProgress[activeTestId] || 'not-started';
    if (status === 'not-started' && time > 5) {
      setTestProgress((prev) => ({
        ...prev,
        [activeTestId]: 'in-progress'
      }));
    }
  };

  // Note Saving
  const handleSaveNote = (testId: number, text: string) => {
    setNotes((prev) => ({
      ...prev,
      [testId]: text
    }));
  };

  // Progress Completed Toggle
  const handleToggleStatus = () => {
    const currentStatus = testProgress[activeTestId] || 'not-started';
    const newStatus = currentStatus === 'completed' ? 'in-progress' : 'completed';
    setTestProgress((prev) => ({
      ...prev,
      [activeTestId]: newStatus
    }));
  };

  // Drag Resizer Handlers
  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResize);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = Math.max(160, Math.min(400, e.clientX));
    setSidebarWidth(newWidth);
  };

  const stopResize = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResize);
  };


  // Audio Resume Handler (from command palette)
  const handleResumeAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = testAudioTimes[activeTestId] || 0;
    if (time > 0) {
      audio.currentTime = time;
      audio.play().catch((err) => console.error('Error playing resumed audio', err));
    }
  };

  // Export Notes Handler (.json)
  const handleExportNotes = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(notes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `toeic-study-notes-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import Notes Handler (.json)
  const handleImportNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (typeof imported === 'object' && imported !== null) {
          setNotes((prev) => ({
            ...prev,
            ...imported
          }));
          alert('Notes imported and merged successfully!');
        } else {
          alert('Invalid format. Notes file must contain a valid JSON object.');
        }
      } catch (err) {
        alert('Error parsing uploaded notes file.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  const triggerImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-app-bg text-app-text">
      {/* Hidden file input for note imports */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImportNotes}
        className="hidden"
      />

      <div className="flex flex-1 flex-row overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {isMobile && mobileSidebarOpen && (
          <div className="mobile-sidebar-overlay" onClick={() => setMobileSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        {(!isMobile || mobileSidebarOpen) && (
          <div className={isMobile ? 'mobile-sidebar' : ''}>
            <Sidebar
              width={isMobile ? 260 : sidebarWidth}
              tests={config.tests}
              activeTestId={activeTestId}
              onSelectTest={(id) => {
                handleSelectTest(id);
                if (isMobile) setMobileSidebarOpen(false);
              }}
              testProgress={testProgress}
              theme={theme}
              onThemeChange={setTheme}
              bookTitle={config.bookTitle}
            />
          </div>
        )}

        {/* Resizable Divider bar (desktop only) */}
        {!isMobile && (
          <div
            onMouseDown={startResize}
            className="desktop-resize-handle w-1.5 cursor-col-resize bg-app-border/40 hover:bg-app-accent active:bg-app-accent/80 transition-colors duration-200 shrink-0"
            title="Drag to resize sidebar"
          />
        )}

        {/* Workspace */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Mobile Header Bar */}
          {isMobile && (
            <div className="flex h-10 items-center justify-between border-b border-app-border bg-app-card px-3 shrink-0">
              <button
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="rounded p-1.5 text-app-text/70 hover:bg-app-hover transition-colors cursor-pointer"
                title="Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <span className="text-xs font-bold text-app-text/80">Test {activeTestId}</span>
              <button
                onClick={() => setShowAnswerSheet(!showAnswerSheet)}
                className={`rounded p-1.5 transition-colors cursor-pointer ${showAnswerSheet ? 'text-app-accent bg-app-accent/10' : 'text-app-text/70 hover:bg-app-hover'}`}
                title="Answer Sheet"
              >
                <Sparkles className="h-5 w-5" />
              </button>
            </div>
          )}
          <Toolbar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            page={page}
            numPages={numPages}
            onPageChange={handlePageChange}
            zoom={zoom}
            onZoomChange={handleZoomChange}
            audioSpeed={playbackSpeed}
            onOpenNotes={() => setNotesOpen(true)}
            testStatus={testProgress[activeTestId] || 'not-started'}
            onToggleStatus={handleToggleStatus}
            isSplit={isMobile ? false : isSplit}
            onToggleSplit={() => { if (!isMobile) setIsSplit(!isSplit); }}
            pdfUrl={getPdfUrl()}
            showAnswerSheet={showAnswerSheet}
            onToggleAnswerSheet={() => setShowAnswerSheet(!showAnswerSheet)}
            vocabViewMode={vocabViewMode}
          />

          <div className="flex flex-1 flex-row overflow-hidden border-t border-app-border">
            {/* Left Panel */}
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Header switch for Vocabulary Tab */}
              {activeTab === 'vocabulary' && (
                <div className="flex h-10 items-center justify-between bg-app-card px-4 border-b border-app-border shrink-0">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-app-accent" />
                    <span className="text-xs font-bold text-app-text/80 uppercase tracking-wider">Vocabulary Study</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-md bg-app-bg p-0.5 border border-app-border">
                    <button
                      onClick={() => setVocabViewMode('pdf')}
                      className={`rounded px-2.5 py-1 text-[11px] font-bold uppercase transition-all cursor-pointer ${
                        vocabViewMode === 'pdf'
                          ? 'bg-app-accent text-white shadow-xs'
                          : 'text-app-text/60 hover:text-app-text'
                      }`}
                    >
                      PDF View
                    </button>
                    <button
                      onClick={() => setVocabViewMode('quizlet')}
                      className={`rounded px-2.5 py-1 text-[11px] font-bold uppercase transition-all cursor-pointer flex items-center gap-1 ${
                        vocabViewMode === 'quizlet'
                          ? 'bg-app-accent text-white shadow-xs'
                          : 'text-app-text/60 hover:text-app-text'
                      }`}
                    >
                      <Sparkles className="h-3 w-3" />
                      Quizlet Mode
                    </button>
                  </div>
                </div>
              )}
              {isSplit && activeTab !== 'vocabulary' && (
                <div className="flex h-9 items-center justify-between bg-app-card px-4 border-b border-app-border text-[10px] font-bold text-app-text/60 uppercase tracking-widest">
                  <span>Main: {activeTab}</span>
                  <span>Page {page} / {numPages}</span>
                </div>
              )}
              {activeTab === 'vocabulary' && vocabViewMode === 'quizlet' ? (
                <VocabularyQuiz />
              ) : (
                <PdfViewer
                  pdfUrl={getPdfUrl()}
                  page={page}
                  numPages={numPages}
                  onPageChange={handlePageChange}
                  zoom={zoom}
                  onZoomChange={handleZoomChange}
                  setNumPages={setNumPages}
                />
              )}
            </div>

            {/* Right Panel */}
            {isSplit && (
              <div className="flex flex-1 flex-col overflow-hidden border-l border-app-border bg-app-bg">
                {/* Header for Right Panel */}
                <div className="flex h-9 items-center justify-between bg-app-card px-4 border-b border-app-border text-xs">
                  {/* Title */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-app-text/60 uppercase tracking-widest">Vocabulary Book</span>
                    <a
                      href={getRightPdfUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Mở PDF từ vựng trong tab mới để copy chữ"
                      className="inline-flex items-center text-app-accent hover:opacity-85 ml-1"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  {/* Pagination & Zoom Controls for Right Panel */}
                  <div className="flex items-center gap-4">
                    {/* Pagination */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setRightPage(Math.max(1, rightPage - 1))}
                        disabled={rightPage <= 1}
                        className="rounded p-0.5 text-app-text/60 hover:bg-app-hover hover:text-app-text disabled:opacity-30 cursor-pointer"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-mono text-app-text/80 text-xs">{rightPage} / {rightNumPages || '--'}</span>
                      <button
                        onClick={() => setRightPage(Math.min(rightNumPages, rightPage + 1))}
                        disabled={rightPage >= rightNumPages}
                        className="rounded p-0.5 text-app-text/60 hover:bg-app-hover hover:text-app-text disabled:opacity-30 cursor-pointer"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Zoom */}
                    <div className="flex items-center gap-0.5 border-l border-app-border pl-3">
                      <button
                        onClick={() => setRightZoom(Math.max(0.5, rightZoom - 0.1))}
                        className="rounded p-0.5 text-app-text/60 hover:bg-app-hover hover:text-app-text cursor-pointer"
                      >
                        <ZoomOut className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-10 text-center text-xs font-semibold text-app-text/80">
                        {Math.round(rightZoom * 100)}%
                      </span>
                      <button
                        onClick={() => setRightZoom(Math.min(3.0, rightZoom + 0.1))}
                        className="rounded p-0.5 text-app-text/60 hover:bg-app-hover hover:text-app-text cursor-pointer"
                      >
                        <ZoomIn className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <PdfViewer
                  pdfUrl={getRightPdfUrl()}
                  page={rightPage}
                  numPages={rightNumPages}
                  onPageChange={setRightPage}
                  zoom={rightZoom}
                  onZoomChange={setRightZoom}
                  setNumPages={setRightNumPages}
                />
              </div>
            )}

            {/* Answer Sheet Panel */}
            {showAnswerSheet && (
              <>
                {isMobile && (
                  <div className="mobile-sidebar-overlay" onClick={() => setShowAnswerSheet(false)} />
                )}
                <div className={isMobile ? 'mobile-answer-sheet' : ''}>
                  <AnswerSheet
                    testId={activeTestId}
                    answers={answers}
                    onAnswerChange={handleAnswerChange}
                    grades={grades}
                    onGradeChange={handleGradeChange}
                    onClearAnswers={handleClearAnswers}
                    onAutoGrade={handleAutoGrade}
                    attempts={attempts.filter((a) => a.testId === activeTestId)}
                    onSaveAttempt={handleSaveAttempt}
                    onDeleteAttempt={handleDeleteAttempt}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer Player */}
      <AudioPlayer
        audioUrl={resolveMediaUrl(activeTest.audio)}
        audioRef={audioRef}
        playbackSpeed={playbackSpeed}
        onSpeedChange={setPlaybackSpeed}
        notesOpen={notesOpen}
        onTimeUpdate={handleTimeUpdate}
        initialTime={testAudioTimes[activeTestId] || 0}
        testId={activeTestId}
      />

      {/* Floating Notes Modal */}
      <NotesModal
        isOpen={notesOpen}
        onClose={() => setNotesOpen(false)}
        testId={activeTestId}
        testTitle={`Test ${activeTestId}`}
        initialNote={notes[activeTestId] || ''}
        onSaveNote={handleSaveNote}
      />

      {/* Floating Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectTest={handleSelectTest}
        onTabChange={handleTabChange}
        onThemeChange={setTheme}
        onToggleFullscreen={handleToggleFullscreen}
        onOpenNotes={() => setNotesOpen(true)}
        onExportNotes={handleExportNotes}
        onImportNotes={triggerImportClick}
        onResumeAudio={handleResumeAudio}
        hasAudioToResume={!!testAudioTimes[activeTestId] && testAudioTimes[activeTestId] > 5}
        testsCount={config.tests.length}
      />
    </div>
  );
}
