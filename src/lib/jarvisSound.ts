/** Play a JARVIS-style boot sequence: synth tones + spoken greeting. */
export async function playJarvisBoot(greeting = "Welcome, Shahed. Happy birthday. All systems online.") {
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (Ctx) {
      const ctx = new Ctx();
      if (ctx.state === "suspended") await ctx.resume();
      const now = ctx.currentTime;

      // sweep
      const o1 = ctx.createOscillator();
      const g1 = ctx.createGain();
      o1.type = "sine";
      o1.frequency.setValueAtTime(220, now);
      o1.frequency.exponentialRampToValueAtTime(880, now + 0.8);
      g1.gain.setValueAtTime(0.0001, now);
      g1.gain.exponentialRampToValueAtTime(0.18, now + 0.05);
      g1.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
      o1.connect(g1).connect(ctx.destination);
      o1.start(now);
      o1.stop(now + 1);

      // beeps
      const beeps = [0.4, 0.65, 0.9];
      const freqs = [660, 990, 1320];
      beeps.forEach((t, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "triangle";
        o.frequency.value = freqs[i];
        g.gain.setValueAtTime(0.0001, now + t);
        g.gain.exponentialRampToValueAtTime(0.15, now + t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.15);
        o.connect(g).connect(ctx.destination);
        o.start(now + t);
        o.stop(now + t + 0.2);
      });

      // low hum pad
      const pad = ctx.createOscillator();
      const padG = ctx.createGain();
      pad.type = "sawtooth";
      pad.frequency.value = 110;
      padG.gain.setValueAtTime(0.0001, now);
      padG.gain.exponentialRampToValueAtTime(0.05, now + 0.3);
      padG.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
      pad.connect(padG).connect(ctx.destination);
      pad.start(now);
      pad.stop(now + 2);
    }
  } catch {
    // ignore
  }

  // spoken greeting (JARVIS-ish: British male voice if available)
  try {
    if ("speechSynthesis" in window) {
      const speak = () => {
        const u = new SpeechSynthesisUtterance(greeting);
        const voices = window.speechSynthesis.getVoices();
        const preferred =
          voices.find((v) => /Daniel|Google UK English Male|Microsoft.*George|Microsoft.*Ryan/i.test(v.name)) ||
          voices.find((v) => v.lang?.toLowerCase().startsWith("en-gb")) ||
          voices.find((v) => v.lang?.toLowerCase().startsWith("en"));
        if (preferred) u.voice = preferred;
        u.rate = 0.92;
        u.pitch = 0.7;
        u.volume = 1;
        window.speechSynthesis.cancel();
        setTimeout(() => window.speechSynthesis.speak(u), 1100);
      };
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.onvoiceschanged = null;
          speak();
        };
        // also try directly in case event never fires
        setTimeout(speak, 250);
      } else {
        speak();
      }
    }
  } catch {
    // ignore
  }
}
