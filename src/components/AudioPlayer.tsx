import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, AlertCircle } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
  notesOpen: boolean;
  onTimeUpdate?: (time: number) => void;
  initialTime?: number;
  testId: number;
}

export function AudioPlayer({
  audioUrl,
  audioRef,
  playbackSpeed,
  onSpeedChange,
  notesOpen,
  onTimeUpdate,
  initialTime = 0,
  testId
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  // A-B Repeat States
  const [pointA, setPointA] = useState<number | null>(null);
  const [pointB, setPointB] = useState<number | null>(null);

  // Resume Banner State
  const [showResumeBanner, setShowResumeBanner] = useState(false);
  const initialTimeSet = useRef(false);

  // Sync state when audioUrl changes
  useEffect(() => {
    initialTimeSet.current = false;
    setCurrentTime(0);
    setIsPlaying(false);
    setPointA(null);
    setPointB(null);
    
    // Show resume banner if there is progress to resume (more than 5 seconds)
    if (initialTime > 5) {
      setShowResumeBanner(true);
    } else {
      setShowResumeBanner(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]);

  // Apply playback speed when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, audioUrl]);

  // Handle audio timeupdates
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = audio.currentTime;
    setCurrentTime(time);

    // Call callback for saving progress
    if (onTimeUpdate) {
      onTimeUpdate(time);
    }

    // A-B Repeat Check
    if (pointA !== null && pointB !== null) {
      if (time >= pointB) {
        audio.currentTime = pointA;
        setCurrentTime(pointA);
      }
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
    
    // If not showing resume banner, immediately seek to initial time
    if (initialTime > 0 && !initialTimeSet.current && !showResumeBanner) {
      audio.currentTime = initialTime;
      setCurrentTime(initialTime);
      initialTimeSet.current = true;
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Dismiss banner once user interacts
    if (showResumeBanner) setShowResumeBanner(false);

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.error("Error playing audio:", err));
    }
  };

  const seekBy = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (showResumeBanner) setShowResumeBanner(false);
    
    const newTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds));
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (showResumeBanner) setShowResumeBanner(false);

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleResumeClick = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = initialTime;
    setCurrentTime(initialTime);
    initialTimeSet.current = true;
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(err => console.error("Error resuming:", err));
    setShowResumeBanner(false);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const val = parseFloat(e.target.value);
    audio.volume = val;
    setVolume(val);
    if (val === 0) {
      audio.muted = true;
      setIsMuted(true);
    } else {
      audio.muted = false;
      setIsMuted(false);
    }
  };

  const adjustSpeed = (delta: number) => {
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
    const currentIndex = speeds.indexOf(playbackSpeed);
    let newIndex = currentIndex !== -1 ? currentIndex : speeds.indexOf(1.0);
    
    if (delta > 0) {
      newIndex = Math.min(speeds.length - 1, newIndex + 1);
    } else {
      newIndex = Math.max(0, newIndex - 1);
    }
    onSpeedChange(speeds[newIndex]);
  };

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is writing in note modal or input elements
      const target = e.target as HTMLElement;
      const isInput = 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.isContentEditable;

      if (isInput || notesOpen) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seekBy(-5);
          break;
        case 'ArrowRight':
          e.preventDefault();
          seekBy(5);
          break;
        case 'KeyJ':
          seekBy(-10);
          break;
        case 'KeyL':
          seekBy(10);
          break;
        case 'KeyM':
          toggleMute();
          break;
        case 'BracketLeft':
          adjustSpeed(-1);
          break;
        case 'BracketRight':
          adjustSpeed(1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, isMuted, volume, playbackSpeed, notesOpen, pointA, pointB, initialTime, showResumeBanner]);

  // Formatting helper (MM:SS)
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSetA = () => {
    if (pointA !== null) {
      setPointA(null);
    } else {
      setPointA(currentTime);
      if (pointB !== null && pointB <= currentTime) {
        setPointB(null);
      }
    }
  };

  const handleSetB = () => {
    if (pointB !== null) {
      setPointB(null);
    } else {
      if (pointA !== null && currentTime <= pointA) {
        return;
      }
      setPointB(currentTime);
    }
  };

  const handleClearLoop = () => {
    setPointA(null);
    setPointB(null);
  };

  return (
    <div className="relative flex h-20 w-full items-center justify-between border-t border-app-border bg-app-card px-6 shadow-md shrink-0">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Resume Progress Toast */}
      {showResumeBanner && (
        <div className="absolute top-[-36px] left-0 right-0 z-10 flex h-9 items-center justify-between bg-app-accent px-6 text-xs text-white shadow-md animate-fade-in border-t border-app-accent/20">
          <div className="flex items-center gap-1.5 font-medium">
            <AlertCircle className="h-4 w-4 animate-bounce" />
            <span>You were listening to Test {testId} at {formatTime(initialTime)}. Would you like to resume?</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleResumeClick}
              className="rounded bg-white px-2 py-0.5 font-bold text-app-accent hover:opacity-90 transition-opacity cursor-pointer"
            >
              Resume
            </button>
            <button
              onClick={() => setShowResumeBanner(false)}
              className="px-2 py-0.5 font-semibold text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Left: Standard Playback Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => seekBy(-10)}
          title="Rewind 10s (J)"
          className="rounded-full p-2 text-app-text/60 hover:bg-app-hover hover:text-app-text"
        >
          <span className="text-xs font-bold">-10s</span>
        </button>

        <button
          onClick={togglePlay}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-app-text text-app-bg transition-transform hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
          title="Play/Pause (Space)"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 fill-current" />
          ) : (
            <Play className="h-5 w-5 fill-current ml-0.5" />
          )}
        </button>

        <button
          onClick={() => seekBy(10)}
          title="Forward 10s (L)"
          className="rounded-full p-2 text-app-text/60 hover:bg-app-hover hover:text-app-text"
        >
          <span className="text-xs font-bold">+10s</span>
        </button>
      </div>

      {/* Middle: Progress Slider */}
      <div className="flex flex-1 items-center justify-center gap-4 px-8 max-w-2xl">
        <span className="w-10 text-right text-xs font-mono text-app-text/60">
          {formatTime(currentTime)}
        </span>
        
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSliderChange}
          className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-app-hover accent-app-accent border border-app-border/10"
        />

        <span className="w-10 text-left text-xs font-mono text-app-text/60">
          {formatTime(duration)}
        </span>
      </div>

      {/* Right: Loop A-B, Volume, and Speed Controls */}
      <div className="flex items-center gap-5">
        {/* Loop A-B */}
        <div className="flex items-center gap-1.5 border-r border-app-border pr-5">
          <button
            onClick={handleSetA}
            className={`rounded-md px-2 py-1 text-xs font-bold border transition-all ${
              pointA !== null
                ? 'bg-app-accent text-white border-app-accent'
                : 'bg-app-bg text-app-text/80 border-app-border hover:bg-app-hover'
            }`}
            title="Set Loop Point A"
          >
            A {pointA !== null && `(${formatTime(pointA)})`}
          </button>
          
          <button
            onClick={handleSetB}
            disabled={pointA === null}
            className={`rounded-md px-2 py-1 text-xs font-bold border transition-all disabled:opacity-40 ${
              pointB !== null
                ? 'bg-app-accent text-white border-app-accent'
                : 'bg-app-bg text-app-text/80 border-app-border hover:bg-app-hover'
            }`}
            title="Set Loop Point B"
          >
            B {pointB !== null && `(${formatTime(pointB)})`}
          </button>

          {(pointA !== null || pointB !== null) && (
            <button
              onClick={handleClearLoop}
              title="Clear Loop"
              className="rounded p-1 text-app-text/40 hover:bg-app-hover hover:text-app-text"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="text-app-text/60 hover:text-app-text"
          >
            {isMuted ? <VolumeX className="h-4.5 w-4.5" /> : <Volume2 className="h-4.5 w-4.5" />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 cursor-pointer appearance-none rounded-lg bg-app-hover accent-app-accent"
          />
        </div>

        {/* Playback speed buttons */}
        <div className="flex items-center gap-1.5 border-l border-app-border pl-5">
          <button
            onClick={() => adjustSpeed(-1)}
            className="rounded px-1.5 py-1 text-xs font-semibold text-app-text/50 hover:bg-app-hover hover:text-app-text"
            title="Slower ( [ )"
          >
            [
          </button>
          <span className="w-10 text-center text-xs font-bold text-app-text/80">
            {playbackSpeed.toFixed(2)}x
          </span>
          <button
            onClick={() => adjustSpeed(1)}
            className="rounded px-1.5 py-1 text-xs font-semibold text-app-text/50 hover:bg-app-hover hover:text-app-text"
            title="Faster ( ] )"
          >
            ]
          </button>
        </div>
      </div>
    </div>
  );
}
