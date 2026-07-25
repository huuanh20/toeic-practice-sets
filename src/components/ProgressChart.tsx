import type { Attempt } from '../types/attempt';

interface ProgressChartProps {
  attempts: Attempt[];
}

export function ProgressChart({ attempts }: ProgressChartProps) {
  if (attempts.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-4 border border-dashed border-app-border rounded-xl bg-app-bg/10 min-h-32">
        <span className="text-[10px] font-semibold text-app-text/50">
          📊 Cần ít nhất 2 lần làm bài để hiển thị biểu đồ tiến độ
        </span>
      </div>
    );
  }

  const maxScore = 990;
  const chartWidth = 260;
  const chartHeight = 120;
  const padding = { top: 10, right: 10, bottom: 24, left: 36 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Parse "DD/MM/YYYY HH:MM" format into a comparable timestamp
  const parseTimestamp = (ts: string): number => {
    const match = ts.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})$/);
    if (!match) return 0;
    const [, day, month, year, hours, minutes] = match;
    return new Date(+year, +month - 1, +day, +hours, +minutes).getTime();
  };

  // Sort by timestamp
  const sortedAttempts = [...attempts].sort((a, b) => 
    parseTimestamp(a.timestamp) - parseTimestamp(b.timestamp)
  );

  const xStep = innerWidth / Math.max(sortedAttempts.length - 1, 1);

  const getY = (score: number) => {
    return padding.top + innerHeight - (score / maxScore) * innerHeight;
  };

  // Build path for total scores
  const points = sortedAttempts.map((a, i) => ({
    x: padding.left + i * xStep,
    y: getY(a.estimatedScore),
    score: a.estimatedScore,
    label: `#${i + 1}`
  }));

  const linePath = points.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
  ).join(' ');

  // Y-axis labels
  const yLabels = [0, 250, 500, 750, 990];

  return (
    <div className="rounded-xl border border-app-border bg-app-bg/30 p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-app-text/60 uppercase tracking-wider">
          📈 Biểu đồ tiến độ
        </span>
        <span className="text-[9px] text-app-text/40">
          {sortedAttempts.length} lần làm
        </span>
      </div>

      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-auto"
        style={{ maxHeight: '140px' }}
      >
        {/* Grid lines */}
        {yLabels.map((val) => {
          const y = getY(val);
          return (
            <g key={val}>
              <line
                x1={padding.left}
                y1={y}
                x2={chartWidth - padding.right}
                y2={y}
                stroke="currentColor"
                strokeOpacity={0.08}
                strokeDasharray="2,2"
              />
              <text
                x={padding.left - 4}
                y={y + 3}
                textAnchor="end"
                className="fill-current"
                style={{ fontSize: '7px', opacity: 0.3 }}
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="var(--color-app-accent, #3b82f6)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Gradient area under line */}
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-app-accent, #3b82f6)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-app-accent, #3b82f6)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`${linePath} L ${points[points.length - 1].x.toFixed(1)} ${(padding.top + innerHeight).toFixed(1)} L ${points[0].x.toFixed(1)} ${(padding.top + innerHeight).toFixed(1)} Z`}
          fill="url(#areaGradient)"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r="4"
              fill="var(--color-app-accent, #3b82f6)"
              stroke="var(--color-app-card, #fff)"
              strokeWidth="1.5"
            />
            {/* Score label */}
            <text
              x={p.x}
              y={p.y - 7}
              textAnchor="middle"
              className="fill-current"
              style={{ fontSize: '6.5px', fontWeight: 700, opacity: 0.7 }}
            >
              {p.score}
            </text>
            {/* X-axis label */}
            <text
              x={p.x}
              y={chartHeight - 4}
              textAnchor="middle"
              className="fill-current"
              style={{ fontSize: '6px', opacity: 0.4 }}
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-3 mt-1.5">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-app-accent" />
          <span className="text-[8px] text-app-text/40 font-medium">Total TOEIC Score</span>
        </div>
      </div>
    </div>
  );
}
