import { useState, useEffect, useMemo, useCallback } from 'react';
import { Volume2, ChevronLeft, ChevronRight, RefreshCw, Check, X, Filter, BookOpen, Award, Layers, VolumeX, Trash2, Pencil } from 'lucide-react';
import { vocabularyData, type VocabItem } from '../data/vocabularyData';

const testMetadata: Record<number, {
  name: string;
  stories: { id: number; title: string }[];
}> = {
  1: {
    name: "Test 1",
    stories: [
      { id: 1, title: "Story 1: Khủng hoảng lịch hẹn ở phòng khám" },
      { id: 2, title: "Story 2: Dự án cải tạo kỹ thuật cao cấp" },
      { id: 3, title: "Story 3: Thông báo và giải quyết sai sót" }
    ]
  },
  2: {
    name: "Test 2",
    stories: [
      { id: 1, title: "Story 1: Sự cố hành chính" },
      { id: 2, title: "Story 2: Quyết định chi tiêu" },
      { id: 3, title: "Story 3: Hồi phục và cải tạo cơ sở" }
    ]
  },
  3: {
    name: "Test 3",
    stories: [
      { id: 1, title: "Story 1: Thử thách và cơ hội" },
      { id: 2, title: "Story 2: Lỗi hợp đồng và chi phí" },
      { id: 3, title: "Story 3: Dịch vụ khách hàng" }
    ]
  },
  4: {
    name: "Test 4",
    stories: [
      { id: 1, title: "Story 1: Công bố và cải tạo" },
      { id: 2, title: "Story 2: Xử lý vấn đề nhân sự và tài chính" },
      { id: 3, title: "Story 3: Mối hợp tác vượt mong đợi" }
    ]
  },
  5: {
    name: "Test 5",
    stories: [
      { id: 1, title: "Story 1: Ngày công ty gặp biến" },
      { id: 2, title: "Story 2: Một ngày bình thường với những điều không bình thường" },
      { id: 3, title: "Story 3: Drama nhà hàng xóm" }
    ]
  }
};

