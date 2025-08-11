"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaGamepad, FaEnvelope, FaPhoneAlt,
  FaSearch, FaUsers, FaPrint, FaChartBar, FaInfoCircle
} from "react-icons/fa";

type Group = { id: string; name: string };
const GROUPS: Group[] = [
  { id: "ECS", name: "ECS" },
  { id: "JXU", name: "JXU" },
];

const MENU_ITEMS = [
  { id: "gestione", label: "GESTIONE", href: "/classi",     icon: FaUsers },
  { id: "risultati", label: "RISULTATI", href: "/risultati", icon: FaChartBar },
  { id: "risorse",  label: "RISORSE",   href: "/risorse",   icon: FaInfoCircle },
];

export default function RisultatiPage() {
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? GROUPS.filter(g => g.name.toLowerCase().includes(q)) : GROUPS;
  }, [query]);

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen flex bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <aside
        className="sidebar hidden md:flex flex-col justify-between p-10 text-white shrink-0"
        style={{
          background: "linear-gradient(to bottom, #6b21a8, #ec4899)",
          color: "#fff",
          flexBasis: "clamp(360px, 30vw, 560px)",
          fontSize: "var(--fs-base)",
        }}
      >
        <div className="flex items-center gap-6 mb-8">
          <img src="/logo.png" alt="Develop Players Logo"
               className="w-20 h-20 rounded-full object-contain bg-white shadow shrink-0" />
          <div className="min-w-0">
            <div style={{ fontWeight: 800, lineHeight: 1.1, fontSize: "calc(var(--fs-base) * 1.8)" }}>
              <div>Develop</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-block rounded" style={{ width: 48, height: 4, background: "#fff" }} />
                <span>Players</span>
              </div>
            </div>
            <div className="mt-2" style={{ fontWeight: 300, letterSpacing: ".02em", whiteSpace: "nowrap", fontSize: "calc(var(--fs-base) * 1.1)" }}>
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
                    style={{
                      padding: "var(--tap-pad-y) var(--tap-pad-x)",
                      fontSize: "calc(var(--fs-base) * 1.6)",
                    }}
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
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label htmlFor="search" className="font-semibold whitespace-nowrap">Cerca:</label>
            <div
              className="flex items-center rounded-md px-2 control tap-target w-full sm:w-[340px] focus-within:ring-2"
              style={{ background: "var(--surface)", border: "2px solid var(--border)" }}
            >
              <input
                id="search"
                type="search"
                placeholder="Cerca gruppo"
                className="flex-1 bg-transparent outline-none px-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ color: "var(--foreground)" }}
              />
              <FaSearch className="icon mx-1" aria-hidden="true" />
            </div>
          </div>

          <div className="flex items-center gap-6 opacity-80" aria-label="Utente connesso">
            <span>ZAP-YNZ</span>
            <button
              className="btn tap-target rounded-full"
              type="button"
              onClick={() => router.push("/login")}
              style={{
                background: "var(--button-bg)",
                color: "var(--button-fg)",
                borderColor: "var(--border)",
                minWidth: 130
              }}
            >
              ESCI
            </button>
          </div>
        </div>

        <div className="border-b-2" style={{ borderColor: "var(--border)" }}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_260px_260px_260px] gap-3 py-3 font-semibold">
            <div>Gruppi</div>
            <div className="md:text-center">Utenti</div>
            <div className="md:text-center">Risultati Profilo</div>
            <div className="md:text-center">Risultati Questionario</div>
          </div>
        </div>

        <ul className="divide-y-2" style={{ borderColor: "var(--border)" }}>
          {filtered.map((g) => (
            <li key={g.id} className="grid grid-cols-1 md:grid-cols-[1fr_260px_260px_260px] gap-3 items-center py-4">
              <div>
                <div
                  className="inline-block rounded-md px-4 py-3"
                  style={{ background: "var(--surface)", border: "2px solid var(--border)" }}
                  aria-label={`Gruppo ${g.name}`}
                >
                  <span className="font-semibold">{g.name}</span>
                </div>
              </div>

              <div className="md:justify-self-center">
                <button
                  className="btn tap-target flex items-center justify-center gap-3 w-full md:w-56 font-bold"
                  type="button"
                  aria-label={`Visualizza utenti del gruppo ${g.name}`}
                  style={{
                    background: "var(--button-bg)",
                    color: "var(--button-fg)",
                    borderColor: "var(--border)"
                  }}
                >
                  <span>Visualizza</span>
                  <FaUsers className="icon" aria-hidden="true" />
                </button>
              </div>

              <div className="md:justify-self-center">
                <div
                  className="tap-target w-full md:w-56 rounded-md flex items-center justify-center"
                  style={{
                    background: "transparent",
                    color: "var(--foreground)",
                    border: "2px solid var(--border)"
                  }}
                  aria-label={`Risultati profilo per ${g.name}`}
                >
                  0 Risultati
                </div>
              </div>

              <div className="md:justify-self-center">
                <div
                  className="tap-target w-full md:w-56 rounded-md flex items-center justify-center"
                  style={{
                    background: "transparent",
                    color: "var(--foreground)",
                    border: "2px solid var(--border)"
                  }}
                  aria-label={`Risultati questionario per ${g.name}`}
                >
                  0 Risultati
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            className="btn tap-target flex items-center justify-between gap-4 px-6 font-bold"
            type="button"
            style={{
              background: "var(--button-bg)",
              color: "var(--button-fg)",
              borderColor: "var(--border)"
            }}
          >
            <span>Stampa risultati Profilo</span>
            <FaPrint className="icon" aria-hidden />
          </button>

          <button
            className="btn tap-target flex items-center justify-between gap-4 px-6 font-bold"
            type="button"
            style={{
              background: "var(--button-bg)",
              color: "var(--button-fg)",
              borderColor: "var(--border)"
            }}
          >
            <span>Stampa risultati Questionario</span>
            <FaPrint className="icon" aria-hidden />
          </button>
        </div>
      </main>
    </div>
  );
}