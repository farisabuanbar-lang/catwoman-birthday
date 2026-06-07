import { createFileRoute, Link } from "@tanstack/react-router";
import { HudFrame, HudPanel } from "@/components/HudFrame";

export const Route = createFileRoute("/video")({
  head: () => ({
    meta: [
      { title: "Video Transmission — Shahed" },
      { name: "description", content: "A special video, just for you." },
    ],
  }),
  component: VideoPage,
});

// EDIT THIS: replace with the YouTube video ID you want to play.
// Example: from https://www.youtube.com/watch?v=dQw4w9WgXcQ → id is "dQw4w9WgXcQ"

function VideoPage() {
  return (
    <HudFrame>
      <section className="mx-auto max-w-4xl px-4 py-10 md:px-8 md:py-14">
        <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em]">
          <span className="text-primary/70">// VIDEO FEED // SECURE</span>
          <span className="text-primary animate-blink">● STREAMING</span>
        </div>

        <HudPanel>
          <header className="mb-6 border-b border-primary/30 pb-4 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70">
              CHANNEL: J.A.R.V.I.S. // PRIVATE BROADCAST
            </p>
            <h1 className="mt-2 font-hud text-2xl font-black text-primary text-glow md:text-4xl">
              FOR SHAHED'S EYES ONLY
            </h1>
          </header>

          <div className="relative aspect-video overflow-hidden rounded-md border border-primary/40 shadow-[0_0_40px_var(--primary)]">

  <iframe
    src="https://drive.google.com/file/d/1UTvKEFT3rP5JhZkUd7wtco1c5UJEG8zu/preview"
    className="absolute inset-0 h-full w-full"
    allow="autoplay"
  ></iframe>

</div>

          <p className="mt-5 text-center font-cute text-base text-muted-foreground md:text-lg">
            Press play. This one is for you. 🤍
          </p>
        </HudPanel>

        <div className="mt-8 flex justify-between">
          <Link
            to="/countdown"
            className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-primary"
          >
            ◀ Cake & Letter
          </Link>
          <Link
            to="/"
            className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-primary"
          >
            Replay from Start ▶
          </Link>
        </div>
      </section>
    </HudFrame>
  );
}
