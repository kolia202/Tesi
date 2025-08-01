"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // <--- AGGIUNGI QUESTA RIGA

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clientCode, setClientCode] = useState("");
  const router = useRouter(); // <--- INIZIALIZZA IL ROUTER

  // Funzione per il submit
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    router.push("/main/classi"); // <--- CAMBIA QUI IL PATH SE NECESSARIO
  }

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* Sidebar sinistra */}
      <aside className="hidden md:flex flex-col h-full w-[420px] bg-gradient-to-b from-purple-700 to-pink-600 text-white py-8 px-6">
        {/* Top: logo + motto */}
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center gap-4 mb-4 mt-2">
            <img
              src="/logo.png"
              alt="Develop Players Logo"
              className="w-16 h-16 rounded-full bg-white object-contain p-2"
              style={{ boxShadow: "0 2px 16px 0 rgb(0 0 0 / 0.08)" }}
            />
            <div>
              <div className="font-extrabold text-2xl leading-7 flex flex-col">
                <span>Develop</span>
                <span className="flex items-center">
                  <span className="inline-block align-middle w-12 h-1 bg-white rounded mx-2" aria-hidden="true"></span>
                  <span className="font-extrabold">Players</span>
                </span>
              </div>
              <div className="mt-1 text-base font-light tracking-wide whitespace-nowrap">
                potential knows no limits
              </div>
            </div>
          </div>
        </div>

        {/* Centro: Proffilo + descrizione verticalmente centrati */}
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold mb-2 text-center w-full">Proffilo</h1>
          <p className="text-base text-center leading-normal font-light max-w-xs">
            Uno strumento frutto di anni di ricerca<br />
            nell’ambito della valutazione delle funzioni<br />
            cognitive nell’apprendimento.
          </p>
        </div>

        {/* Footer: contatti con icone in basso */}
        <div className="w-full mt-4 pb-2">
          <hr className="w-full border-white/40 mb-5" />
          <div className="flex flex-col items-center gap-3 text-base">
            {/* Discord */}
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.369A19.791 19.791 0 0016.885 3.3a.078.078 0 00-.082.037c-.361.619-.764 1.429-1.047 2.068a18.493 18.493 0 00-5.527 0 12.087 12.087 0 00-1.064-2.068.077.077 0 00-.082-.037c-1.432.328-2.773.82-4.032 1.469A.072.072 0 004 4.451C.726 9.364-.266 14.105.082 18.791a.081.081 0 00.031.057c1.702 1.245 3.34 2.009 4.968 2.517a.077.077 0 00.084-.027c.384-.523.729-1.074 1.026-1.651a.076.076 0 00-.041-.105c-.527-.199-1.027-.434-1.512-.706a.078.078 0 01-.008-.132c.102-.077.204-.155.304-.237a.075.075 0 01.077-.012c3.182 1.456 6.617 1.456 9.77 0a.075.075 0 01.078.011c.1.082.202.16.304.237a.078.078 0 01-.008.132 11.001 11.001 0 01-1.511.706.076.076 0 00-.041.106c.3.576.646 1.127 1.026 1.651a.076.076 0 00.084.028c1.644-.508 3.282-1.272 4.97-2.517a.077.077 0 00.03-.057c.403-5.058-.67-9.771-3.785-14.34a.076.076 0 00-.041-.03zM8.02 15.331c-1.034 0-1.885-.947-1.885-2.111 0-1.164.83-2.111 1.885-2.111 1.066 0 1.913.958 1.885 2.111 0 1.164-.83 2.111-1.885 2.111zm7.966 0c-1.034 0-1.885-.947-1.885-2.111 0-1.164.83-2.111 1.885-2.111 1.066 0 1.913.958 1.885 2.111 0 1.164-.83 2.111-1.885 2.111z" />
              </svg>
              <span className="font-semibold">Develop Players</span>
            </div>
            {/* Email */}
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="3" stroke="white" strokeWidth="2" />
                <path d="M4 6l8 7 8-7" stroke="white" strokeWidth="2" />
              </svg>
              <span>info@develop-players.org</span>
            </div>
            {/* Telefono */}
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 013.09 4.18 2 2 0 015.11 2h3a2 2 0 012 1.72 12.36 12.36 0 00.56 2.73 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.35-1.35a2 2 0 012.11-.45 12.36 12.36 0 002.73.56A2 2 0 0122 16.92z"/>
              </svg>
              <span>+39 345 3307882</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main: login form */}
      <main className="flex flex-1 min-w-0 items-center justify-center h-full py-0 px-4">
        <div className="flex flex-col w-full items-center justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-normal text-gray-700 text-center mb-2">LOGIN</h2>
            <p className="text-lg text-gray-800 text-center max-w-lg leading-tight">
              Hai ricevuto via mail Username e Password.<br />
              Inseriscili nei campi sottostanti per accedere a PROFFILO
            </p>
          </div>
          <form
            className="w-full max-w-xl bg-[#a6cde1] rounded-[70px] px-10 py-10 flex flex-col gap-6 shadow-lg"
            tabIndex={-1}
            aria-label="Login Form"
            onSubmit={handleLogin} // <--- ECCO IL CAMBIO!
          >
            {/* NOME UTENTE */}
            <div>
              <label htmlFor="username" className="block mb-1 text-base font-semibold text-[#343a40] uppercase tracking-wide">
                Nome utente:
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full h-12 px-5 rounded-lg text-base bg-white text-gray-900 border-none focus:ring-2 focus:ring-blue-500 outline-none"
                aria-label="Nome utente"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label htmlFor="password" className="block mb-1 text-base font-semibold text-[#343a40] uppercase tracking-wide">
                Password:
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full h-12 px-5 rounded-lg text-base bg-white text-gray-900 border-none focus:ring-2 focus:ring-blue-500 outline-none"
                aria-label="Password"
              />
            </div>

            {/* CODICE COMMITTENTE */}
            <div>
              <label htmlFor="clientCode" className="block mb-1 text-base font-semibold text-[#343a40] uppercase tracking-wide">
                Codice committente:
              </label>
              <input
                id="clientCode"
                type="text"
                value={clientCode}
                onChange={e => setClientCode(e.target.value)}
                className="w-full h-12 px-5 rounded-lg text-base bg-white text-gray-900 border-none focus:ring-2 focus:ring-blue-500 outline-none"
                aria-label="Codice committente"
              />
            </div>

            {/* Pulsante login */}
            <button
              type="submit"
              className="w-48 mx-auto h-12 bg-[#33275C] hover:bg-[#221d43] text-white text-lg font-semibold rounded-full mt-2 focus:ring-4 focus:ring-blue-300 focus:outline-none transition"
              style={{ minHeight: 44, minWidth: 130 }}
              tabIndex={0}
            >
              LOGIN
            </button>
          </form>
          <a
            href="#"
            className="mt-7 text-base text-[#33275C] underline underline-offset-4 hover:text-blue-800 focus:text-blue-800"
            tabIndex={0}
          >
            Hai dimenticato la password?
          </a>
        </div>
      </main>
    </div>
  );
}