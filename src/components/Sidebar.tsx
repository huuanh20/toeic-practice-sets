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
        <h1 className="truncate text-sm font-bold tracking-wider text-app-text/90">
          {bookTitle || 'TOEIC HUB'}
        </h1>
      </div>

      {/* Test List Section */}
      <div className="flex-1 overflow-y-auto px-2 py-4">
        <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-app-text/50">
          Practice Tests
        </div>
        <nav className="space-y-1">
          {tests.map((test) => {
            const status = testProgress[test.id] || 'not-started';
            const isActive = test.id === activeTestId;

            let statusIcon = <Circle className="h-4 w-4 text-app-text/40" />;
            if (status === 'completed') {
              statusIcon = <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
            } else if (status === 'in-progress') {
              statusIcon = <PlayCircle className="h-4 w-4 text-app-accent" />;
            }

            return (
              <button
                key={test.id}
                onClick={() => onSelectTest(test.id)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-app-hover text-app-text border border-app-border/40 shadow-xs'
                    : 'text-app-text/80 hover:bg-app-hover hover:text-app-text'
                }`}
              >
                {statusIcon}
                <span>Test {test.id}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Theme Switcher at bottom */}
      <div className="border-t border-app-border p-3">
        <div className="flex items-center justify-between rounded-lg bg-app-hover/50 p-1 border border-app-border/30">
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => onThemeChange(t.name)}
              title={t.label}
              className={`flex flex-1 justify-center rounded-md py-1.5 transition-all ${
                theme === t.name
                  ? 'bg-app-card text-app-text shadow-xs border border-app-border/20'
                  : 'text-app-text/50 hover:text-app-text'
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
