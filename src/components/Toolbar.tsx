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

  return (
    <div className="flex h-14 w-full items-center justify-between border-b border-app-border bg-app-card px-4 shadow-xs">
      {/* Left: Tab selectors */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onTabChange('practice')}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
            activeTab === 'practice'
              ? 'bg-app-accent text-white'
              : 'text-app-text/60 hover:bg-app-hover hover:text-app-text'
          }`}
        >
          <FileText className="h-3.5 w-3.5" />
          Practice
        </button>
        
        <button
          onClick={() => onTabChange('transcript')}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
            activeTab === 'transcript'
              ? 'bg-app-accent text-white'
              : 'text-app-text/60 hover:bg-app-hover hover:text-app-text'
          }`}
        >
          <AlignLeft className="h-3.5 w-3.5" />
          Transcript
        </button>

        <button
          onClick={() => onTabChange('vocabulary')}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
            activeTab === 'vocabulary'
              ? 'bg-app-accent text-white'
              : 'text-app-text/60 hover:bg-app-hover hover:text-app-text'
          }`}
        >
          <Book className="h-3.5 w-3.5" />
          Vocabulary
        </button>

        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Mở PDF gốc trong tab mới để copy chữ (Chrome/Edge tự động OCR)"
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-app-accent hover:bg-app-hover transition-all border border-dashed border-app-accent/30 ml-2"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Mở PDF gốc
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
              className="rounded p-1 text-app-text/60 hover:bg-app-hover hover:text-app-text disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <input
              key={`${activeTab}-${page}`} // Force input value update when page changes
              type="text"
              defaultValue={page}
              onKeyDown={handlePageInput}
              onBlur={(e) => { e.target.value = page.toString(); }}
              className="w-12 rounded border border-app-border bg-app-bg px-1 py-0.5 text-center text-sm text-app-text focus:border-app-accent focus:outline-hidden"
            />
            <span className="text-app-text/40">/</span>
            <span>{numPages || '--'}</span>

            <button
              onClick={() => onPageChange(Math.min(numPages, page + 1))}
              disabled={page >= numPages}
              title="Next Page (PageDown / ArrowDown)"
              className="rounded p-1 text-app-text/60 hover:bg-app-hover hover:text-app-text disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Zoom */}
          <div className="flex items-center gap-1 border-l border-app-border pl-4">
            <button
              onClick={() => onZoomChange(Math.max(0.5, zoom - 0.1))}
              title="Zoom Out"
              className="rounded p-1 text-app-text/60 hover:bg-app-hover hover:text-app-text"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="w-14 text-center text-xs font-semibold text-app-text/80">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => onZoomChange(Math.min(3.0, zoom + 0.1))}
              title="Zoom In"
              className="rounded p-1 text-app-text/60 hover:bg-app-hover hover:text-app-text"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={() => onZoomChange(1.0)}
              title="Reset Zoom"
              className="ml-1 rounded p-1 text-app-text/40 hover:bg-app-hover hover:text-app-text"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-lg bg-app-hover/50 px-4 py-1.5 text-xs font-bold text-app-accent border border-app-accent/25 animate-pulse shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-app-accent" />
          Interactive Quizlet Active
        </div>
      )}

      {/* Right: Info Indicators, Notes & Toggle Status */}
      <div className="flex items-center gap-3">
        {/* Speed indicator */}
        <div className="hidden rounded-md bg-app-hover/70 px-2 py-1 text-xs font-semibold text-app-text/85 sm:block border border-app-border/20">
          Speed: {audioSpeed.toFixed(2)}x
        </div>

        {/* Complete Toggle */}
        <button
          onClick={onToggleStatus}
          title={testStatus === 'completed' ? "Mark as In Progress" : "Mark as Completed"}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold tracking-wider transition-all border ${
            testStatus === 'completed'
              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
              : 'bg-app-bg text-app-text/85 border-app-border hover:bg-app-hover'
          }`}
        >
          {testStatus === 'completed' ? (
            <CheckSquare className="h-4 w-4 text-emerald-500" />
          ) : (
            <Square className="h-4 w-4" />
          )}
          <span>{testStatus === 'completed' ? 'Completed' : 'Complete?'}</span>
        </button>

        {/* Split View Toggle */}
        <button
          onClick={onToggleSplit}
          title={isSplit ? "Switch to Single View" : "Switch to Split View (Reading + Vocab)"}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold tracking-wider transition-all border cursor-pointer ${
            isSplit
              ? 'bg-app-accent text-white border-app-accent shadow-xs'
              : 'bg-app-bg text-app-text/85 border-app-border hover:bg-app-hover'
          }`}
        >
          <Columns className="h-4 w-4" />
          <span className="hidden sm:inline">{isSplit ? 'Single View' : 'Split View'}</span>
        </button>

        {/* Answer Sheet Toggle */}
        <button
          onClick={onToggleAnswerSheet}
          title={showAnswerSheet ? "Hide Answer Sheet" : "Show Answer Sheet (Phiếu đáp án)"}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold tracking-wider transition-all border cursor-pointer ${
            showAnswerSheet
              ? 'bg-app-accent text-white border-app-accent shadow-xs'
              : 'bg-app-bg text-app-text/85 border-app-border hover:bg-app-hover'
          }`}
        >
          <ClipboardList className="h-4 w-4" />
          <span className="hidden sm:inline">{showAnswerSheet ? 'Hide Sheet' : 'Answer Sheet'}</span>
        </button>

        {/* Notes Trigger */}
        <button
          onClick={onOpenNotes}
          className="flex items-center gap-1.5 rounded-md bg-app-accent px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:opacity-90 shadow-xs cursor-pointer"
        >
          <FileEdit className="h-3.5 w-3.5" />
          Notes
        </button>
      </div>
    </div>
  );
}