export function VocabularyQuiz() {
  const [activeTestId, setActiveTestId] = useState<number>(3); // Default to Test 3
  const [activeStoryId, setActiveStoryId] = useState<number | 'all'>('all');
  const [mode, setMode] = useState<'flashcards' | 'quiz' | 'notebook'>('flashcards');

  // --- Custom Vocabulary State ---
  const [customVocab, setCustomVocab] = useState<VocabItem[]>(() => {
    const saved = localStorage.getItem('toeic-custom-vocab');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Personal Notebook Inputs State ---
  const [newWord, setNewWord] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newContextEn, setNewContextEn] = useState('');
  const [exportScope, setExportScope] = useState<'all' | 'today'>('today');
  const [editingId, setEditingId] = useState<number | null>(null);

  // Words list based on filter (merging custom vocabulary seamlessly)
  const filteredWords = useMemo(() => {
    let words = vocabularyData.filter((w) => w.testId === activeTestId);
    if (activeStoryId !== 'all') {
      words = words.filter((w) => w.storyId === activeStoryId);
    }
    
    let custom = customVocab.filter((w) => w.testId === activeTestId);
    if (activeStoryId !== 'all') {
      custom = custom.filter((w) => w.storyId === activeStoryId);
    }

    return [...words, ...custom];
  }, [activeTestId, activeStoryId, customVocab]);

  // --- Flashcard State ---
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Reset index when filter changes
  useEffect(() => {
    setCardIndex(0);
    setIsFlipped(false);
  }, [filteredWords]);

  // Audio pronunciation using Web Speech API
  const speakWord = useCallback((text: string) => {
    if (isMuted) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // Slightly slower for better clarity
      window.speechSynthesis.speak(utterance);
    }
  }, [isMuted]);

  const handleNextCard = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCardIndex((prev) => (prev + 1) % filteredWords.length);
    }, 150);
  }, [filteredWords.length]);

  const handlePrevCard = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCardIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
    }, 150);
  }, [filteredWords.length]);

  // Speak word when card index changes
  useEffect(() => {
    if (mode === 'flashcards' && filteredWords.length > 0 && !isFlipped) {
      const timer = setTimeout(() => {
        speakWord(filteredWords[cardIndex].word);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [cardIndex, mode, filteredWords, speakWord, isFlipped]);

  // Keyboard navigation for Flashcards
  useEffect(() => {
    if (mode !== 'flashcards' || filteredWords.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === 'ArrowRight') {
        handleNextCard();
      } else if (e.key === 'ArrowLeft') {
        handlePrevCard();
      } else if (e.key === 'v' || e.key === 'V') {
        speakWord(filteredWords[cardIndex].word);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, cardIndex, filteredWords, handleNextCard, handlePrevCard, speakWord]);


  // --- Quiz State ---
  const [quizQuestions, setQuizQuestions] = useState<{
    word: VocabItem;
    options: string[];
    correctIndex: number;
  }[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState<{
    word: VocabItem;
    userAnswer: string;
  }[]>([]);

  // Function to generate quiz questions (random 10 words)
  const startNewQuiz = useCallback(() => {
    if (filteredWords.length < 4) return;

    // Shuffle the filtered words and take max 10
    const shuffledList = [...filteredWords].sort(() => 0.5 - Math.random());
    const targetWords = shuffledList.slice(0, Math.min(10, shuffledList.length));

    const questions = targetWords.map((target) => {
      // Find 3 distractors from the entire vocabularyData list
      const distractors = vocabularyData
        .filter((w) => w.word !== target.word && w.meaning !== target.meaning)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((w) => w.meaning);

      // Add correct meaning
      const options = [...distractors, target.meaning].sort(() => 0.5 - Math.random());
      const correctIndex = options.indexOf(target.meaning);

      return {
        word: target,
        options,
        correctIndex
      };
    });

    setQuizQuestions(questions);
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
    setIncorrectAnswers([]);
  }, [filteredWords]);

  // Restart quiz when mode is changed to 'quiz'
  useEffect(() => {
    if (mode === 'quiz') {
      startNewQuiz();
    }
  }, [mode, startNewQuiz]);

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return; // Answer already selected
    setSelectedOption(index);

    const question = quizQuestions[currentQuizIndex];
    if (index === question.correctIndex) {
      setScore((prev) => prev + 1);
    } else {
      setIncorrectAnswers((prev) => [
        ...prev,
        {
          word: question.word,
          userAnswer: question.options[index]
        }
      ]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex + 1 < quizQuestions.length) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const currentCard = filteredWords[cardIndex];

  const handleAddOrUpdateWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !newMeaning.trim()) {
      alert('Vui lòng nhập từ vựng và nghĩa tiếng Việt!');
      return;
    }

    if (editingId !== null) {
      // Update existing word
      const updated = customVocab.map(w => {
        if (w.id === editingId) {
          return {
            ...w,
            word: newWord.trim(),
            meaning: newMeaning.trim(),
            englishContext: newContextEn.trim() || undefined,
          };
        }
        return w;
      });
      setCustomVocab(updated);
      localStorage.setItem('toeic-custom-vocab', JSON.stringify(updated));
      setEditingId(null);
      alert('Đã cập nhật từ vựng thành công!');
    } else {
      // Add new word
      const newItem: VocabItem = {
        id: Date.now(),
        testId: activeTestId,
        word: newWord.trim(),
        pos: 'word',
        pronunciation: '',
        meaning: newMeaning.trim(),
        storyId: activeStoryId === 'all' ? 99 : activeStoryId,
        storyTitle: activeStoryId === 'all' ? 'Sổ tay cá nhân' : (testMetadata[activeTestId]?.stories.find(s => s.id === activeStoryId)?.title || 'Sổ tay cá nhân'),
        englishContext: newContextEn.trim() || undefined,
        // @ts-ignore
        addedDate: new Date().toISOString().split('T')[0]
      };

      const updated = [newItem, ...customVocab];
      setCustomVocab(updated);
      localStorage.setItem('toeic-custom-vocab', JSON.stringify(updated));
      alert('Đã thêm từ mới vào sổ tay cá nhân thành công!');
    }

    // Reset fields
    setNewWord('');
    setNewMeaning('');
    setNewContextEn('');
  };

  const handleStartEdit = (w: VocabItem) => {
    setEditingId(w.id as number);
    setNewWord(w.word);
    setNewMeaning(w.meaning);
    setNewContextEn(w.englishContext || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewWord('');
    setNewMeaning('');
    setNewContextEn('');
  };

  const handleDeleteWord = (id: string | number) => {
    if (window.confirm('Xóa từ vựng này khỏi sổ tay cá nhân?')) {
      const updated = customVocab.filter(w => w.id !== id);
      setCustomVocab(updated);
      localStorage.setItem('toeic-custom-vocab', JSON.stringify(updated));
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  };

  const handleExportCSV = () => {
    let listToExport = customVocab.filter(w => w.testId === activeTestId);
    if (exportScope === 'today') {
      const today = new Date().toISOString().split('T')[0];
      listToExport = listToExport.filter(w => (w as any).addedDate === today);
    }

    if (listToExport.length === 0) {
      alert('Không có từ vựng nào thỏa mãn bộ lọc để xuất file!');
      return;
    }

    let csvContent = '\uFEFF'; 
    csvContent += 'Từ vựng,Nghĩa tiếng Việt,Ví dụ / Ngữ cảnh,Ngày thêm\n';

    listToExport.forEach(w => {
      const row = [
        `"${w.word.replace(/"/g, '""')}"`,
        `"${w.meaning.replace(/"/g, '""')}"`,
        `"${(w.englishContext || '').replace(/"/g, '""')}"`,
        `"${(w as any).addedDate || ''}"`
      ].join(',');
      csvContent += row + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const filename = `toeic_vocab_test${activeTestId}_${exportScope === 'today' ? 'today' : 'all'}_${new Date().toISOString().split('T')[0]}.csv`;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportDOCX = () => {
    let listToExport = customVocab.filter(w => w.testId === activeTestId);
    if (exportScope === 'today') {
      const today = new Date().toISOString().split('T')[0];
      listToExport = listToExport.filter(w => (w as any).addedDate === today);
    }

    if (listToExport.length === 0) {
      alert('Không có từ vựng nào thỏa mãn bộ lọc để xuất file!');
      return;
    }

    const todayStr = new Date().toLocaleDateString('vi-VN');
    
    let docHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <title>Báo cáo từ vựng TOEIC - Test ${activeTestId}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; color: #1e3a8a; font-size: 16pt; margin-bottom: 5pt; }
          h2 { text-align: center; color: #555555; font-size: 10pt; margin-bottom: 20pt; }
          table { width: 100%; border-collapse: collapse; margin-top: 10pt; }
          th, td { border: 1px solid #cccccc; padding: 8pt; text-align: left; font-size: 10pt; }
          th { background-color: #f2f2f2; font-weight: bold; color: #333333; }
        </style>
      </head>
      <body>
        <h1 style="text-align: center; font-family: sans-serif; text-transform: uppercase; font-weight: bold;">Báo cáo từ vựng tiếng Anh hàng ngày</h1>
        <h2 style="text-align: center; font-family: sans-serif; color: #555;">Đề ôn tập: Test ${activeTestId} | Ngày báo cáo: ${todayStr} | Phạm vi: ${exportScope === 'today' ? 'Từ vựng thêm hôm nay' : 'Tất cả từ đã thêm'}</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-family: sans-serif; font-size: 12px;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="border: 1px solid #ddd; padding: 10px; text-align: center; width: 8%;">STT</th>
              <th style="border: 1px solid #ddd; padding: 10px; width: 27%;">Từ vựng</th>
              <th style="border: 1px solid #ddd; padding: 10px; width: 30%;">Nghĩa tiếng Việt</th>
              <th style="border: 1px solid #ddd; padding: 10px; width: 35%;">Ví dụ / Ngữ cảnh</th>
            </tr>
          </thead>
          <tbody>
            ${listToExport.map((w, index) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${index + 1}</td>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold; color: #2563eb;">${w.word}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${w.meaning}</td>
                <td style="border: 1px solid #ddd; padding: 8px; font-style: italic; color: #4b5563;">${w.englishContext || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <br/><br/>
        <p style="text-align: right; font-family: sans-serif; font-size: 11px; color: #777;">Ký tên người học: _______________________</p>
      </body>
      </html>
    `;

    const blob = new Blob(['\uFEFF' + docHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const filename = `toeic_vocab_test${activeTestId}_${exportScope === 'today' ? 'today' : 'all'}_${new Date().toISOString().split('T')[0]}.doc`;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    let listToExport = customVocab.filter(w => w.testId === activeTestId);
    if (exportScope === 'today') {
      const today = new Date().toISOString().split('T')[0];
      listToExport = listToExport.filter(w => (w as any).addedDate === today);
    }

    if (listToExport.length === 0) {
      alert('Không có từ vựng nào thỏa mãn bộ lọc để xuất file!');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Không thể mở cửa sổ in! Vui lòng cho phép popup trên trình duyệt.');
      return;
    }

    const todayStr = new Date().toLocaleDateString('vi-VN');
    const tableRows = listToExport.map((w, index) => `
      <tr>
        <td style="text-align: center; border: 1px solid #ddd; padding: 8px;">${index + 1}</td>
        <td style="font-weight: bold; color: #2563eb; border: 1px solid #ddd; padding: 8px;">${w.word}</td>
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: 500;">${w.meaning}</td>
        <td style="font-size: 11px; color: #4b5563; border: 1px solid #ddd; padding: 8px;">${w.englishContext || ''}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Báo cáo từ vựng TOEIC - Test ${activeTestId}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; color: #1f2937; }
            h1 { text-align: center; color: #1e3a8a; font-size: 20px; margin-bottom: 5px; }
            h2 { text-align: center; color: #4b5563; font-size: 13px; margin-top: 0; margin-bottom: 25px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
            th, td { border: 1px solid #d1d5db; padding: 8px 10px; text-align: left; }
            th { background-color: #f3f4f6; color: #374151; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9fafb; }
            .footer { margin-top: 30px; text-align: right; font-size: 10px; color: #9ca3af; }
            @media print {
              button { display: none; }
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <h1 style="text-align: center; font-family: sans-serif; text-transform: uppercase;">Báo cáo từ vựng tiếng Anh hàng ngày</h1>
          <h2 style="text-align: center; font-family: sans-serif; color: #555;">Đề ôn tập: Test ${activeTestId} | Ngày báo cáo: ${todayStr} | Phạm vi: ${exportScope === 'today' ? 'Từ vựng thêm hôm nay' : 'Tất cả từ đã thêm'}</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-family: sans-serif; font-size: 12px;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th style="border: 1px solid #ddd; padding: 10px; text-align: center; width: 8%;">STT</th>
                <th style="border: 1px solid #ddd; padding: 10px; width: 27%;">Từ vựng</th>
                <th style="border: 1px solid #ddd; padding: 10px; width: 30%;">Nghĩa tiếng Việt</th>
                <th style="border: 1px solid #ddd; padding: 10px; width: 35%;">Ví dụ / Ngữ cảnh</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          <div style="margin-top: 40px; text-align: right; font-family: sans-serif; font-size: 11px; color: #777;">
            Ký tên người học: _______________________
          </div>
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="flex h-full w-full flex-col bg-app-bg text-app-text p-4 md:p-6 overflow-y-auto">
      {/* Quizlet Header Control Panel */}
      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-app-border bg-app-card p-4 shadow-xs md:flex-row md:items-center md:justify-between">
        {/* Toggle Mode Buttons */}
        <div className="flex items-center gap-1 bg-app-bg p-1 rounded-lg border border-app-border self-start">
          <button
            onClick={() => setMode('flashcards')}
            className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              mode === 'flashcards'
                ? 'bg-app-accent text-white shadow-xs'
                : 'text-app-text/60 hover:text-app-text'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            Flashcards
          </button>
          <button
            onClick={() => setMode('quiz')}
            className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              mode === 'quiz'
                ? 'bg-app-accent text-white shadow-xs'
                : 'text-app-text/60 hover:text-app-text'
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            Daily Quiz
          </button>
          <button
            onClick={() => setMode('notebook')}
            className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              mode === 'notebook'
                ? 'bg-app-accent text-white shadow-xs'
                : 'text-app-text/60 hover:text-app-text'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Sổ tay của tôi
          </button>
        </div>

        {/* Filter Stories Dropdown */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-app-text/60 font-medium">
              <Filter className="h-3.5 w-3.5" />
              Chọn Test:
            </div>
            <select
              value={activeTestId}
              onChange={(e) => {
                setActiveTestId(parseInt(e.target.value, 10));
                setActiveStoryId('all');
              }}
              className="rounded-lg border border-app-border bg-app-bg px-3 py-1.5 text-xs font-semibold text-app-text focus:border-app-accent focus:outline-hidden"
            >
              <option value="1">Test 1</option>
              <option value="2">Test 2</option>
              <option value="3">Test 3</option>
              <option value="4">Test 4</option>
              <option value="5">Test 5</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-app-text/60 font-medium">
              Bộ lọc Story:
            </div>
            <select
              value={activeStoryId}
              onChange={(e) => {
                const val = e.target.value;
                setActiveStoryId(val === 'all' ? 'all' : parseInt(val, 10));
              }}
              className="rounded-lg border border-app-border bg-app-bg px-3 py-1.5 text-xs font-semibold text-app-text focus:border-app-accent focus:outline-hidden"
            >
              <option value="all">Tất cả Story</option>
              {testMetadata[activeTestId]?.stories.map((story) => (
                <option key={story.id} value={story.id}>
                  {story.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Study Content Area */}
      {mode === 'notebook' ? (
        /* --- NOTEBOOK MODE VIEW --- */
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 w-full">
          {/* Left panel: Add/Edit Word Form */}
          <div className="lg:col-span-1 flex flex-col gap-4 rounded-2xl border border-app-border bg-app-card p-5 shadow-xs h-fit">
            <h3 className="text-xs font-bold text-app-accent flex items-center gap-2 uppercase tracking-wider">
              <BookOpen className="h-4 w-4" />
              {editingId !== null ? 'Chỉnh sửa từ vựng' : 'Thêm từ vựng mới'}
            </h3>
            
            <form onSubmit={handleAddOrUpdateWord} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-app-text/50 uppercase tracking-wider">Từ vựng (English) *</label>
                <input
                  type="text"
                  placeholder="Ví dụ: facilitate"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  className="rounded-lg border border-app-border bg-app-bg px-3 py-2 text-xs text-app-text placeholder-app-text/30 focus:border-app-accent focus:outline-hidden"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-app-text/50 uppercase tracking-wider">Nghĩa tiếng Việt *</label>
                <input
                  type="text"
                  placeholder="Ví dụ: tạo điều kiện thuận lợi"
                  value={newMeaning}
                  onChange={(e) => setNewMeaning(e.target.value)}
                  className="rounded-lg border border-app-border bg-app-bg px-3 py-2 text-xs text-app-text placeholder-app-text/30 focus:border-app-accent focus:outline-hidden"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-app-text/50 uppercase tracking-wider">Ví dụ / Ngữ cảnh (English)</label>
                <textarea
                  placeholder="Ví dụ: Modern equipment will facilitate the work."
                  value={newContextEn}
                  onChange={(e) => setNewContextEn(e.target.value)}
                  rows={3}
                  className="rounded-lg border border-app-border bg-app-bg px-3 py-2 text-xs text-app-text placeholder-app-text/30 focus:border-app-accent focus:outline-hidden resize-none"
                />
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-app-accent py-2 text-xs font-bold text-white hover:opacity-90 active:scale-98 transition-all shadow-xs cursor-pointer text-center"
                >
                  {editingId !== null ? 'Cập nhật từ' : 'Thêm từ vào sổ tay'}
                </button>
                {editingId !== null && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="rounded-lg border border-app-border bg-app-bg px-3 py-2 text-xs font-bold text-app-text/60 hover:text-app-text active:scale-98 transition-all cursor-pointer text-center"
                  >
                    Hủy
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right panel: Custom word list & Export */}
          <div className="lg:col-span-2 flex flex-col gap-4 rounded-2xl border border-app-border bg-app-card p-5 shadow-xs">
            {/* List Header and Export tools */}
            <div className="flex flex-col gap-3 justify-between border-b border-app-border/40 pb-4 sm:flex-row sm:items-center">
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-app-text">Danh sách từ đã thêm</h3>
                <span className="text-[10px] text-app-text/50 font-medium">
                  Tổng cộng: {customVocab.filter(w => w.testId === activeTestId).length} từ cho Test {activeTestId}
                </span>
              </div>

              {/* Export Panel controls */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={exportScope}
                  onChange={(e) => setExportScope(e.target.value as 'all' | 'today')}
                  className="rounded-lg border border-app-border bg-app-bg px-2 py-1 text-[10px] font-bold text-app-text focus:outline-hidden cursor-pointer"
                >
                  <option value="today">Chỉ từ thêm hôm nay</option>
                  <option value="all">Tất cả các từ đã thêm</option>
                </select>

                <button
                  onClick={handleExportCSV}
                  className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-600 hover:bg-emerald-500/20 active:scale-95 transition-all cursor-pointer"
                  title="Xuất file Excel CSV để nộp Drive"
                >
                  Excel (.csv)
                </button>

                <button
                  onClick={handleExportDOCX}
                  className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold text-blue-600 hover:bg-blue-500/20 active:scale-95 transition-all cursor-pointer"
                  title="Xuất file Word (.doc) để nộp Drive"
                >
                  Word (.doc)
                </button>

                <button
                  onClick={handleExportPDF}
                  className="rounded-lg border border-app-accent/30 bg-app-accent/10 px-2.5 py-1 text-[10px] font-bold text-app-accent hover:bg-app-accent/20 active:scale-95 transition-all cursor-pointer"
                  title="In hoặc Lưu file PDF để nộp Drive"
                >
                  PDF (In)
                </button>
              </div>
            </div>

            {/* Scrollable list */}
            <div className="max-h-[420px] overflow-y-auto pr-1 flex flex-col gap-2.5">
              {customVocab.filter(w => w.testId === activeTestId).length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-app-border rounded-xl bg-app-bg/10 min-h-60 justify-center">
                  <BookOpen className="h-10 w-10 text-app-text/20 mb-2" />
                  <span className="text-xs font-semibold text-app-text/60">Chưa tự thêm từ nào cho Test {activeTestId}</span>
                  <p className="text-[10px] text-app-text/40 mt-1 max-w-[200px] leading-relaxed">
                    Nhập thông tin bên cột trái để ghi nhớ các từ mới tự chọn trong ngày.
                  </p>
                </div>
              ) : (
                customVocab
                  .filter(w => w.testId === activeTestId)
                  .map((w) => (
                    <div
                      key={w.id}
                      className={`rounded-xl border p-3 transition-all flex flex-col gap-1.5 relative group ${editingId === w.id ? 'border-app-accent bg-app-accent/5' : 'border-app-border bg-app-bg/30 hover:bg-app-bg/50'}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-app-accent">{w.word}</h4>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => speakWord(w.word)}
                            className="rounded-full p-1 hover:bg-app-hover text-app-text/50 hover:text-app-accent transition-colors cursor-pointer"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleStartEdit(w)}
                            className={`rounded-full p-1 hover:bg-app-hover transition-colors cursor-pointer ${editingId === w.id ? 'text-app-accent bg-app-accent/10' : 'text-app-text/30 hover:text-app-accent'}`}
                            title="Sửa từ"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteWord(w.id)}
                            className="rounded-full p-1 hover:bg-app-hover text-app-text/30 hover:text-rose-500 transition-colors cursor-pointer"
                            title="Xóa từ"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-xs font-semibold text-app-text/85">
                        {w.meaning}
                      </div>

                      {w.englishContext && (
                        <div className="border-l-2 border-app-border/50 pl-2 text-[10px] text-app-text/60 italic leading-relaxed">
                          <div>Ví dụ: {w.englishContext}</div>
                        </div>
                      )}

                      <span className="text-[8px] font-mono text-app-text/30 self-end">
                        Ngày thêm: {(w as any).addedDate || 'Chưa rõ'}
                      </span>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      ) : filteredWords.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-app-border bg-app-card p-12 text-center">
          <BookOpen className="mb-4 h-12 w-12 text-app-text/20 animate-pulse" />
          <h3 className="text-base font-bold">Không tìm thấy từ vựng nào</h3>
          <p className="text-xs text-app-text/60 mt-1 max-w-xs">
            Vui lòng chọn bộ lọc từ vựng khác hoặc kiểm tra lại file dữ liệu nguồn.
          </p>
        </div>
      ) : mode === 'flashcards' ? (
        /* --- FLASHCARDS MODE VIEW --- */
        <div className="flex flex-1 flex-col items-center justify-center max-w-2xl mx-auto w-full">
          {/* Flip Card Container */}
          <div
            onClick={() => setIsFlipped((prev) => !prev)}
            className="perspective-1000 relative h-80 w-full cursor-pointer select-none mb-6"
          >
            {/* Card Content Card */}
            <div
              className={`transform-style-3d relative h-full w-full rounded-2xl border border-app-border bg-app-card shadow-md transition-transform duration-500 ease-out-back ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* CARD FRONT SIDE */}
              <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="absolute top-4 left-4 text-[10px] font-bold text-app-text/40 uppercase tracking-widest">
                  Từ vựng • {currentCard.storyTitle}
                </span>

                {/* Speaker Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Avoid card flipping when click sound button
                    speakWord(currentCard.word);
                  }}
                  className="absolute top-4 right-4 rounded-full p-2 bg-app-bg border border-app-border text-app-text/60 hover:text-app-accent hover:border-app-accent/40 active:scale-95 transition-all shadow-xs"
                  title="Nghe phát âm (Nhấn phím V)"
                >
                  <Volume2 className="h-4 w-4" />
                </button>

                <h1 className="text-3xl font-extrabold text-app-accent leading-tight tracking-tight mb-2 select-all">
                  {currentCard.word}
                </h1>
                
                <span className="inline-block rounded-md bg-app-bg px-2.5 py-0.5 font-mono text-[11px] font-bold text-app-text/60 border border-app-border/40">
                  {currentCard.pos}
                </span>

                <p className="mt-4 font-mono text-sm font-semibold text-app-text/50">
                  {currentCard.pronunciation}
                </p>

                <span className="absolute bottom-4 text-[10px] text-app-text/30 font-medium">
                  Chạm hoặc nhấn Spacebar để lật
                </span>
              </div>

              {/* CARD BACK SIDE */}
              <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between p-6 bg-app-card rounded-2xl">
                <div className="flex flex-col flex-1 justify-center items-center text-center p-4">
                  <span className="text-[10px] font-bold text-app-text/40 uppercase tracking-widest mb-3">
                    Định nghĩa & Nghĩa tiếng Việt
                  </span>
                  
                  <h2 className="text-2xl font-bold text-app-text mb-4">
                    {currentCard.meaning}
                  </h2>

                  {/* Context sentence display */}
                  {currentCard.englishContext && (
                    <div className="w-full rounded-xl bg-app-bg p-3.5 border border-app-border/40 text-left">
                      <span className="block text-[9px] font-bold text-app-text/40 uppercase tracking-wider mb-1.5">
                        Ngữ cảnh trong bài đọc:
                      </span>
                      <p className="text-xs text-app-text/80 leading-relaxed font-medium italic">
                        {/* Highlight the target word in context */}
                        {currentCard.englishContext.split(new RegExp(`(${currentCard.word})`, 'gi')).map((part, i) => 
                          part.toLowerCase() === currentCard.word.toLowerCase() ? (
                            <strong key={i} className="text-app-accent underline decoration-2 underline-offset-2 font-bold not-italic">{part}</strong>
                          ) : part
                        )}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-center items-center border-t border-app-border/40 pt-3">
                  <span className="text-[10px] text-app-text/30 font-medium">
                    Chạm để xem lại mặt trước
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Flashcard Bottom Controls */}
          <div className="flex w-full items-center justify-between mt-2 px-2">
            {/* Left Mute toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="rounded-lg p-2 hover:bg-app-hover text-app-text/60 hover:text-app-text transition-colors"
              title={isMuted ? "Bật âm thanh" : "Tắt tự động đọc từ"}
            >
              {isMuted ? <VolumeX className="h-4.5 w-4.5 text-rose-500" /> : <Volume2 className="h-4.5 w-4.5 text-app-accent" />}
            </button>

            {/* Pagination Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevCard}
                className="rounded-full p-2 bg-app-card border border-app-border hover:bg-app-hover shadow-xs text-app-text cursor-pointer active:scale-95 transition-all"
                title="Previous (Mũi tên Trái)"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <span className="font-mono text-sm font-bold text-app-text/70 min-w-16 text-center">
                {cardIndex + 1} / {filteredWords.length}
              </span>

              <button
                onClick={handleNextCard}
                className="rounded-full p-2 bg-app-card border border-app-border hover:bg-app-hover shadow-xs text-app-text cursor-pointer active:scale-95 transition-all"
                title="Next (Mũi tên Phải)"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Info guides */}
            <div className="text-[11px] font-medium text-app-text/40 hidden sm:block">
              Mẹo: Dùng phím <kbd className="px-1.5 py-0.5 rounded border border-app-border bg-app-card font-mono text-[9px] shadow-xs">←</kbd> <kbd className="px-1.5 py-0.5 rounded border border-app-border bg-app-card font-mono text-[9px] shadow-xs">→</kbd> và <kbd className="px-3 py-0.5 rounded border border-app-border bg-app-card font-mono text-[9px] shadow-xs">Space</kbd>
            </div>
          </div>
        </div>
      ) : (
        /* --- QUIZ MODE VIEW --- */
        <div className="flex flex-1 flex-col items-center justify-center max-w-xl mx-auto w-full">
          {filteredWords.length < 4 ? (
            <div className="text-center rounded-2xl border border-app-border bg-app-card p-8">
              <Award className="mx-auto h-12 w-12 text-app-text/20 mb-3" />
              <h3 className="text-sm font-bold">Số lượng từ vựng không đủ để làm Quiz</h3>
              <p className="text-xs text-app-text/60 mt-1 max-w-xs">
                Để tạo một bài trắc nghiệm 4 đáp án, bạn cần ít nhất 4 từ vựng trong danh sách lọc. Hãy chọn danh mục học rộng hơn.
              </p>
            </div>
          ) : showResults ? (
            /* Quiz Score Summary Screen */
            <div className="w-full rounded-2xl border border-app-border bg-app-card p-6 shadow-md text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-app-accent/10 p-5 text-app-accent mb-4">
                <Award className="h-10 w-10" />
              </div>
              
              <h2 className="text-xl font-extrabold text-app-text mb-1">Kết quả bài Quiz</h2>
              <p className="text-xs text-app-text/60 mb-6">Bạn đã học xong các từ vựng này hôm nay!</p>

              <div className="flex justify-center gap-12 mb-6">
                <div>
                  <span className="block text-3xl font-extrabold text-app-accent">
                    {score}/{quizQuestions.length}
                  </span>
                  <span className="text-[10px] font-bold text-app-text/40 uppercase tracking-wider">Đúng</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold text-app-text/60">
                    {Math.round((score / quizQuestions.length) * 100)}%
                  </span>
                  <span className="text-[10px] font-bold text-app-text/40 uppercase tracking-wider">Độ chính xác</span>
                </div>
              </div>

              {/* Incorrect Words Review Section */}
              {incorrectAnswers.length > 0 && (
                <div className="mb-6 text-left border-t border-app-border/40 pt-4">
                  <span className="block text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-3">
                    Các từ cần ôn lại ({incorrectAnswers.length}):
                  </span>
                  
                  <div className="max-h-48 overflow-y-auto space-y-2.5 pr-2">
                    {incorrectAnswers.map((item, i) => (
                      <div key={i} className="flex flex-col gap-1 rounded-lg bg-rose-500/5 border border-rose-500/10 p-3 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-rose-500 text-sm select-all">{item.word.word}</span>
                          <span className="font-mono text-[10px] text-app-text/50">{item.word.pronunciation}</span>
                        </div>
                        <div className="text-app-text/80 font-medium">
                          Nghĩa đúng: <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.word.meaning}</span>
                        </div>
                        <div className="text-[11px] text-app-text/40">
                          Bạn đã chọn: <span className="line-through">{item.userAnswer}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  onClick={startNewQuiz}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-app-accent px-4 py-2.5 text-xs font-bold text-white hover:opacity-90 cursor-pointer active:scale-98 transition-all shadow-xs"
                >
                  <RefreshCw className="h-4 w-4" />
                  Làm Quiz Mới
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Quiz Question card */
            <div className="w-full flex flex-col">
              {/* Quiz progress */}
              <div className="mb-3 flex items-center justify-between text-xs font-medium text-app-text/60">
                <span>Câu hỏi {currentQuizIndex + 1} / {quizQuestions.length}</span>
                <span className="font-mono">Đúng: {score}</span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full rounded-full bg-app-border/40 overflow-hidden mb-6">
                <div
                  className="h-full bg-app-accent transition-all duration-300"
                  style={{ width: `${((currentQuizIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question Box */}
              <div className="w-full rounded-2xl border border-app-border bg-app-card p-6 shadow-md mb-4 text-center">
                <span className="text-[10px] font-bold text-app-text/40 uppercase tracking-widest block mb-2">
                  Tìm nghĩa của từ:
                </span>
                <h2 className="text-3xl font-extrabold text-app-accent select-all">
                  {quizQuestions[currentQuizIndex]?.word.word}
                </h2>
                <div className="mt-2 flex justify-center">
                  <span className="rounded-md bg-app-bg px-2 py-0.5 font-mono text-[10px] text-app-text/50 border border-app-border/40">
                    {quizQuestions[currentQuizIndex]?.word.pos} • {quizQuestions[currentQuizIndex]?.word.pronunciation}
                  </span>
                </div>
              </div>

              {/* 4 Choices Options */}
              <div className="grid grid-cols-1 gap-2.5 mb-6">
                {quizQuestions[currentQuizIndex]?.options.map((option, index) => {
                  const isAnswered = selectedOption !== null;
                  const isCorrectAnswer = index === quizQuestions[currentQuizIndex].correctIndex;
                  const isSelected = index === selectedOption;

                  let optionClass = "border-app-border hover:bg-app-hover hover:border-app-text/20 bg-app-card text-app-text";
                  let icon = null;

                  if (isAnswered) {
                    if (isCorrectAnswer) {
                      optionClass = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold";
                      icon = <Check className="h-4 w-4 text-emerald-600 shrink-0" />;
                    } else if (isSelected) {
                      optionClass = "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-400 font-semibold";
                      icon = <X className="h-4 w-4 text-rose-600 shrink-0" />;
                    } else {
                      optionClass = "border-app-border bg-app-card opacity-50 text-app-text/60";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectOption(index)}
                      disabled={isAnswered}
                      className={`flex w-full items-center justify-between rounded-xl border p-4 text-left text-xs font-medium cursor-pointer transition-all ${optionClass}`}
                    >
                      <span>{option}</span>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {/* Next Question button */}
              {selectedOption !== null && (
                <button
                  onClick={handleNextQuestion}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-app-accent px-4 py-3 text-xs font-bold text-white hover:opacity-90 active:scale-98 transition-all shadow-md self-center"
                >
                  {currentQuizIndex + 1 === quizQuestions.length ? "Xem kết quả" : "Câu tiếp theo"}
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
