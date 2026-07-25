import { CheckCircle2, PlayCircle, Circle, Sun, Moon, Coffee } from 'lucide-react';
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
    { name: 'light', icon: <Sun className="h-4 w-4" />, label: 'Light' },
    { name: 'dark', icon: <Moon className="h-4 w-4" />, label: 'Dark' },
    { name: 'sepia', icon: <Coffee className="h-4 w-4" />, label: 'Sepia' }
  ];

  return (
    <div 
      style={{ width }}
      className="flex h-full flex-col border-r border-app-border bg-app-sidebar shrink-0 overflow-hidden"
    >
      {/* App Logo / Brand */}
      <div className="flex h-14 items-center justify-between border-b border-app-border px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-accent shadow-sm">
            <span className="text-xs font-extrabold text-white">T</span>
          </div>
          <h1 className="truncate text-sm font-bold tracking-wide text-app-text">
            {bookTitle || 'TOEIC HUB'}
          </h1>
        </div>
      </div>

      {/* Test List Section */}
      <div className="flex-1 overflow-y-auto px-2.5 py-4">
        <div className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.12em] text-app-text-muted">
          Practice Tests
        </div>
        <nav className="space-y-1">
          {tests.map((test) => {
            const status = testProgress[test.id] || 'not-started';
            const isActive = test.id === activeTestId;

            let statusIcon = <Circle className="h-4 w-4 text-app-text-muted/60" />;
            if (status === 'completed') {
              statusIcon = <CheckCircle2 className="h-4 w-4 text-emerald-500 drop-shadow-sm" />;
            } else if (status === 'in-progress') {
              statusIcon = <PlayCircle className="h-4 w-4 text-app-accent" />;
            }

            return (
              <button
                key={test.id}
                onClick={() => onSelectTest(test.id)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-app-accent-soft text-app-accent shadow-sm border border-app-accent/15'
                    : 'text-app-text/70 hover:bg-app-hover hover:text-app-text border border-transparent'
                }`}
              >
                <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                  {statusIcon}
                </span>
                <span>Test {test.id}</span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-app-accent animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Theme Switcher */}
      <div className="border-t border-app-border p-3">
        <div className="flex items-center justify-between rounded-xl bg-app-hover/60 p-1 border border-app-border/30">
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => onThemeChange(t.name)}
              title={t.label}
              className={`flex flex-1 justify-center rounded-lg py-1.5 transition-all duration-200 cursor-pointer ${
                theme === t.name
                  ? 'bg-app-card text-app-accent shadow-sm border border-app-border/30'
                  : 'text-app-text-muted hover:text-app-text'
              }`}
            >
              {t.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
