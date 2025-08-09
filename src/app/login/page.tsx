"use client";
import { useState } from "react";
import { FaUser, FaInfoCircle, FaLock, FaGamepad, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clientCode, setClientCode] = useState("");

  return (
    <div className="min-h-screen flex bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* Sidebar sinistra: gradiente fisso, tipografia e dimensioni adattive */}
      <aside
        className="hidden md:flex flex-col justify-between p-10 text-white shrink-0"
        style={{
          background: "linear-gradient(to bottom, #6b21a8, #ec4899)",
          color: "#fff",
          // si allarga se il testo cresce: minimo 360px, preferito 30vw, massimo 560px
          flexBasis: "clamp(360px, 30vw, 560px)",
          // scala la tipografia con le impostazioni del body
          fontSize: "var(--fs-base)",
        }}
      >
        {/* Logo + titolo orizzontali */}
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

        {/* Info Proffilo */}
        <div className="flex flex-col items-center text-center px-2">
          <h1 style={{ fontWeight: 600, fontSize: "calc(var(--fs-base) * 2.2)", marginBottom: ".5em" }}>Proffilo</h1>
          <p style={{ fontWeight: 300, fontSize: "calc(var(--fs-base) * 1.05)" }}>
            Uno strumento frutto di anni di ricerca<br />
            nell’ambito della valutazione delle funzioni<br />
            cognitive nell’apprendimento.
          </p>
        </div>

        {/* Footer/contatti */}
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

      {/* Main area: TUTTO GUIDATO DA VARIABILI */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-8">
        <div className="max-w-2xl w-full">
          <h2 className="font-bold text-center mb-2">LOGIN</h2>
          <p className="text-center mb-7">
            Hai ricevuto via mail Username e Password.<br />
            Inseriscili nei campi sottostanti per accedere a PROFFILO
          </p>

          {/* Card del form -> superfici e bordo con vars, reattive a tema/contrasto */}
          <form
            className="rounded-3xl py-10 px-8 flex flex-col gap-7 shadow-lg"
            style={{ background: "var(--surface)", border: "2px solid var(--border)" }}
            autoComplete="off"
          >
            {/* NOME UTENTE */}
            <div>
              <label htmlFor="username" className="block font-bold mb-1 uppercase">
                Nome utente:
              </label>
              <div
                className="flex items-center rounded-md px-2 py-2 focus-within:ring-2"
                style={{
                  background: "var(--background)",
                  border: "2px solid var(--border)",
                  boxShadow: "0 1px 4px 0 rgba(30,30,30,0.04)",
                }}
              >
                <input
                  id="username"
                  type="text"
                  placeholder="Nome Utente"
                  className="flex-1 bg-transparent outline-none px-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  style={{ color: "var(--foreground)" }}
                />
                <FaUser className="w-6 h-6 icon mx-1" title="Utente" />
                <FaInfoCircle
                  className="w-6 h-6 icon-secondary mx-1"
                  title="Inserisci il nome utente ricevuto via mail"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label htmlFor="password" className="block font-bold mb-1 uppercase">
                Password:
              </label>
              <div
                className="flex items-center rounded-md px-2 py-2 focus-within:ring-2"
                style={{
                  background: "var(--background)",
                  border: "2px solid var(--border)",
                  boxShadow: "0 1px 4px 0 rgba(30,30,30,0.04)",
                }}
              >
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="flex-1 bg-transparent outline-none px-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  style={{ color: "var(--foreground)" }}
                />
                <FaLock className="w-6 h-6 icon mx-1" title="Password" />
                <FaInfoCircle
                  className="w-6 h-6 icon-secondary mx-1"
                  title="Inserisci la password ricevuta via mail"
                />
              </div>
            </div>

            {/* CODICE COMMITTENTE */}
            <div>
              <label htmlFor="clientCode" className="block font-bold mb-1 uppercase">
                Codice committente:
              </label>
              <div
                className="flex items-center rounded-md px-2 py-2 focus-within:ring-2"
                style={{
                  background: "var(--background)",
                  border: "2px solid var(--border)",
                  boxShadow: "0 1px 4px 0 rgba(30,30,30,0.04)",
                }}
              >
                <input
                  id="clientCode"
                  type="text"
                  placeholder="Codice Committente"
                  className="flex-1 bg-transparent outline-none px-2"
                  value={clientCode}
                  onChange={(e) => setClientCode(e.target.value)}
                  autoComplete="off"
                  style={{ color: "var(--foreground)" }}
                />
                <FaInfoCircle
                  className="w-6 h-6 icon-secondary mx-1"
                  title="Codice fornito dall'amministrazione"
                />
              </div>
            </div>

            {/* Pulsante login -> usa var(--button-*) e rispetta tap target */}
            <button
              type="submit"
              className="w-48 mx-auto font-bold rounded-full mt-2 focus:ring-4 focus:outline-none btn tap-target"
              style={{
                background: "var(--button-bg)",
                color: "var(--button-fg)",
                borderColor: "var(--border)",
                minHeight: "var(--tap-target)",
                minWidth: 130,
              }}
            >
              Log in
            </button>
          </form>

          {/* Link password dimenticata -> usa foreground e hover coerenti */}
          <div className="mt-8 text-center">
            <a
              href="#"
              className="underline underline-offset-4"
              style={{ color: "var(--foreground)" }}
            >
              Hai dimenticato la password?
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}