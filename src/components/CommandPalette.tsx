import React, { useState, useEffect, useRef } from 'react';
import { Search, Compass, BookOpen, Monitor, ShieldAlert, Sparkles, FileDown, FileUp } from 'lucide-react';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTest: (testId: number) => void;
  onTabChange: (tab: 'practice' | 'transcript' | 'vocabulary') => void;
  onThemeChange: (theme: 'light' | 'dark' | 'sepia') => void;
  onToggleFullscreen: () => void;
  onOpenNotes: () => void;
  onExportNotes: () => void;
  onImportNotes: () => void;
  onResumeAudio: () => void;
  hasAudioToResume: boolean;
  testsCount: number;
}

interface CommandItem {
  id: string;
  label: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectTest,
  onTabChange,
  onThemeChange,
  onToggleFullscreen,
  onOpenNotes,
  onExportNotes,
  onImportNotes,
  onResumeAudio,
  hasAudioToResume,
  testsCount
}: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate commands list dynamically
  const commands: CommandItem[] = [];

  // 1. Navigation Commands
  commands.push(
    { id: 'tab-practice', label: 'Switch to Practice Tab', category: 'Navigation', icon: <BookOpen className="h-4 w-4" />, action: () => onTabChange('practice') },
    { id: 'tab-transcript', label: 'Switch to Transcript Tab', category: 'Navigation', icon: <BookOpen className="h-4 w-4" />, action: () => onTabChange('transcript') },
    { id: 'tab-vocabulary', label: 'Switch to Vocabulary Tab', category: 'Navigation', icon: <BookOpen className="h-4 w-4" />, action: () => onTabChange('vocabulary') }
  );

  // 2. Test Commands
  for (let i = 1; i <= testsCount; i++) {
    commands.push({
      id: `test-${i}`,
      label: `Jump to Test ${i}`,
      category: 'Tests',
      icon: <Compass className="h-4 w-4" />,
      action: () => onSelectTest(i)
    });
  }

  // 3. Theme Commands
  commands.push(
    { id: 'theme-sepia', label: 'Set Theme: Sepia (Paper Warm)', category: 'Preferences', icon: <Sparkles className="h-4 w-4" />, action: () => onThemeChange('sepia') },
    { id: 'theme-dark', label: 'Set Theme: Dark Mode', category: 'Preferences', icon: <Sparkles className="h-4 w-4" />, action: () => onThemeChange('dark') },
    { id: 'theme-light', label: 'Set Theme: Light Mode', category: 'Preferences', icon: <Sparkles className="h-4 w-4" />, action: () => onThemeChange('light') }
  );

  // 4. Action Commands
  if (hasAudioToResume) {
    commands.push({ id: 'action-resume', label: 'Resume Last Audio Position', category: 'Actions', icon: <Monitor className="h-4 w-4" />, action: onResumeAudio });
  }
  commands.push(
    { id: 'action-notes', label: 'Open Study Notes Modal', category: 'Actions', icon: <Monitor className="h-4 w-4" />, action: onOpenNotes },
    { id: 'action-fullscreen', label: 'Toggle Fullscreen Reader (F)', category: 'Actions', icon: <Monitor className="h-4 w-4" />, action: onToggleFullscreen },
    { id: 'action-export', label: 'Export Study Notes (.json)', category: 'Actions', icon: <FileDown className="h-4 w-4" />, action: onExportNotes },
    { id: 'action-import', label: 'Import Study Notes (.json)', category: 'Actions', icon: <FileUp className="h-4 w-4" />, action: onImportNotes }
  );

  // Filter commands based on search
  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      // Timeout ensures the DOM modal is fully mounted
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation inside palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-[15vh] backdrop-blur-xs">
      <div className="w-full max-w-lg overflow-hidden rounded-lg border border-app-border bg-app-card shadow-2xl">
        {/* Search Input */}
        <div className="flex items-center border-b border-app-border px-4 py-3">
          <Search className="mr-3 h-5 w-5 text-app-text/40" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-app-text placeholder-app-text/40 outline-hidden"
          />
        </div>

        {/* Commands List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-app-text/50">
              <ShieldAlert className="mb-2 h-5 w-5 opacity-60" />
              <span className="text-xs">No matching commands found.</span>
            </div>
          ) : (
            <div>
              {/* Group commands by category in output */}
              {Array.from(new Set(filteredCommands.map((c) => c.category))).map((category) => {
                const categoryCommands = filteredCommands.filter((c) => c.category === category);
                return (
                  <div key={category}>
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-app-text/40">
                      {category}
                    </div>
                    {categoryCommands.map((cmd) => {
                      const globalIndex = filteredCommands.indexOf(cmd);
                      const isSelected = globalIndex === selectedIndex;

                      return (
                        <button
                          key={cmd.id}
                          onClick={() => {
                            cmd.action();
                            onClose();
                          }}
                          className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs transition-colors ${
                            isSelected
                              ? 'bg-app-hover text-app-text font-medium'
                              : 'text-app-text/80 hover:bg-app-hover/50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-app-text/60">{cmd.icon}</span>
                            <span>{cmd.label}</span>
                          </div>
                          {isSelected && (
                            <span className="text-[10px] text-app-text/40 font-mono">enter</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="flex justify-between border-t border-app-border bg-app-sidebar/40 px-4 py-2.5 text-[10px] text-app-text/40 font-semibold">
          <span>↑↓ to navigate</span>
          <span>enter to select</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
}
