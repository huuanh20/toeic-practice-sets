import { useState, useEffect, useRef } from 'react';
import { X, Save, Check } from 'lucide-react';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  testId: number;
  testTitle: string;
  initialNote: string;
  onSaveNote: (testId: number, note: string) => void;
}

export function NotesModal({
  isOpen,
  onClose,
  testId,
  testTitle,
  initialNote,
  onSaveNote
}: NotesModalProps) {
  const [noteText, setNoteText] = useState(initialNote);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const debounceTimer = useRef<any>(null);

  // Sync state when testId or initialNote changes
  useEffect(() => {
    setNoteText(initialNote);
    setSaveStatus('idle');
  }, [testId, initialNote]);

  // Debounced save (1 second)
  useEffect(() => {
    if (noteText === initialNote) return;

    setSaveStatus('saving');
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      onSaveNote(testId, noteText);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [noteText, testId, onSaveNote, initialNote]);

  if (!isOpen) return null;

  const handleManualSave = () => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    onSaveNote(testId, noteText);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl border border-app-border bg-app-card p-6 shadow-2xl animate-scale-in">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-app-border pb-4">
          <h2 className="text-lg font-bold text-app-text">
            📝 Notes: {testTitle}
          </h2>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-app-text-muted hover:bg-app-hover hover:text-app-text transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Type your notes here... (Why is this answer wrong? Vocabulary meanings? Key grammar points?)"
            className="h-96 w-full resize-none rounded-xl border border-app-border bg-app-bg p-4 text-sm leading-relaxed text-app-text placeholder:text-app-text-muted/60 focus:border-app-accent focus:outline-hidden focus:ring-2 focus:ring-app-accent/10 transition-all"
            autoFocus
          />
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-app-text-muted">
            {saveStatus === 'saving' && (
              <span className="flex items-center gap-1 animate-pulse">
                Saving...
              </span>
            )}
            {saveStatus === 'saved' && (
              <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                <Check className="h-3.5 w-3.5" /> Saved to storage
              </span>
            )}
            {saveStatus === 'idle' && (
              <span className="text-app-text-muted/60">
                Auto-saves while typing...
              </span>
            )}
          </div>
          
          <button
            onClick={handleManualSave}
            className="flex items-center gap-2 rounded-xl gradient-accent px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 shadow-lg shadow-app-accent/25 cursor-pointer active:scale-[0.97] transition-all"
          >
            <Save className="h-4 w-4" /> Save Now
          </button>
        </div>
      </div>
    </div>
  );
}
