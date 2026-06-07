/** @jsxRuntime classic */
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React, { useEffect, useRef, useState, type ComponentType } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HudFrame, HudPanel, CatMark } from "@/components/HudFrame";
import { ArcReactor } from "@/components/ArcReactor";
import { playJarvisBoot } from "@/lib/jarvisSound";

declare module "@tanstack/react-router" {
  import type { ComponentType } from "react";

  export function createFileRoute(route: any): any;
  export const Link: ComponentType<any>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "J.A.R.V.I.S. // Boot — Happy Birthday, Shahed" },
      { name: "description", content: "Initializing personal transmission for Shahed." },
    ],
  }),
  component: Index,
});

const BOOT_LINES = [
  "> INITIALIZING J.A.R.V.I.S. CAT-OS v9.0 ...",
  "> CALIBRATING ARC REACTOR ........... [OK]",
  "> SCANNING FACIAL SIGNATURE .......... [MATCH: SHAHED]",
  "> LOADING BIRTHDAY PROTOCOL .......... [OK]",
  "> ENGAGING CATWOMAN STEALTH MODE ..... [ARMED]",
  "> ALL SYSTEMS NOMINAL.",
];
const PASSWORD = "catwoman";
const HINT = "تلميح: بطلة مضادة قويه مابفرق معها اشي بتشبه القطة بتلبس بدلة سوده 🐾";

function Index() {
  const [unlocked, setUnlocked] = useState(false);
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);
  const [started, setStarted] = useState(false);
  const [line, setLine] = useState(0);
  const [done, setDone] = useState(false);
  const playedRef = useRef(false);

  useEffect(() => {
    if (!started) return;
    if (line >= BOOT_LINES.length) { setDone(true); return; }
    const t = setTimeout(() => setLine((l) => l + 1), 650);
    return () => clearTimeout(t);
  }, [line, started]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd.trim().toLowerCase() === PASSWORD) {
      setError(false);
      setUnlocked(true);
    } else {
      setError(true);
      setPwd("");
      setTimeout(() => setError(false), 800);
    }
  };

  const handleStart = () => {
    if (playedRef.current) return;
    playedRef.current = true;
    setStarted(true);
    playJarvisBoot();
  };

  return (
    <HudFrame>
      <section className="relative mx-auto flex min-h-[calc(100vh-104px)] max-w-6xl flex-col items-center justify-center px-4 py-10 md:px-8">
        <FloatingCats />

        {!unlocked ? (
          <div className="relative flex flex-col items-center gap-8 text-center">
            <ArcReactor size={200} />
            <div>
              <p className="font-mono text-[17px] uppercase tracking-[0.3em] text-destructive">
                🔒 مفكره رح تدخلي بسهوله ؟ 
              </p>
              <h1 className="mt-3 font-hud text-3xl font-black text-primary text-glow md:text-5xl">
                ENTER PASSCODE
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
                Biometric scan failed. Voice authentication required for (Shahed).
              </p>
              <p className="mt-2 font-mono text-[19px] uppercase tracking-widest text-accent/80">
                {HINT}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col items-center gap-3">
              <input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                autoFocus
                placeholder="اتحداكي تعرفيني الكلمة السرية اتحداكي "
                className={`w-full rounded-md border bg-background/60 px-4 py-3 text-center font-mono text-sm tracking-[0.4em] text-primary outline-none transition-all placeholder:text-muted-foreground/40 focus:shadow-[0_0_24px_var(--primary)] ${
                  error ? "border-destructive animate-pulse" : "border-primary/40 focus:border-primary"
                }`}
              />
              {error && (
                <p className="font-mono text-[14px] uppercase tracking-[0.3em] text-destructive">
                  ✗ هههههه يلا جربي مرة تانية
                </p>
              )}
              <button
                type="submit"
                className="rounded-md border border-primary bg-primary/10 px-8 py-3 font-mono text-xs uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_var(--primary)]"
              >
                ▶ Authenticate خلينا نشوف اذا بتعرفي تدخلين ولا لا  
              </button>
            </form>
          </div>
        ) : !started ? (
          <div className="relative flex flex-col items-center gap-8 text-center">
            <ArcReactor size={220} />
            <div>
              <p className="font-mono text-[19px] uppercase tracking-[0.3em] text-primary/70">
                ✓ العبببب هيك جبتيها صحح باتمانتي 
              </p>
              <h1 className="mt-3 font-hud text-3xl font-black text-primary text-glow md:text-5xl">
                INITIATE J.A.R.V.I.S.
              </h1>
              <p className="mx-auto mt-3 max-w-x1 text-sm text-muted-foreground">
                 JARVIS will greet you اول اشي خلي السيستم يحكيلك كل عام و انتي بخير لانه ليه لا غصب عنه 
              </p>
            </div>
            <button
              onClick={handleStart}
              className="rounded-md border border-primary bg-primary/10 px-8 py-3 font-mono text-xs uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_var(--primary)]"
            >
              ▶ Boot Sequence
            </button>
          </div>
        ) : (
          <div className="relative flex flex-col items-center gap-8">
            <ArcReactor size={260} />

            <HudPanel className="w-full max-w-2xl">
              <div className="font-mono text-xs text-primary/80 md:text-sm">
                {BOOT_LINES.slice(0, line).map((l, i) => (
                  <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">{l}</div>
                ))}
                {!done && <div className="text-glow">█</div>}
              </div>

              {done && (
                <div className="mt-6 border-t border-primary/30 pt-6 text-center animate-in fade-in duration-700">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70">
                    Good evening
                  </p>
                  <h1 className="mt-2 font-hud text-4xl font-black text-primary text-glow md:text-6xl">
                    HAPPY BIRTHDAY,<br />SHAHED
                  </h1>
                  <p className="mx-auto mt-4 max-w-md text-2xl font-bold leading-loose tracking-wide text-muted-foreground md:text-3xl">
                     إعداد بث شخصي من قبل باتمان الى باتمانته صنع خصيصاً إلك, جهزي حالك - الليلة ليلتك و بارتيييي🎉🎂
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <Link
                      to="/message"
                      className="group inline-flex items-center gap-2 rounded-md border border-primary bg-primary/10 px-5 py-2.5 font-bold text-x1 uppercase tracking-[0.25em] text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_var(--primary)]"
                    >
                        من هون البدايه يا فنانه 
                      <span className="transition-transform group-hover:translate-x-1">▶</span>
                    </Link>
                    <Link
                      to="/countdown"
                      className="inline-flex items-center gap-2 rounded-md border border-primary/30 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-primary"
                    >
                      تسويش سكيب  
                    </Link>
                  </div>
                </div>
              )}
            </HudPanel>
          </div>
        )}
      </section>
    </HudFrame>
  );
}

function FloatingCats() {
  const cats = Array.from({ length: 8 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {cats.map((_, i) => (
        <div
          key={i}
          className="absolute opacity-25"
          style={{
            left: `${(i * 13 + 7) % 95}%`,
            animation: `float-up ${12 + (i % 5) * 3}s linear infinite`,
            animationDelay: `${i * 1.8}s`,
          }}
        >
          <CatMark className="h-6 w-6" />
        </div>
      ))}
    </div>
  );
}
