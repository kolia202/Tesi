"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaGamepad, FaEnvelope, FaPhoneAlt,
  FaChartBar, FaUsers, FaInfoCircle,
} from "react-icons/fa";

const MENU_ITEMS = [
  { id: "gestione", label: "GESTIONE", href: "/classi", icon: FaUsers },
  { id: "risultati", label: "RISULTATI", href: "/risultati", icon: FaChartBar },
  { id: "risorse", label: "RISORSE", href: "/risorse", icon: FaInfoCircle },
];

const TIPOLOGIE = [
  "Generico",
];

type SavedRequest = { tipo: string; note: string; ts: number };

export default function RisorsePage() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href: string) => pathname === href;

  const [tipo, setTipo] = useState<string>(() => {
    if (typeof window === "undefined") return "Generico";
    return localStorage.getItem("risorse.tipo") || "Generico";
  });
  const [note, setNote] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("risorse.note") || "";
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("risorse.tipo", tipo);
      localStorage.setItem("risorse.note", note);
    } catch {}
  }, [tipo, note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: SavedRequest = { tipo, note, ts: Date.now() };
    try {
      localStorage.setItem("risorse.lastRequest", JSON.stringify(payload));
    } catch {}
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    setNote("");
  };

  return (
    <div className="min-h-screen flex bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <aside
        className="hidden md:flex sidebar flex-col justify-between p-10 text-white shrink-0"
        style={{
          background: "linear-gradient(to bottom, #6b21a8, #ec4899)",
          color: "#fff",
          flexBasis: "clamp(360px, 30vw, 560px)",
          fontSize: "var(--fs-base)",
        }}
      >
        <div className="flex items-center gap-6 mb-8">
          <img
            src="/logo.png"
            alt="Develop Players Logo"
            className="w-20 h-20 rounded-full object-contain bg-white shadow shrink-0"
          />
          <div className="min-w-0">
            <div style={{ fontWeight: 800, lineHeight: 1.1, fontSize: "calc(var(--fs-base) * 1.8)" }}>
              <div>Develop</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-block rounded" style={{ width: 48, height: 4, background: "#fff" }} />
                <span>Players</span>
              </div>
            </div>
            <div
              className="mt-2"
              style={{ fontWeight: 300, letterSpacing: ".02em", whiteSpace: "nowrap", fontSize: "calc(var(--fs-base) * 1.1)" }}
            >
              potential knows no limits
            </div>
          </div>
        </div>

        <nav aria-label="Sezioni principali" className="mt-2">
          <ul className="flex flex-col gap-6">
            {MENU_ITEMS.map(({ id, label, href, icon: Icon }) => {
              const active = isActive(href);
              return (
                <li key={id} className="flex justify-center">
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "tap-target w-[min(440px,84%)] md:w-[380px] text-center rounded-xl font-extrabold tracking-wide",
                      "transition-all duration-200 shadow-lg",
                      active
                        ? "bg-emerald-600 text-white shadow-[0_10px_18px_rgba(0,0,0,0.25)]"
                        : "text-white/95 bg-white/0 hover:bg-[#a855f7]/35 focus:bg-[#a855f7]/35 hover:shadow-[0_10px_22px_rgba(0,0,0,0.28)]"
                    ].join(" ")}
                    style={{ padding: "var(--tap-pad-y) var(--tap-pad-x)", fontSize: "calc(var(--fs-base) * 1.6)" }}
                  >
                    <span className="inline-flex items-center justify-center gap-3">
                      <Icon className="icon" aria-hidden="true" />
                      <span>{label}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 items-center w-full mt-10">
          <hr className="w-3/4" style={{ borderColor: "rgba(255,255,255,.4)", marginBottom: ".75rem" }} />
          <div className="flex items-center gap-2 whitespace-nowrap">
            <FaGamepad className="w-5 h-5" />
            <span style={{ fontSize: "calc(var(--fs-base) * 1.1)" }}>Develop Players</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <FaEnvelope className="w-5 h-5" />
            <span style={{ fontSize: "calc(var(--fs-base) * 1.1)" }}>info@develop-players.org</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <FaPhoneAlt className="w-5 h-5" />
            <span style={{ fontSize: "calc(var(--fs-base) * 1.1)" }}>+39 345 3307882</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 px-6 md:px-10 py-8">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <div
            className="flex items-center gap-3 w-full sm:w-auto invisible select-none"
            aria-hidden="true"
          >
            <span className="font-semibold whitespace-nowrap">Cerca:</span>
            <div
              className="flex items-center rounded-md px-2 control tap-target w-full sm:w-[340px]"
              style={{ background: "var(--surface)", border: "2px solid var(--border)" }}
            >
              <input className="flex-1 bg-transparent outline-none px-2 py-3" />
            </div>
          </div>

          <div className="flex items-center gap-6 opacity-80" aria-label="Utente connesso">
            <span>ZAP-YNZ</span>
            <button
              className="tap-target rounded-full"
              type="button"
              onClick={() => router.push("/login")}
              style={{
                background: "var(--button-bg)",
                color: "var(--button-fg)",
                border: "2px solid var(--border)",
                minWidth: 130
              }}
            >
              ESCI
            </button>
          </div>
        </div>

        <div className="w-full mb-4">
          <div
            role="tablist"
            aria-label="Sezioni"
            className="flex items-stretch gap-2 justify-start"
          >
            {["Consulenza", "Profili", "Competenze"].map((t, i) => {
              const active = i === 0;
              return (
                <button
                  key={t}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  className="btn tap-target flex items-center justify-center gap-3 w-full md:w-56 font-bold"
                  style={{
                    background: "var(--button-bg)",
                    color: "var(--button-fg)",
                    borderColor: "var(--border)"
                  }}
                >
                  <span>{t}</span>
                </button>
              );
            })}
          </div>
          <hr className="mt-3" style={{ borderColor: "var(--border)" }} />
        </div>

        <h1 className="text-center font-extrabold mb-2" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.2rem)" }}>
          Hai bisogno di una consulenza?
        </h1>

        <p className="text-center opacity-90 mb-6" style={{ fontSize: "clamp(0.95rem,1.5vw,1.05rem)" }}>
          <span>Seleziona la tipologia di richiesta e aggiungi una descrizione.</span>
          <span className="block mt-1">Verrà inviata una mail ai nostri consulenti e sarai presto ricontattato.</span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto mt-8 space-y-6"
          aria-describedby="formHelp"
        >
          <div className="grid gap-2">
            <label htmlFor="tipo" className="font-semibold">Tipologia:</label>
            <div
              className="flex items-center rounded-md px-2 tap-target control"
              style={{ background: "var(--surface)", border: "2px solid var(--border)" }}
            >
              <select
                id="tipo"
                className="flex-1 bg-transparent outline-none py-3 px-2"
                aria-label="Seleziona la tipologia di richiesta"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                style={{ color: "var(--foreground)" }}
              >
                {TIPOLOGIE.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="note" className="font-semibold">Note:</label>
            <textarea
              id="note"
              className="w-full rounded-md p-5 min-h-[220px] tap-target"
              placeholder="Scrivi qui la tua richiesta…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{
                background: "var(--surface)",
                border: "2px solid var(--border)",
                color: "var(--foreground)"
              }}
            />
          </div>

          <div className="pt-2 flex justify-center">
            <button
              type="submit"
              className="btn tap-target flex items-center justify-center gap-3 w-full md:w-56 font-bold"
              style={{
                background: "var(--button-bg)",
                color: "var(--button-fg)",
                borderColor: "var(--border)"
              }}
            >
              <span>Invia richiesta</span>
            </button>
          </div>

          <p id="formHelp" className="sr-only">
            Tutti i campi supportano le impostazioni di accessibilità del sito (tema, contrasto, dimensione carattere).
          </p>
        </form>
      </main>
    </div>
  );
}
