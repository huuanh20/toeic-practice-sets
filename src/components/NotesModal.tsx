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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-lg border border-app-border bg-app-card p-6 shadow-2xl transition-all">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-app-border pb-3">
          <h2 className="text-lg font-bold text-app-text">
            Notes: {testTitle}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-app-text/50 hover:bg-app-hover hover:text-app-text"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Type your notes here... (Why is this answer wrong? Vocabulary meanings? Key grammar points?)"
            className="h-96 w-full resize-none rounded-md border border-app-border bg-app-bg p-4 text-sm leading-relaxed text-app-text focus:border-app-accent focus:outline-hidden"
            autoFocus
          />
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-app-text/60">
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
              <span className="text-app-text/40">
                Auto-saves while typing...
              </span>
            )}
          </div>
          
          <button
            onClick={handleManualSave}
            className="flex items-center gap-1.5 rounded-md bg-app-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90 shadow-xs cursor-pointer"
          >
            <Save className="h-4 w-4" /> Save Now
          </button>
        </div>
      </div>
    </div>
  );
}
