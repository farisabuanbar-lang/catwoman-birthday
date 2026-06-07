/** Kitty-pink arc reactor. Pure CSS/SVG. */
export function ArcReactor({ size = 280 }: { size?: number }) {
  return (
    <div
      className="relative animate-reactor"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "var(--gradient-reactor)", filter: "blur(8px)" }}
      />
      {/* rotating outer ring */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-rotate-slow">
        <circle cx="100" cy="100" r="92" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="2 6" opacity="0.7" />
        <circle cx="100" cy="100" r="84" fill="none" stroke="var(--hud)" strokeWidth="0.8" strokeDasharray="12 4" opacity="0.6" />
      </svg>
      {/* counter-rotating ring */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-rotate-rev">
        <circle cx="100" cy="100" r="74" fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray="20 8" />
      </svg>
      {/* coils */}
      <svg viewBox="0 0 200 200" className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const x1 = 100 + Math.cos(a) * 50;
          const y1 = 100 + Math.sin(a) * 50;
          const x2 = 100 + Math.cos(a) * 66;
          const y2 = 100 + Math.sin(a) * 66;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--hud)" strokeWidth="3" strokeLinecap="round" opacity="0.9" />;
        })}
        <circle cx="100" cy="100" r="50" fill="none" stroke="var(--primary)" strokeWidth="2" />
        <circle cx="100" cy="100" r="36" fill="var(--background)" stroke="var(--hud)" strokeWidth="1.5" />
        {/* triangle core */}
        <polygon
          points="100,76 122,114 78,114"
          fill="var(--hud)"
          opacity="0.95"
          style={{ filter: "drop-shadow(0 0 12px var(--primary))" }}
        />
        <polygon points="100,86 116,110 84,110" fill="var(--primary)" />
      </svg>
    </div>
  );
}
