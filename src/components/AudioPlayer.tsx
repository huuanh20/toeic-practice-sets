import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, AlertCircle, Repeat2 } from 'lucide-react';

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
  testId,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying]     = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const [isMuted, setIsMuted]         = useState(false);
  const [volume, setVolume]           = useState(1);
  const [isBuffering, setIsBuffering] = useState(false);

  // A-B Repeat
  const [pointA, setPointA] = useState<number | null>(null);
  const [pointB, setPointB] = useState<number | null>(null);

  // Resume Banner
  const [showResumeBanner, setShowResumeBanner] = useState(false);
  const initialTimeSet = useRef(false);

  // Progress bar fill (CSS custom prop)
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Sync on audioUrl change
  useEffect(() => {
    initialTimeSet.current = false;
    setCurrentTime(0);
    setIsPlaying(false);
    setPointA(null);
    setPointB(null);
    setShowResumeBanner(initialTime > 5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]);

  // Apply speed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, audioUrl]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = audio.currentTime;
    setCurrentTime(time);
    if (onTimeUpdate) onTimeUpdate(time);
    if (pointA !== null && pointB !== null && time >= pointB) {
      audio.currentTime = pointA;
      setCurrentTime(pointA);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
    if (initialTime > 0 && !initialTimeSet.current && !showResumeBanner) {
      audio.currentTime = initialTime;
      setCurrentTime(initialTime);
      initialTimeSet.current = true;
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (showResumeBanner) setShowResumeBanner(false);
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(console.error);
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
    audio.play().then(() => setIsPlaying(true)).catch(console.error);
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
    const muted = val === 0;
    audio.muted = muted;
    setIsMuted(muted);
  };

  const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
  const adjustSpeed = (delta: number) => {
    const idx = speeds.indexOf(playbackSpeed);
    const cur = idx !== -1 ? idx : speeds.indexOf(1.0);
    const next = Math.max(0, Math.min(speeds.length - 1, cur + delta));
    onSpeedChange(speeds[next]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
      if (isInput || notesOpen) return;
      switch (e.code) {
        case 'Space':       e.preventDefault(); togglePlay();    break;
        case 'ArrowLeft':   e.preventDefault(); seekBy(-5);      break;
        case 'ArrowRight':  e.preventDefault(); seekBy(5);       break;
        case 'KeyJ':        seekBy(-10);  break;
        case 'KeyL':        seekBy(10);   break;
        case 'KeyM':        toggleMute(); break;
        case 'BracketLeft': adjustSpeed(-1); break;
        case 'BracketRight':adjustSpeed(1);  break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, isMuted, volume, playbackSpeed, notesOpen, pointA, pointB, initialTime, showResumeBanner]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSetA = () => {
    if (pointA !== null) { setPointA(null); return; }
    setPointA(currentTime);
    if (pointB !== null && pointB <= currentTime) setPointB(null);
  };

  const handleSetB = () => {
    if (pointB !== null) { setPointB(null); return; }
    if (pointA !== null && currentTime <= pointA) return;
    setPointB(currentTime);
  };

  const isLoopActive = pointA !== null && pointB !== null;

  return (
    <div className="relative flex h-20 w-full items-center border-t border-app-border bg-app-card shadow-app-lg shrink-0 px-4 gap-4">
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="auto"
        crossOrigin="anonymous"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onStalled={() => setIsBuffering(true)}
        onError={() => { setIsBuffering(false); setIsPlaying(false); }}
      />

      {/* ── Resume Banner ── */}
      {showResumeBanner && (
        <div className="absolute top-[-44px] left-0 right-0 z-20 flex h-11 items-center justify-between bg-app-accent px-5 text-xs text-white shadow-app-accent animate-slide-down">
          <div className="flex items-center gap-2 font-medium">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>Test {testId} — bạn đang nghe tại <strong>{formatTime(initialTime)}</strong>. Tiếp tục?</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleResumeClick}
              className="rounded-lg bg-white px-3 py-1 font-bold text-app-accent hover:opacity-90 transition-opacity cursor-pointer"
            >
              Tiếp tục
            </button>
            <button
              onClick={() => setShowResumeBanner(false)}
              className="px-2 py-1 font-semibold text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ── Left: Waveform + Playback Controls ── */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Waveform bars (decorative) */}
        <div className="waveform hidden sm:flex" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`waveform-bar ${!isPlaying ? 'paused' : ''}`} />
          ))}
        </div>

        {/* Seek -10 */}
        <button
          onClick={() => seekBy(-10)}
          title="Rewind 10s (J)"
          className="flex flex-col items-center rounded-xl p-1.5 text-app-text-muted hover:bg-app-hover hover:text-app-text transition-all cursor-pointer group"
        >
          <span className="text-[10px] font-extrabold group-hover:text-app-accent transition-colors">-10s</span>
        </button>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          title="Play / Pause (Space)"
          className={`flex h-12 w-12 items-center justify-center rounded-full gradient-accent text-white transition-all hover:scale-105 active:scale-95 shadow-app-accent ripple-container cursor-pointer ${isBuffering ? 'animate-pulse-light' : ''}`}
        >
          {isBuffering ? (
            <RotateCcw className="h-5 w-5 animate-spin" />
          ) : isPlaying ? (
            <Pause className="h-5 w-5 fill-current" />
          ) : (
            <Play className="h-5 w-5 fill-current ml-0.5" />
          )}
        </button>

        {/* Seek +10 */}
        <button
          onClick={() => seekBy(10)}
          title="Forward 10s (L)"
          className="flex flex-col items-center rounded-xl p-1.5 text-app-text-muted hover:bg-app-hover hover:text-app-text transition-all cursor-pointer group"
        >
          <span className="text-[10px] font-extrabold group-hover:text-app-accent transition-colors">+10s</span>
        </button>
      </div>

      {/* ── Middle: Progress ── */}
      <div className="flex flex-1 items-center gap-3 min-w-0">
        {/* Current time */}
        <span className="w-10 text-right text-xs font-mono font-semibold text-app-text-muted tabular-nums shrink-0">
          {isBuffering
            ? <span className="text-app-warning animate-pulse-light text-[10px]">···</span>
            : formatTime(currentTime)
          }
        </span>

        {/* Progress track with gradient fill overlay */}
        <div className="relative flex-1 h-6 flex items-center">
          {/* Gradient fill bar (visual) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-full rounded-full bg-app-hover overflow-hidden pointer-events-none">
            <div
              className="h-full rounded-full gradient-accent transition-none"
              style={{ width: `${progressPercent}%` }}
            />
            {/* A-B highlight region */}
            {pointA !== null && pointB !== null && duration > 0 && (
              <div
                className="absolute top-0 h-full bg-app-warning/40 rounded-full"
                style={{
                  left: `${(pointA / duration) * 100}%`,
                  width: `${((pointB - pointA) / duration) * 100}%`,
                }}
              />
            )}
          </div>
          {/* Actual range input (transparent, on top for interaction) */}
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSliderChange}
            className="audio-progress w-full relative z-10 opacity-0 h-6 cursor-pointer"
          />
        </div>

        {/* Duration */}
        <span className="w-10 text-left text-xs font-mono font-semibold text-app-text-muted tabular-nums shrink-0">
          {formatTime(duration)}
        </span>
      </div>

      {/* ── Right: A-B Loop, Volume, Speed ── */}
      <div className="flex items-center gap-3 shrink-0">

        {/* A-B Loop */}
        <div className="flex items-center gap-1.5 border-r border-app-border pr-3">
          <button
            onClick={handleSetA}
            title="Set Loop Start (A)"
            className={`rounded-lg px-2.5 py-1 text-xs font-extrabold border transition-all duration-200 cursor-pointer ${
              pointA !== null
                ? 'gradient-accent text-white border-transparent shadow-app-accent'
                : 'bg-app-bg text-app-text/60 border-app-border/50 hover:bg-app-hover'
            }`}
          >
            A{pointA !== null && <span className="ml-1 font-normal opacity-80">({formatTime(pointA)})</span>}
          </button>

          <button
            onClick={handleSetB}
            disabled={pointA === null}
            title="Set Loop End (B)"
            className={`rounded-lg px-2.5 py-1 text-xs font-extrabold border transition-all duration-200 disabled:opacity-35 cursor-pointer ${
              pointB !== null
                ? 'gradient-accent text-white border-transparent shadow-app-accent'
                : 'bg-app-bg text-app-text/60 border-app-border/50 hover:bg-app-hover'
            }`}
          >
            B{pointB !== null && <span className="ml-1 font-normal opacity-80">({formatTime(pointB)})</span>}
          </button>

          {(pointA !== null || pointB !== null) && (
            <button
              onClick={() => { setPointA(null); setPointB(null); }}
              title="Clear Loop"
              className={`rounded-lg p-1.5 transition-all cursor-pointer ${
                isLoopActive
                  ? 'text-app-warning hover:bg-app-warning/10'
                  : 'text-app-text-muted hover:bg-app-hover'
              }`}
            >
              <Repeat2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            title="Mute (M)"
            className="text-app-text-muted hover:text-app-text transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <input
            type="range"
            min={0} max={1} step={0.05}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider w-16 cursor-pointer"
          />
        </div>

        {/* Speed */}
        <div className="flex items-center gap-1 border-l border-app-border pl-3">
          <button
            onClick={() => adjustSpeed(-1)}
            title="Slower ( [ )"
            className="rounded-lg w-6 h-7 flex items-center justify-center text-sm font-bold text-app-text-muted hover:bg-app-hover hover:text-app-text transition-all cursor-pointer"
          >
            ‹
          </button>
          <span className="w-12 text-center text-xs font-extrabold text-app-text-muted tabular-nums">
            {playbackSpeed.toFixed(2)}×
          </span>
          <button
            onClick={() => adjustSpeed(1)}
            title="Faster ( ] )"
            className="rounded-lg w-6 h-7 flex items-center justify-center text-sm font-bold text-app-text-muted hover:bg-app-hover hover:text-app-text transition-all cursor-pointer"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
