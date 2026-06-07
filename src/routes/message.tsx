import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HudFrame, HudPanel } from "@/components/HudFrame";

export const Route = createFileRoute("/message")({
  head: () => ({
    meta: [
      { title: "Incoming Transmission — for Shahed" },
      { name: "description", content: "A personal birthday message." },
    ],
  }),
  component: MessagePage,
});

// EDIT THIS: replace with your real letter to her.
const LETTER = `Dear Shahed,

If J.A.R.V.I.S. could measure how much you mean to me,
the arc reactor would overload.

You're my favorite person in every timeline —
the artist, the dreamer, the Hello Kitty fan and The Catwomen who stole my heart.,


Happy birthday, my love.
Here's to another year of you being the best part of my world.

— Yours, always.`;

function MessagePage() {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(LETTER.slice(0, i));
      if (i >= LETTER.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, []);

  return (
    <HudFrame>
      <section className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
        <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em]">
          <span className="text-primary/70">// INCOMING TRANSMISSION</span>
          <span className="text-primary animate-blink">● LIVE</span>
        </div>

        <HudPanel>
          <header className="border-b border-primary/30 pb-4">
            <div className="grid grid-cols-2 gap-3 font-mono text-[10px] uppercase tracking-widest md:grid-cols-4">
              <Field k="FROM" v="me" />
              <Field k="TO" v="Shahed" />
              <Field k="PRIORITY" v="MAX" />
              <Field k="ENCRYPT" v="HEART-256" />
            </div>
          </header>

          <pre className="mt-6 whitespace-pre-wrap font-cute text-base leading-relaxed text-foreground md:text-lg">
            {shown}
            {shown.length < LETTER.length && <span className="text-primary text-glow">▌</span>}
          </pre>
        </HudPanel>

        <div className="mt-8 flex justify-between">
          <Link
            to="/"
            className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-primary"
          >
            ◀ Boot
          </Link>
          <Link
            to="/countdown"
            className="group inline-flex items-center gap-2 rounded-md border border-primary bg-primary/10 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.25em] text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_var(--primary)]"
          >
            Start Countdown <span className="transition-transform group-hover:translate-x-1">▶</span>
          </Link>
        </div>
      </section>
    </HudFrame>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-[9px] text-muted-foreground">{k}</div>
      <div className="text-primary text-glow">{v}</div>
    </div>
  );
}
