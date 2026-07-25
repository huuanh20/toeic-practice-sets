import type { KeyboardEvent } from 'react';
import { FileText, AlignLeft, Book, CheckSquare, Square, FileEdit, ZoomIn, ZoomOut, Maximize2, ChevronLeft, ChevronRight, Columns, ExternalLink, ClipboardList, Sparkles } from 'lucide-react';

interface ToolbarProps {
  activeTab: 'practice' | 'transcript' | 'vocabulary';
  onTabChange: (tab: 'practice' | 'transcript' | 'vocabulary') => void;
  page: number;
  numPages: number;
  onPageChange: (page: number) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  audioSpeed: number;
  onOpenNotes: () => void;
  testStatus: 'completed' | 'in-progress' | 'not-started';
  onToggleStatus: () => void;
  isSplit: boolean;
  onToggleSplit: () => void;
  pdfUrl: string;
  showAnswerSheet: boolean;
  onToggleAnswerSheet: () => void;
  vocabViewMode?: 'pdf' | 'quizlet';
}

export function Toolbar({
  activeTab,
  onTabChange,
  page,
  numPages,
  onPageChange,
  zoom,
  onZoomChange,
  audioSpeed,
  onOpenNotes,
  testStatus,
  onToggleStatus,
  isSplit,
  onToggleSplit,
  pdfUrl,
  showAnswerSheet,
  onToggleAnswerSheet,
  vocabViewMode = 'pdf'
}: ToolbarProps) {
  const handlePageInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = parseInt(e.currentTarget.value, 10);
      if (!isNaN(val) && val >= 1 && val <= numPages) {
        onPageChange(val);
      } else {
        e.currentTarget.value = page.toString();
      }
    }
  };

  const tabClass = (tab: string) =>
    `flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
      activeTab === tab
        ? 'gradient-accent text-white shadow-md shadow-app-accent/20'
        : 'text-app-text-muted hover:bg-app-hover hover:text-app-text'
    }`;

  return (
    <div className="flex h-14 w-full items-center justify-between border-b border-app-border bg-app-card px-4 shadow-sm">
      {/* Left: Tab selectors */}
      <div className="flex items-center gap-1 rounded-2xl bg-app-hover/40 p-1 border border-app-border/30">
        <button onClick={() => onTabChange('practice')} className={tabClass('practice')}>
          <FileText className="h-3.5 w-3.5" />
          Practice
        </button>
        
        <button onClick={() => onTabChange('transcript')} className={tabClass('transcript')}>
          <AlignLeft className="h-3.5 w-3.5" />
          Transcript
        </button>

        <button onClick={() => onTabChange('vocabulary')} className={tabClass('vocabulary')}>
          <Book className="h-3.5 w-3.5" />
          Vocabulary
        </button>

        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Mở PDF gốc trong tab mới để copy chữ (Chrome/Edge tự động OCR)"
          className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-semibold text-app-accent hover:bg-app-accent-soft transition-all ml-0.5 cursor-pointer"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span className="hidden lg:inline">Mở PDF gốc</span>
        </a>
      </div>

      {/* Middle: PDF Pagination & Zoom */}
      {!(activeTab === 'vocabulary' && vocabViewMode === 'quizlet') ? (
        <div className="flex items-center gap-6">
          {/* Pagination */}
          <div className="flex items-center gap-1.5 text-sm text-app-text">
            <button
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page <= 1}
              title="Previous Page (PageUp / ArrowUp)"
              className="rounded-lg p-1.5 text-app-text-muted hover:bg-app-hover hover:text-app-text disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <input
              key={`${activeTab}-${page}`}
              type="text"
              defaultValue={page}
              onKeyDown={handlePageInput}
              onBlur={(e) => { e.target.value = page.toString(); }}
              className="w-12 rounded-lg border border-app-border bg-app-bg px-1 py-1 text-center text-sm font-medium text-app-text focus:border-app-accent focus:outline-hidden focus:ring-1 focus:ring-app-accent/20 transition-all"
            />
            <span className="text-app-text-muted font-medium">/</span>
            <span className="font-semibold">{numPages || '--'}</span>

            <button
              onClick={() => onPageChange(Math.min(numPages, page + 1))}
              disabled={page >= numPages}
              title="Next Page (PageDown / ArrowDown)"
              className="rounded-lg p-1.5 text-app-text-muted hover:bg-app-hover hover:text-app-text disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Zoom */}
          <div className="flex items-center gap-1 border-l border-app-border pl-4">
            <button
              onClick={() => onZoomChange(Math.max(0.5, zoom - 0.1))}
              title="Zoom Out"
              className="rounded-lg p-1.5 text-app-text-muted hover:bg-app-hover hover:text-app-text cursor-pointer transition-all"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="w-14 text-center text-xs font-bold text-app-text-muted tabular-nums">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => onZoomChange(Math.min(3.0, zoom + 0.1))}
              title="Zoom In"
              className="rounded-lg p-1.5 text-app-text-muted hover:bg-app-hover hover:text-app-text cursor-pointer transition-all"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={() => onZoomChange(1.0)}
              title="Reset Zoom"
              className="ml-1 rounded-lg p-1.5 text-app-text-muted/50 hover:bg-app-hover hover:text-app-text cursor-pointer transition-all"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-xl bg-app-accent-soft px-4 py-1.5 text-xs font-bold text-app-accent border border-app-accent/20 animate-pulse shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-app-accent" />
          Interactive Quizlet Active
        </div>
      )}

      {/* Right: Info Indicators, Notes & Toggle Status */}
      <div className="flex items-center gap-2.5">
        {/* Speed indicator */}
        <div className="hidden rounded-xl bg-app-hover/60 px-2.5 py-1 text-xs font-bold text-app-text-muted sm:block border border-app-border/20 tabular-nums">
          Speed: {audioSpeed.toFixed(2)}x
        </div>

        {/* Complete Toggle */}
        <button
          onClick={onToggleStatus}
          title={testStatus === 'completed' ? "Mark as In Progress" : "Mark as Completed"}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 border cursor-pointer ${
            testStatus === 'completed'
              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-sm'
              : 'bg-app-bg text-app-text-muted border-app-border hover:bg-app-hover hover:text-app-text'
          }`}
        >
          {testStatus === 'completed' ? (
            <CheckSquare className="h-4 w-4 text-emerald-500" />
          ) : (
            <Square className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">{testStatus === 'completed' ? 'Completed' : 'Complete?'}</span>
        </button>

        {/* Split View Toggle */}
        <button
          onClick={onToggleSplit}
          title={isSplit ? "Switch to Single View" : "Switch to Split View (Reading + Vocab)"}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 border cursor-pointer ${
            isSplit
              ? 'gradient-accent text-white border-transparent shadow-md shadow-app-accent/20'
              : 'bg-app-bg text-app-text-muted border-app-border hover:bg-app-hover hover:text-app-text'
          }`}
        >
          <Columns className="h-4 w-4" />
          <span className="hidden sm:inline">{isSplit ? 'Single View' : 'Split View'}</span>
        </button>

        {/* Answer Sheet Toggle */}
        <button
          onClick={onToggleAnswerSheet}
          title={showAnswerSheet ? "Hide Answer Sheet" : "Show Answer Sheet (Phiếu đáp án)"}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 border cursor-pointer ${
            showAnswerSheet
              ? 'gradient-accent text-white border-transparent shadow-md shadow-app-accent/20'
              : 'bg-app-bg text-app-text-muted border-app-border hover:bg-app-hover hover:text-app-text'
          }`}
        >
          <ClipboardList className="h-4 w-4" />
          <span className="hidden sm:inline">{showAnswerSheet ? 'Hide Sheet' : 'Answer Sheet'}</span>
        </button>

        {/* Notes Trigger */}
        <button
          onClick={onOpenNotes}
          className="flex items-center gap-1.5 rounded-xl gradient-accent px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:opacity-90 shadow-md shadow-app-accent/25 cursor-pointer hover:shadow-lg hover:shadow-app-accent/30 active:scale-[0.97]"
        >
          <FileEdit className="h-3.5 w-3.5" />
          Notes
        </button>
      </div>
    </div>
  );
}
