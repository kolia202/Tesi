"use client";
import { useState } from "react";
import { FaUser, FaInfoCircle, FaLock, FaGamepad, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clientCode, setClientCode] = useState("");

  return (
    <div className="min-h-screen flex bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* Sidebar sinistra */}
      <aside className="hidden md:flex flex-col w-[410px] bg-gradient-to-b from-purple-700 to-pink-500 text-white justify-between p-10">
        {/* Logo + titolo orizzontali */}
        <div className="flex items-center gap-6 mb-8">
          <img
            src="/logo.png"
            alt="Develop Players Logo"
            className="w-20 h-20 rounded-full object-contain bg-white shadow"
          />
          <div>
        <div className="text-3xl font-extrabold leading-tight">
            <div>Develop</div>
            <div className="flex items-center gap-2 mt-1">
            <span className="inline-block w-12 h-1 bg-white rounded"></span>
            <span>Players</span>
            </div>
        </div>
        <div className="text-lg font-light tracking-wide mt-2 whitespace-nowrap">
            potential knows no limits
        </div>
        </div>
        </div>

        {/* Info Proffilo */}
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-semibold mb-3 text-center">Proffilo</h1>
          <p className="text-center text-base font-light">
            Uno strumento frutto di anni di ricerca<br />
            nell’ambito della valutazione delle funzioni<br />
            cognitive nell’apprendimento.
          </p>
        </div>

        {/* Footer/contatti */}
        <div className="flex flex-col gap-3 items-center w-full mt-10">
          <hr className="w-3/4 border-white/40 mb-3" />
          <div className="flex items-center gap-2">
            <FaGamepad className="w-5 h-5" />
            <span>Develop Players</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="w-5 h-5" />
            <span>info@develop-players.org</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="w-5 h-5" />
            <span>+39 345 3307882</span>
          </div>
        </div>
      </aside>

        {/* Main area */}
        <main className="flex-1 flex flex-col justify-center items-center px-4 py-8">
        <div className="max-w-2xl w-full">
            <h2 className="font-bold text-center mb-2">LOGIN</h2>
            <p className="text-center mb-7">
            Hai ricevuto via mail Username e Password.<br />
            Inseriscili nei campi sottostanti per accedere a PROFFILO
            </p>
            <form
            className="bg-[#a6cde1] rounded-3xl py-10 px-8 flex flex-col gap-7 shadow-lg"
            autoComplete="off"
            >
            {/* NOME UTENTE */}
            <div>
                <label htmlFor="username" className="block font-bold mb-1 uppercase">
                Nome utente:
                </label>
                <div className="flex items-center bg-white rounded-md px-2 py-2 focus-within:ring-2 ring-blue-300">
                <input
                    id="username"
                    type="text"
                    placeholder="Nome Utente"
                    className="flex-1 bg-transparent outline-none px-2"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoComplete="username"
                />
                <FaUser className="w-6 h-6 text-gray-700 mx-1" title="Utente" />
                <FaInfoCircle className="w-6 h-6 text-gray-700 mx-1" title="Inserisci il nome utente ricevuto via mail" />
                </div>
            </div>
            {/* PASSWORD */}
            <div>
                <label htmlFor="password" className="block font-bold mb-1 uppercase">
                Password:
                </label>
                <div className="flex items-center bg-white rounded-md px-2 py-2 focus-within:ring-2 ring-blue-300">
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="flex-1 bg-transparent outline-none px-2"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
                <FaLock className="w-6 h-6 text-gray-700 mx-1" title="Password" />
                <FaInfoCircle className="w-6 h-6 text-gray-700 mx-1" title="Inserisci la password ricevuta via mail" />
                </div>
            </div>
            {/* CODICE COMMITTENTE */}
            <div>
                <label htmlFor="clientCode" className="block font-bold mb-1 uppercase">
                Codice committente:
                </label>
                <div className="flex items-center bg-white rounded-md px-2 py-2 focus-within:ring-2 ring-blue-300">
                <input
                    id="clientCode"
                    type="text"
                    placeholder="Codice Committente"
                    className="flex-1 bg-transparent outline-none px-2"
                    value={clientCode}
                    onChange={e => setClientCode(e.target.value)}
                    autoComplete="off"
                />
                <FaInfoCircle className="w-6 h-6 text-gray-700 mx-1" title="Codice fornito dall'amministrazione" />
                </div>
            </div>
            {/* Pulsante login */}
            <button
                type="submit"
                className="w-48 mx-auto h-12 bg-[#33275C] hover:bg-[#221d43] text-white font-bold rounded-full mt-2 focus:ring-4 focus:ring-blue-300 focus:outline-none transition"
                style={{ minHeight: 44, minWidth: 130 }}
            >
                Log in
            </button>
            </form>
            <div className="mt-8 text-center">
            <a
                href="#"
                className="text-[var(--foreground)] underline underline-offset-4 hover:text-blue-800 focus:text-blue-800"
            >
                Hai dimenticato la password?
            </a>
            </div>
        </div>
        </main>
    </div>
  );
}