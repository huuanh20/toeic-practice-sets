import { CheckCircle2, PlayCircle, Circle, Sun, Moon, Coffee, Command } from 'lucide-react';
import type { Test } from '../types/library';

interface SidebarProps {
  width: number;
  tests: Test[];
  activeTestId: number;
  onSelectTest: (testId: number) => void;
  testProgress: Record<number, 'completed' | 'in-progress' | 'not-started'>;
  theme: 'light' | 'dark' | 'sepia';
  onThemeChange: (theme: 'light' | 'dark' | 'sepia') => void;
  bookTitle: string;
}

export function Sidebar({
  width,
  tests,
  activeTestId,
  onSelectTest,
  testProgress,
  theme,
  onThemeChange,
  bookTitle
}: SidebarProps) {
  const themes: { name: 'light' | 'dark' | 'sepia'; icon: React.ReactNode; label: string }[] = [
    { name: 'light', icon: <Sun className="h-3.5 w-3.5" />, label: 'Light' },
    { name: 'dark',  icon: <Moon className="h-3.5 w-3.5" />, label: 'Dark' },
    { name: 'sepia', icon: <Coffee className="h-3.5 w-3.5" />, label: 'Sepia' },
  ];

  const completedCount = tests.filter(t => testProgress[t.id] === 'completed').length;
  const overallProgress = tests.length > 0 ? Math.round((completedCount / tests.length) * 100) : 0;

  return (
    <div
      style={{ width }}
      className="flex h-full flex-col border-r border-app-border bg-app-sidebar shrink-0 overflow-hidden"
    >
      {/* ── Brand Header ── */}
      <div className="flex h-14 items-center gap-3 border-b border-app-border px-4">
        {/* Logo icon with glow */}
        <div className="relative flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl gradient-accent shadow-app-accent animate-glow-pulse">
            <span className="text-sm font-extrabold text-white tracking-tight">T</span>
          </div>
          {/* Glow bloom */}
          <div className="absolute inset-0 rounded-xl gradient-accent opacity-30 blur-md -z-10 scale-125" />
        </div>
        <div className="flex flex-col leading-tight min-w-0">
          <h1 className="truncate text-sm font-extrabold tracking-wide text-app-text">
            {bookTitle || 'TOEIC HUB'}
          </h1>
          <span className="text-[10px] font-medium text-app-text-muted">Study Platform</span>
        </div>
      </div>

      {/* ── Overall Progress Strip ── */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-app-text-muted">
            Overall Progress
          </span>
          <span className="text-[10px] font-bold text-app-accent tabular-nums">
            {completedCount}/{tests.length}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-app-hover overflow-hidden">
          <div
            className="h-full rounded-full gradient-accent transition-all duration-700 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* ── Test List ── */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3">
        <div className="mb-2.5 px-2 text-[10px] font-bold uppercase tracking-[0.12em] text-app-text-muted">
          Practice Tests
        </div>
        <nav className="space-y-1">
          {tests.map((test) => {
            const status = testProgress[test.id] || 'not-started';
            const isActive = test.id === activeTestId;

            let statusIcon: React.ReactNode;
            let statusColor = '';
            if (status === 'completed') {
              statusIcon = <CheckCircle2 className="h-4 w-4 shrink-0" />;
              statusColor = 'text-app-success';
            } else if (status === 'in-progress') {
              statusIcon = <PlayCircle className="h-4 w-4 shrink-0" />;
              statusColor = 'text-app-accent';
            } else {
              statusIcon = <Circle className="h-4 w-4 shrink-0 opacity-40" />;
              statusColor = 'text-app-text-muted';
            }

            return (
              <button
                key={test.id}
                onClick={() => onSelectTest(test.id)}
                className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'sidebar-item-active text-app-accent'
                    : 'text-app-text/70 hover:bg-app-hover hover:text-app-text border border-transparent hover:border-app-border/40'
                }`}
              >
                {/* Status icon */}
                <span className={`transition-transform duration-200 ${statusColor} ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                  {statusIcon}
                </span>

                {/* Label */}
                <span className="flex-1 text-left">Test {test.id}</span>

                {/* Active pulse dot */}
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-app-accent animate-pulse-light shrink-0" />
                )}

                {/* Completed badge */}
                {status === 'completed' && !isActive && (
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-app-success/80 bg-app-success/10 px-1.5 py-0.5 rounded-full shrink-0">
                    Done
                  </span>
                )}

                {status === 'in-progress' && !isActive && (
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-app-accent/80 bg-app-accent-soft px-1.5 py-0.5 rounded-full shrink-0">
                    •••
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Theme Switcher ── */}
      <div className="border-t border-app-border px-3 py-3 space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-app-hover/50 p-1 border border-app-border/30">
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => onThemeChange(t.name)}
              title={t.label}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                theme === t.name
                  ? 'bg-app-card text-app-accent shadow-app-sm border border-app-border/30'
                  : 'text-app-text-muted hover:text-app-text'
              }`}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Ctrl+K Hint */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-app-text-muted/60">
          <Command className="h-3 w-3" />
          <span>Press <kbd className="font-bold text-app-text-muted/80">Ctrl K</kbd> for commands</span>
        </div>
      </div>
    </div>
  );
}
