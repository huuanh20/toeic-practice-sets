import type { KeyboardEvent } from 'react';
import {
  FileText, AlignLeft, Book, CheckSquare, Square,
  FileEdit, ZoomIn, ZoomOut, Maximize2, ChevronLeft, ChevronRight,
  Columns, ExternalLink, ClipboardList, Sparkles
} from 'lucide-react';

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
  vocabViewMode = 'pdf',
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

  // Tab button builder
  const Tab = ({ id, icon, label }: { id: 'practice' | 'transcript' | 'vocabulary'; icon: React.ReactNode; label: string }) => (
    <button
      onClick={() => onTabChange(id)}
      className={`relative flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
        activeTab === id
          ? 'gradient-accent text-white shadow-app-accent'
          : 'text-app-text-muted hover:bg-app-hover hover:text-app-text'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  // Speed badge color class
  const speedClass =
    audioSpeed <= 0.75 ? 'speed-slow' :
    audioSpeed >= 1.5  ? 'speed-fast' :
    'speed-normal';

  // Toolbar icon button builder
  const IconBtn = ({
    onClick, active, title, children, activeClass, className = '',
  }: {
    onClick: () => void;
    active?: boolean;
    title: string;
    children: React.ReactNode;
    activeClass?: string;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      title={title}
      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
        active
          ? activeClass ?? 'gradient-accent text-white border-transparent shadow-app-accent'
          : 'bg-app-bg text-app-text-muted border-app-border hover:bg-app-hover hover:text-app-text'
      } ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex h-14 w-full items-center justify-between border-b border-app-border bg-app-card px-4 shadow-app-sm shrink-0 gap-3">

      {/* ── Left: Tab Navigation ── */}
      <div className="flex items-center gap-1 rounded-xl bg-app-hover/50 p-1 border border-app-border/30">
        <Tab id="practice"   icon={<FileText  className="h-3.5 w-3.5" />} label="Practice"   />
        <Tab id="transcript" icon={<AlignLeft className="h-3.5 w-3.5" />} label="Transcript" />
        <Tab id="vocabulary" icon={<Book      className="h-3.5 w-3.5" />} label="Vocab"      />

        {/* Open original PDF */}
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Mở PDF gốc trong tab mới để copy chữ"
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-app-accent hover:bg-app-accent-soft transition-all ml-0.5 cursor-pointer"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span className="hidden xl:inline">PDF Gốc</span>
        </a>
      </div>

      {/* ── Middle: Pagination & Zoom or Quizlet Badge ── */}
      {!(activeTab === 'vocabulary' && vocabViewMode === 'quizlet') ? (
        <div className="flex items-center gap-4">
          {/* Pagination */}
          <div className="flex items-center gap-1 text-sm text-app-text">
            <button
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page <= 1}
              title="Previous (PageUp)"
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
              className="w-11 rounded-lg border border-app-border bg-app-bg px-1 py-1 text-center text-sm font-semibold text-app-text focus:border-app-accent focus:outline-none focus:ring-2 focus:ring-app-accent/20 transition-all"
            />
            <span className="text-app-text-muted font-medium text-xs px-0.5">/</span>
            <span className="font-bold text-sm min-w-[2rem] text-center tabular-nums">{numPages || '--'}</span>

            <button
              onClick={() => onPageChange(Math.min(numPages, page + 1))}
              disabled={page >= numPages}
              title="Next (PageDown)"
              className="rounded-lg p-1.5 text-app-text-muted hover:bg-app-hover hover:text-app-text disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-5 w-px bg-app-border" />

          {/* Zoom */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => onZoomChange(Math.max(0.5, zoom - 0.1))}
              title="Zoom Out"
              className="rounded-lg p-1.5 text-app-text-muted hover:bg-app-hover hover:text-app-text cursor-pointer transition-all"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              onClick={() => onZoomChange(1.0)}
              title="Reset Zoom"
              className="w-14 text-center rounded-lg px-1 py-1 text-xs font-bold text-app-text-muted hover:bg-app-hover hover:text-app-text cursor-pointer transition-all tabular-nums"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={() => onZoomChange(Math.min(3.0, zoom + 0.1))}
              title="Zoom In"
              className="rounded-lg p-1.5 text-app-text-muted hover:bg-app-hover hover:text-app-text cursor-pointer transition-all"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={() => onZoomChange(1.0)}
              title="Fit to Window"
              className="rounded-lg p-1.5 text-app-text-muted/50 hover:bg-app-hover hover:text-app-text cursor-pointer transition-all"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-xl bg-app-accent-soft px-4 py-1.5 text-xs font-bold text-app-accent border border-app-accent/20 animate-pulse-light shadow-app-sm">
          <Sparkles className="h-3.5 w-3.5" />
          Interactive Quizlet Active
        </div>
      )}

      {/* ── Right: Controls ── */}
      <div className="flex items-center gap-2">
        {/* Speed badge */}
        <div
          className={`hidden rounded-xl px-2.5 py-1 text-xs font-bold sm:flex items-center gap-1 border border-current/20 tabular-nums transition-all ${speedClass}`}
          title="Audio playback speed"
        >
          {audioSpeed.toFixed(2)}×
        </div>

        {/* Complete toggle */}
        <IconBtn
          onClick={onToggleStatus}
          active={testStatus === 'completed'}
          title={testStatus === 'completed' ? 'Mark as In Progress' : 'Mark as Completed'}
          activeClass="bg-emerald-500/10 text-emerald-600 border-emerald-500/25 shadow-none"
        >
          {testStatus === 'completed'
            ? <CheckSquare className="h-3.5 w-3.5 text-emerald-500" />
            : <Square      className="h-3.5 w-3.5" />
          }
          <span className="hidden lg:inline">
            {testStatus === 'completed' ? 'Done ✓' : 'Complete?'}
          </span>
        </IconBtn>

        {/* Split view */}
        <IconBtn
          onClick={onToggleSplit}
          active={isSplit}
          title={isSplit ? 'Single View' : 'Split View (Practice + Vocab)'}
        >
          <Columns className="h-3.5 w-3.5" />
          <span className="hidden lg:inline">{isSplit ? 'Single' : 'Split'}</span>
        </IconBtn>

        {/* Answer sheet */}
        <IconBtn
          onClick={onToggleAnswerSheet}
          active={showAnswerSheet}
          title={showAnswerSheet ? 'Hide Answer Sheet' : 'Show Answer Sheet'}
        >
          <ClipboardList className="h-3.5 w-3.5" />
          <span className="hidden lg:inline">{showAnswerSheet ? 'Hide' : 'Answers'}</span>
        </IconBtn>

        {/* Notes — always gradient */}
        <button
          onClick={onOpenNotes}
          title="Open Notes"
          className="flex items-center gap-1.5 rounded-xl gradient-accent px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:opacity-90 shadow-app-accent cursor-pointer hover:shadow-lg active:scale-[0.97] ripple-container"
        >
          <FileEdit className="h-3.5 w-3.5" />
          Notes
        </button>
      </div>
    </div>
  );
}
