import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { HudFrame, HudPanel } from "@/components/HudFrame";

export const Route = createFileRoute("/countdown")({
  head: () => ({
    meta: [
      { title: "Countdown — Shahed" },
      { name: "description", content: "Counting down to your surprise." },
    ],
  }),
  component: CountdownPage,
});

function CountdownPage() {
  const [count, setCount] = useState<number>(4);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (count <= 0) { setDone(true); return; }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, done]);

  return (
    <HudFrame>
      <section className="relative mx-auto flex min-h-[calc(100vh-104px)] max-w-4xl flex-col items-center justify-center px-4 py-12 md:px-8">
        {!done ? (
          <div className="flex flex-col items-center text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70">
              SURPRISE DEPLOYMENT IN T-MINUS
            </p>
            <div
              key={count}
              className="mt-8 font-hud text-[10rem] font-black leading-none text-primary text-glow animate-in zoom-in-50 fade-in duration-500 md:text-[16rem]"
              style={{ textShadow: "0 0 60px var(--primary), 0 0 120px var(--primary)" }}
            >
              {count}
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-primary animate-blink">
              stand by, shahed...
            </p>
          </div>
        ) : (
          <Reveal />
        )}
      </section>
    </HudFrame>
  );
}

function Reveal() {
  return (
    <div className="relative w-full">
      {/* Background gardens spanning the whole viewport */}
      <FlowerField />
      <Confetti />

      <div className="relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <HudPanel className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70">
            ✦ SURPRISE DEPLOYED ✦
          </p>
          <h1 className="mt-3 font-hud text-3xl font-black text-primary text-glow md:text-5xl">
            HAPPY BIRTHDAY,<br />SHAHED 🎀
          </h1>

          <div className="my-8 flex justify-center animate-pop-in">
            <Cake />
          </div>

          <div className="mx-auto max-w-md rounded-md border border-primary/30 bg-background/70 p-5 text-left font-cute text-base leading-relaxed text-foreground md:text-lg">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70">
              // letter to shahed
            </p>
            <p className="mt-3">عزيزتي باتمانتي الفاضله</p>
            <p className="mt-3">
              "كل عام وإنتِ بألف خير يا أحلى وأغلى حد بكل هاد الكون.🤍✨
صح إحنا ما إلنا دهر سوا، بس هالشهرين اللي مرقوا كانوا كفيلين يخلوني متأكد إني بدي أعيش باقي حياتي كلها معك بالحلوه و اللي مش حلوه ولآخر يوم بعمري ان شاءالله إنتِ مش بس دخلتي حياتي، إنتِ غيرتيها للأحسن وسرقتي قلبي وعقلي بطريقة ما كنت أتخيلها.
هاد الموقع الصغير هو جزء بسيط سويتلك ياه لأنك (انا بحبش الهدايا و رح يصير زعل😂) عشان يضل ذكرى لكل لحظة حلوة عشناها ورح نعيشها سوا الله يخليلي اياكِ، ويسعد قلبك و يوفقك بحياتك و دراستك و خطوة بخطوة بإذن الله رح تنجحي و نمشيها مع بعض و مثل ما حكينا شووو ؟؟ (كل اشي بوقته حلو ) صحيحح😂😂 🤍🤍 وتضل ضحكتك منورة دنيتي.. بحبك.
            </p>
            <p className="mt-3">
              Make a wish over the candles. Whatever it is, I'll spend the year
              helping it come true. 🤍
            </p>
            <p className="mt-3 text-right">— Yours, always.</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/message"
              className="rounded-md border border-primary/40 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-primary"
            >
              ◀ Message
            </Link>
            <Link
              to="/video"
              className="group inline-flex items-center gap-2 rounded-md border border-primary bg-primary/10 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.25em] text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_var(--primary)]"
            >
              Play Your Video <span className="transition-transform group-hover:translate-x-1">▶</span>
            </Link>
          </div>
        </HudPanel>

        {/* Bouquet row beneath the panel — static garden of swaying flowers */}
        <div className="relative mx-auto mt-12 grid max-w-3xl grid-cols-6 gap-2 px-2 sm:grid-cols-8 md:grid-cols-12">
          {Array.from({ length: 24 }).map((_, i) => {
            const types = [Lily, Rose, Daisy, Tulip, Peony];
            const F = types[i % types.length];
            return (
              <div
                key={i}
                className="flex flex-col items-center animate-sway"
                style={{ animationDelay: `${(i % 7) * 0.2}s`, animationDuration: `${3 + (i % 4)}s` }}
              >
                <F size={36} />
                <div className="h-10 w-[2px] bg-gradient-to-b from-emerald-700/60 to-emerald-900/60" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Tiered birthday cake with frosting drips, candles, sprinkles, ribbon. */
function Cake() {
  const candles = [70, 90, 110, 130, 150];
  return (
    <svg viewBox="0 0 220 230" className="h-56 w-auto drop-shadow-[0_10px_30px_var(--primary)] md:h-72" aria-hidden>
      <defs>
        <linearGradient id="tier-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.72 0.18 320)" />
          <stop offset="1" stopColor="oklch(0.45 0.18 310)" />
        </linearGradient>
        <linearGradient id="tier-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.78 0.16 340)" />
          <stop offset="1" stopColor="oklch(0.55 0.2 330)" />
        </linearGradient>
        <linearGradient id="tier-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.85 0.14 90)" />
          <stop offset="1" stopColor="oklch(0.7 0.18 70)" />
        </linearGradient>
        <radialGradient id="plate" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="oklch(0.4 0.04 290)" />
          <stop offset="1" stopColor="oklch(0.2 0.04 290)" />
        </radialGradient>
      </defs>

      {/* plate */}
      <ellipse cx="110" cy="218" rx="105" ry="10" fill="url(#plate)" />
      <ellipse cx="110" cy="216" rx="98" ry="6" fill="oklch(0.55 0.06 290)" opacity="0.5" />

      {/* bottom tier */}
      <rect x="20" y="155" width="180" height="60" rx="4" fill="url(#tier-bottom)" />
      {/* frosting drip top edge */}
      <path
        d="M20,160 Q30,178 40,160 Q50,180 60,160 Q70,180 80,160 Q90,180 100,160 Q110,180 120,160 Q130,180 140,160 Q150,180 160,160 Q170,180 180,160 Q190,178 200,160 L200,155 L20,155 Z"
        fill="oklch(0.95 0.06 320)"
      />
      {/* dots ribbon */}
      {Array.from({ length: 9 }).map((_, i) => (
        <circle key={i} cx={28 + i * 20} cy="195" r="3" fill="oklch(0.95 0.1 90)" />
      ))}

      {/* middle tier */}
      <rect x="45" y="105" width="130" height="55" rx="4" fill="url(#tier-mid)" />
      <path
        d="M45,110 Q57,128 69,110 Q81,128 93,110 Q105,128 117,110 Q129,128 141,110 Q153,128 165,110 Q173,124 175,110 L175,105 L45,105 Z"
        fill="oklch(0.95 0.05 340)"
      />
      {/* heart accents */}
      {[70, 110, 150].map((x) => (
        <path
          key={x}
          d={`M${x},140 C${x - 5},133 ${x - 10},138 ${x},145 C${x + 10},138 ${x + 5},133 ${x},140 Z`}
          fill="oklch(0.6 0.22 20)"
        />
      ))}

      {/* top tier */}
      <rect x="75" y="60" width="70" height="50" rx="4" fill="url(#tier-top)" />
      <path
        d="M75,65 Q85,80 95,65 Q105,80 115,65 Q125,80 135,65 Q142,78 145,65 L145,60 L75,60 Z"
        fill="oklch(0.97 0.04 90)"
      />

      {/* candles */}
      {candles.map((x, i) => (
        <g key={x}>
          {/* candle body with stripes */}
          <rect x={x - 3} y="30" width="6" height="32" rx="1" fill="oklch(0.95 0.08 340)" />
          <rect x={x - 3} y="34" width="6" height="3" fill="oklch(0.6 0.22 20)" />
          <rect x={x - 3} y="44" width="6" height="3" fill="oklch(0.6 0.22 20)" />
          <rect x={x - 3} y="54" width="6" height="3" fill="oklch(0.6 0.22 20)" />
          {/* wick */}
          <line x1={x} y1="28" x2={x} y2="32" stroke="#222" strokeWidth="1" />
          {/* flame */}
          <g className="animate-flame" style={{ transformBox: "fill-box", transformOrigin: `${x}px 28px`, animationDelay: `${i * 0.07}s` }}>
            <ellipse cx={x} cy="22" rx="3.5" ry="7" fill="oklch(0.82 0.2 60)" />
            <ellipse cx={x} cy="20" rx="2" ry="4.5" fill="oklch(0.95 0.18 90)" />
            <ellipse cx={x} cy="19" rx="0.8" ry="2.5" fill="#fff" />
          </g>
          {/* glow halo */}
          <circle cx={x} cy="22" r="10" fill="oklch(0.85 0.2 70)" opacity="0.18" />
        </g>
      ))}

      {/* sprinkles on tiers */}
      {[
        [38, 175, 0], [62, 188, 30], [88, 178, -20], [118, 190, 15], [148, 178, 40], [172, 188, -15],
        [60, 130, 20], [100, 138, -10], [140, 130, 25], [160, 142, 0],
        [88, 88, 10], [110, 95, -30], [132, 88, 25],
      ].map(([x, y, r], i) => (
        <rect key={i} x={x as number} y={y as number} width="6" height="2.2" rx="1" transform={`rotate(${r} ${x} ${y})`} fill={i % 3 === 0 ? "oklch(0.95 0.18 90)" : i % 3 === 1 ? "oklch(0.7 0.22 320)" : "oklch(0.8 0.18 200)"} />
      ))}
    </svg>
  );
}

/** Full-viewport floating bouquet — dozens of flowers drifting upward. */
function FlowerField() {
  const flowers = useMemo(() => {
    const arr: Array<{ id: number; left: number; size: number; dur: number; delay: number; type: number }> = [];
    for (let i = 0; i < 48; i++) {
      arr.push({
        id: i,
        left: (i * 37) % 100,
        size: 18 + ((i * 7) % 28),
        dur: 9 + ((i * 3) % 12),
        delay: (i * 0.45) % 14,
        type: i % 5,
      });
    }
    return arr;
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {flowers.map((f) => {
        const types = [Lily, Rose, Daisy, Tulip, Peony];
        const F = types[f.type];
        return (
          <div
            key={f.id}
            className="absolute animate-confetti"
            style={{
              left: `${f.left}%`,
              top: 0,
              animationDuration: `${f.dur}s`,
              animationDelay: `-${f.delay}s`,
              filter: "drop-shadow(0 0 8px oklch(0.7 0.2 320 / 0.4))",
            }}
          >
            <F size={f.size} />
          </div>
        );
      })}
    </div>
  );
}

function Confetti() {
  const bits = useMemo(() => Array.from({ length: 40 }, (_, i) => i), []);
  const colors = ["oklch(0.7 0.22 320)", "oklch(0.85 0.18 90)", "oklch(0.65 0.22 20)", "oklch(0.75 0.18 200)", "oklch(0.95 0.05 320)"];
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {bits.map((i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${(i * 23) % 100}%`,
            top: 0,
            width: 6 + (i % 4),
            height: 10 + (i % 5),
            background: colors[i % colors.length],
            borderRadius: i % 2 ? "2px" : "50%",
            animationDuration: `${6 + (i % 7)}s`,
            animationDelay: `-${(i * 0.3) % 10}s`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Flower SVGs ---------- */

function Lily({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden>
      <g transform="translate(20 20)">
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <ellipse key={r} cx="0" cy="-10" rx="4" ry="12" fill="oklch(0.95 0.05 320)" transform={`rotate(${r})`} stroke="oklch(0.7 0.18 330)" strokeWidth="0.6" />
        ))}
        <circle r="3.5" fill="oklch(0.85 0.18 85)" />
        <circle r="1.5" fill="oklch(0.6 0.22 30)" />
      </g>
    </svg>
  );
}

function Rose({ size = 30 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden>
      <g transform="translate(20 20)">
        <circle r="11" fill="oklch(0.45 0.2 20)" />
        <circle r="8.5" fill="oklch(0.58 0.22 15)" />
        <circle r="6" fill="oklch(0.7 0.2 10)" />
        <circle r="3.5" fill="oklch(0.8 0.17 5)" />
        <path d="M-3,-1 Q0,-4 3,-1 Q0,2 -3,-1 Z" fill="oklch(0.35 0.18 20)" />
      </g>
    </svg>
  );
}

function Daisy({ size = 30 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden>
      <g transform="translate(20 20)">
        {Array.from({ length: 10 }).map((_, i) => (
          <ellipse key={i} cx="0" cy="-10" rx="3" ry="9" fill="oklch(0.97 0.02 100)" transform={`rotate(${i * 36})`} stroke="oklch(0.85 0.05 100)" strokeWidth="0.3" />
        ))}
        <circle r="4" fill="oklch(0.82 0.2 85)" />
        <circle r="2" fill="oklch(0.65 0.22 60)" />
      </g>
    </svg>
  );
}

function Tulip({ size = 30 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 44" width={size} height={size} aria-hidden>
      <path d="M20,4 Q8,12 10,24 Q20,30 30,24 Q32,12 20,4 Z" fill="oklch(0.62 0.22 350)" />
      <path d="M20,4 Q18,16 20,28" stroke="oklch(0.4 0.22 0)" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M14,10 Q18,18 20,28" stroke="oklch(0.45 0.2 0)" strokeWidth="0.6" fill="none" opacity="0.5" />
      <path d="M26,10 Q22,18 20,28" stroke="oklch(0.45 0.2 0)" strokeWidth="0.6" fill="none" opacity="0.5" />
    </svg>
  );
}

function Peony({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden>
      <g transform="translate(20 20)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
          <ellipse key={r} cx="0" cy="-8" rx="6" ry="8" fill="oklch(0.85 0.1 340)" transform={`rotate(${r})`} opacity="0.9" />
        ))}
        {[22, 67, 112, 157, 202, 247, 292, 337].map((r) => (
          <ellipse key={r} cx="0" cy="-5" rx="4" ry="6" fill="oklch(0.78 0.14 340)" transform={`rotate(${r})`} />
        ))}
        <circle r="3" fill="oklch(0.92 0.08 90)" />
      </g>
    </svg>
  );
}
