"use client";
import { useEffect, useRef, useState } from "react";
import { FaCog } from "react-icons/fa";

const getPref = (k: string, fb: string) =>
  typeof window !== "undefined" ? localStorage.getItem(k) || fb : fb;
const setPref = (k: string, v: string) => {
  if (typeof window !== "undefined") localStorage.setItem(k, v);
};

const DEFAULTS = {
  theme: "light",
  contrast: "off",
  fontSize: "md",
  fontFamily: "standard",
  spacing: "normal",
  tap: "normal",
  autoRead: "off",
  volume: "80",
  audioSpeed: "normal",
  animations: "normal",
  avatarGuide: "request",
  activityDur: "none",
  feedback: "visual,sound",
  navSimple: "off",
};

const GEAR_POS_KEY = "settingsBtnTop";
const GEAR_MARGIN = 8;
const GEAR_FALLBACK_SIZE = 64;
const DRAG_THRESHOLD = 5;

export default function Settings() {
  const [theme, setTheme] = useState(() => getPref("theme", DEFAULTS.theme));
  const [contrast, setContrast] = useState(() => getPref("contrast", DEFAULTS.contrast));
  const [fontSize, setFontSize] = useState(() => getPref("fontSize", DEFAULTS.fontSize));
  const [fontFamily, setFontFamily] = useState(() => getPref("fontFamily", DEFAULTS.fontFamily));
  const [spacing, setSpacing] = useState(() => getPref("spacing", DEFAULTS.spacing));
  const [tap, setTap] = useState(() => getPref("tap", DEFAULTS.tap));

  const [autoRead, setAutoRead] = useState(() => getPref("autoRead", DEFAULTS.autoRead));
  const [volume, setVolume] = useState(() => getPref("volume", DEFAULTS.volume));
  const [audioSpeed, setAudioSpeed] = useState(() => getPref("audioSpeed", DEFAULTS.audioSpeed));
  const [animations, setAnimations] = useState(() => getPref("animations", DEFAULTS.animations));
  const [avatarGuide, setAvatarGuide] = useState(() => getPref("avatarGuide", DEFAULTS.avatarGuide));
  const [activityDur, setActivityDur] = useState(() => getPref("activityDur", DEFAULTS.activityDur));
  const [feedback, setFeedback] = useState(() => getPref("feedback", DEFAULTS.feedback));
  const [navSimple, setNavSimple] = useState(() => getPref("navSimple", DEFAULTS.navSimple));

  const [open, setOpen] = useState(false);

  const baseBodyClassesRef = useRef<string | null>(null);
  useEffect(() => {
    if (typeof document !== "undefined") {
      baseBodyClassesRef.current = document.body.className;
    }
  }, []);

  useEffect(() => {
    const computed =
      `${theme === "dark" ? " theme-dark" : " theme-light"}` +
      ` font-size-${fontSize} font-user-${fontFamily} spacing-${spacing}` +
      `${contrast === "on" ? " contrast-on" : ""}` +
      `${tap === "large" ? " tap-large" : ""}` +
      (animations === "none" ? " anim-none" : animations === "slow" ? " anim-slow" : " anim-normal") +
      `${navSimple === "on" ? " nav-simple" : ""}`;

    if (typeof document !== "undefined") {
      const base = baseBodyClassesRef.current ?? document.body.className;
      document.body.className = `${base} ${computed}`.replace(/\s+/g, " ").trim();
    }

    setPref("theme", theme);
    setPref("contrast", contrast);
    setPref("fontSize", fontSize);
    setPref("fontFamily", fontFamily);
    setPref("spacing", spacing);
    setPref("tap", tap);
    setPref("autoRead", autoRead);
    setPref("volume", volume);
    setPref("audioSpeed", audioSpeed);
    setPref("animations", animations);
    setPref("avatarGuide", avatarGuide);
    setPref("activityDur", activityDur);
    setPref("feedback", feedback);
    setPref("navSimple", navSimple);
  }, [
    theme, contrast, fontSize, fontFamily, spacing, tap,
    autoRead, volume, audioSpeed, animations, avatarGuide,
    activityDur, feedback, navSimple
  ]);

  const mirrorClasses =
    `${theme === "dark" ? " theme-dark" : " theme-light"}` +
    ` font-size-${fontSize} font-user-${fontFamily} spacing-${spacing}` +
    `${contrast === "on" ? " contrast-on" : ""}` +
    `${tap === "large" ? " tap-large" : ""}` +
    (animations === "none" ? " anim-none" : animations === "slow" ? " anim-slow" : " anim-normal");

  const [fgColor, setFgColor] = useState("var(--foreground)");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const c = getComputedStyle(document.body).getPropertyValue("--foreground") || "#181818";
      setFgColor(c.trim());
    }
  }, [theme, contrast, fontFamily, fontSize, spacing]);

  const feedbackSet = new Set(feedback.split(",").filter(Boolean));
  const toggleFeedback = (key: "visual" | "sound" | "tactile") => {
    const s = new Set(feedbackSet);
    if (s.has(key)) s.delete(key); else s.add(key);
    setFeedback(Array.from(s).join(","));
  };

  const handleReset = () => {
    setTheme(DEFAULTS.theme);
    setContrast(DEFAULTS.contrast);
    setFontSize(DEFAULTS.fontSize);
    setFontFamily(DEFAULTS.fontFamily);
    setSpacing(DEFAULTS.spacing);
    setTap(DEFAULTS.tap);
    setAutoRead(DEFAULTS.autoRead);
    setVolume(DEFAULTS.volume);
    setAudioSpeed(DEFAULTS.audioSpeed);
    setAnimations(DEFAULTS.animations);
    setAvatarGuide(DEFAULTS.avatarGuide);
    setActivityDur(DEFAULTS.activityDur);
    setFeedback(DEFAULTS.feedback);
    setNavSimple(DEFAULTS.navSimple);
  };

  const panelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      setTimeout(() => panelRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const gearBtnRef = useRef<HTMLButtonElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [gearTop, setGearTop] = useState<number>(24); 

  useEffect(() => {
    setMounted(true);

    const readSavedTop = () => {
      try {
        const saved = localStorage.getItem(GEAR_POS_KEY);
        if (saved !== null) {
          const n = parseFloat(saved);
          if (!Number.isNaN(n)) return Math.max(GEAR_MARGIN, n);
        }
      } catch {}
      return 24;
    };

    const clampToViewport = (t: number) => {
      const btnH = gearBtnRef.current?.offsetHeight ?? GEAR_FALLBACK_SIZE;
      const maxTop = Math.max(GEAR_MARGIN, window.innerHeight - btnH - GEAR_MARGIN);
      return Math.min(Math.max(t, GEAR_MARGIN), maxTop);
    };

    setGearTop(clampToViewport(readSavedTop()));

    const onResize = () => setGearTop((t) => clampToViewport(t));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const dragRef = useRef<{ startY: number; startTop: number; moved: boolean } | null>(null);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).setPointerCapture?.(e.pointerId);
    dragRef.current = { startY: e.clientY, startTop: gearTop, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current) return;
    const { startY, startTop, moved } = dragRef.current;
    const deltaY = e.clientY - startY;

    if (!moved && Math.abs(deltaY) >= DRAG_THRESHOLD) {
      dragRef.current.moved = true;
    }
    if (!dragRef.current.moved) return;

    const btnH = gearBtnRef.current?.offsetHeight ?? GEAR_FALLBACK_SIZE;
    const maxTop = Math.max(GEAR_MARGIN, window.innerHeight - btnH - GEAR_MARGIN);
    const nextTop = Math.min(Math.max(startTop + deltaY, GEAR_MARGIN), maxTop);
    setGearTop(nextTop);
  };

  const onPointerUp = () => {
    const moved = dragRef.current?.moved;
    dragRef.current = null;

    try { localStorage.setItem(GEAR_POS_KEY, String(gearTop)); } catch {}

    if (!moved) setOpen((o) => !o);
  };

  const onGearKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = e.shiftKey ? 16 : 8;
    const btnH = gearBtnRef.current?.offsetHeight ?? GEAR_FALLBACK_SIZE;
    const maxTop = Math.max(GEAR_MARGIN, (typeof window !== "undefined" ? window.innerHeight : 0) - btnH - GEAR_MARGIN);

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setGearTop((t) => Math.max(GEAR_MARGIN, t - step));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setGearTop((t) => Math.min(maxTop, t + step));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((o) => !o);
    }
  };

  return (
    <>
      <button
        ref={gearBtnRef}
        className="fixed right-6 z-50 rounded-full shadow p-2 border text-2xl flex items-center justify-center tap-target cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          top: mounted ? `${gearTop}px` : undefined,
          background: "var(--surface)",
          color: "var(--icon)",
          borderColor: "var(--border)",
          touchAction: "none",
        }}
        suppressHydrationWarning
        aria-label="Impostazioni accessibilità"
        type="button"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={onGearKeyDown}
      >
        <FaCog className="icon" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-label="Impostazioni accessibilità"
            aria-modal="true"
            tabIndex={-1}
            className={`settings-panel fixed top-20 right-6 p-5 z-50 w-[360px] max-w-[92vw] space-y-4 outline-none ${mirrorClasses}`}
            style={{ background: "var(--surface)", color: fgColor, borderColor: "var(--border)" }}
          >
            <h3
              className="font-bold text-lg sticky top-0 z-10 py-2"
              style={{
                color: fgColor,
                background: "var(--surface)",
                borderBottom: "2px solid var(--border)"
              }}
            >
              Impostazioni accessibilità
            </h3>

            <div>
              <label className="font-semibold block mb-1">Tema:</label>
              <select value={theme} onChange={e => setTheme(e.target.value)} className="border rounded p-1 w-full">
                <option value="light">Chiaro</option>
                <option value="dark">Scuro</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1">Contrasto alto:</label>
              <select value={contrast} onChange={e => setContrast(e.target.value)} className="border rounded p-1 w-full">
                <option value="off">Disattivato</option>
                <option value="on">Attivato</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1">Dimensione testo:</label>
              <select value={fontSize} onChange={e => setFontSize(e.target.value)} className="border rounded p-1 w-full">
                <option value="md">Normale</option>
                <option value="lg">Grande</option>
                <option value="xl">Molto grande</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1">Font:</label>
              <select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="border rounded p-1 w-full">
                <option value="standard">Sans-serif</option>
                <option value="lexend">Lexend</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1">Spaziatura testo:</label>
              <select value={spacing} onChange={e => setSpacing(e.target.value)} className="border rounded p-1 w-full">
                <option value="normal">Normale</option>
                <option value="large">Maggiore</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1">Area tappabile:</label>
              <select value={tap} onChange={e => setTap(e.target.value)} className="border rounded p-1 w-full">
                <option value="normal">Normale</option>
                <option value="large">Estesa</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1">Lettura automatica:</label>
              <select value={autoRead} onChange={e => setAutoRead(e.target.value)} className="border rounded p-1 w-full">
                <option value="off">Off</option>
                <option value="on">On</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1">Volume audio: {volume}%</label>
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={e => setVolume(e.target.value)}
                className="w-full"
                aria-label="Volume audio"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Velocità audio:</label>
              <select value={audioSpeed} onChange={e => setAudioSpeed(e.target.value)} className="border rounded p-1 w-full">
                <option value="slow">Lento</option>
                <option value="normal">Normale</option>
                <option value="fast">Veloce</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1">Animazioni:</label>
              <select value={animations} onChange={e => setAnimations(e.target.value)} className="border rounded p-1 w-full">
                <option value="none">Nessuna</option>
                <option value="slow">Lente</option>
                <option value="normal">Normali</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1">Avatar guida:</label>
              <select value={avatarGuide} onChange={e => setAvatarGuide(e.target.value)} className="border rounded p-1 w-full">
                <option value="always">Sempre</option>
                <option value="request">Su richiesta</option>
                <option value="off">Off</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1">Durata attività:</label>
              <select value={activityDur} onChange={e => setActivityDur(e.target.value)} className="border rounded p-1 w-full">
                <option value="3">3 min</option>
                <option value="5">5 min</option>
                <option value="none">Nessun limite</option>
              </select>
            </div>

            <div>
              <span className="font-semibold block mb-1">Feedback:</span>
              <div className="flex gap-3 items-center">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={feedbackSet.has("visual")} onChange={() => toggleFeedback("visual")} />
                  <span>Visivo</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={feedbackSet.has("sound")} onChange={() => toggleFeedback("sound")} />
                  <span>Sonoro</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={feedbackSet.has("tactile")} onChange={() => toggleFeedback("tactile")} />
                  <span>Tattile</span>
                </label>
              </div>
            </div>

            <div>
              <label className="font-semibold block mb-1">Navigazione semplificata:</label>
              <select value={navSimple} onChange={e => setNavSimple(e.target.value)} className="border rounded p-1 w-full">
                <option value="off">Off</option>
                <option value="on">On</option>
              </select>
            </div>

            <div className="flex pt-2">
              <button
                onClick={handleReset}
                className="btn tap-target"
                style={{
                  background: "var(--button-bg)",
                  color: "var(--button-fg)",
                  borderColor: "var(--border)",
                  minWidth: 130,
                }}
              >
                Ripristina predefiniti
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}