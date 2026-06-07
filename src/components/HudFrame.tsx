import { Link, useRouterState } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { ReactNode } from "react";

const NAV = [
  { to: "/", label: "BOOT" },
  { to: "/message", label: "MESSAGE" },
  { to: "/countdown", label: "REVEAL" },
  { to: "/video", label: "VIDEO" },
] as const;

export function HudFrame({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 hud-grid opacity-40" />
      <div className="pointer-events-none fixed inset-0 hud-scanlines" />
      <div
        className="pointer-events-none fixed inset-x-0 h-px bg-primary/70 shadow-[0_0_12px_var(--primary)] animate-scan"
        style={{ top: 0 }}
      />

      <header className="relative z-20 flex items-center justify-between border-b border-primary/30 bg-background/60 px-4 py-3 backdrop-blur md:px-8">
        <div className="flex items-center gap-3">
          <CatMark className="h-7 w-7" />
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80 md:text-xs">
            J.A.R.V.I.S. // CAT-OS v9.0
          </div>
        </div>
        <nav className="flex items-center gap-1 md:gap-2">
          {NAV.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`group relative px-2 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors md:text-xs ${
                  active ? "text-primary text-glow" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {n.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80 md:block">
          USR: SHAHED <span className="animate-blink">_</span>
        </div>
      </header>

      <main className="relative z-10">{children}</main>

      <footer className="relative z-10 border-t border-primary/20 px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-primary/60 md:px-8">
        <span className="inline-flex items-center gap-2">
          <Heart className="h-3 w-3 fill-primary text-primary" />
          built with love · happy birthday shahed
          <Heart className="h-3 w-3 fill-primary text-primary" />
        </span>
      </footer>
    </div>
  );
}

/** Catwoman silhouette (mask with cat ears). */
export function CatMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <radialGradient id="cg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="oklch(0.55 0.22 300)" />
          <stop offset="100%" stopColor="oklch(0.15 0.04 300)" />
        </radialGradient>
      </defs>
      {/* ears */}
      <polygon points="14,22 22,4 28,24" fill="url(#cg)" />
      <polygon points="50,22 42,4 36,24" fill="url(#cg)" />
      {/* mask face */}
      <path
        d="M14,28 Q14,18 32,18 Q50,18 50,28 L48,42 Q40,52 32,52 Q24,52 16,42 Z"
        fill="url(#cg)"
      />
      {/* eye slits */}
      <ellipse cx="24" cy="34" rx="3" ry="1.6" fill="oklch(0.95 0.15 90)" />
      <ellipse cx="40" cy="34" rx="3" ry="1.6" fill="oklch(0.95 0.15 90)" />
      <circle cx="24" cy="34" r="0.8" fill="#0a0a0a" />
      <circle cx="40" cy="34" r="0.8" fill="#0a0a0a" />
      {/* whiskers */}
      <line x1="18" y1="42" x2="8" y2="40" stroke="oklch(0.7 0.05 300)" strokeWidth="0.6" />
      <line x1="18" y1="44" x2="8" y2="46" stroke="oklch(0.7 0.05 300)" strokeWidth="0.6" />
      <line x1="46" y1="42" x2="56" y2="40" stroke="oklch(0.7 0.05 300)" strokeWidth="0.6" />
      <line x1="46" y1="44" x2="56" y2="46" stroke="oklch(0.7 0.05 300)" strokeWidth="0.6" />
    </svg>
  );
}

/** Reusable HUD panel with corner brackets. */
export function HudPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative panel-hud rounded-lg p-6 md:p-8 ${className}`}>
      <Bracket className="absolute -left-1 -top-1" />
      <Bracket className="absolute -right-1 -top-1 rotate-90" />
      <Bracket className="absolute -right-1 -bottom-1 rotate-180" />
      <Bracket className="absolute -left-1 -bottom-1 -rotate-90" />
      {children}
    </div>
  );
}

function Bracket({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-4 w-4 text-primary ${className}`} aria-hidden>
      <path d="M1 6 V1 H6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
