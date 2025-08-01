"use client";
import { useState } from "react";

// Per demo: array gruppi statici
const gruppi = [
  { id: 1, nome: "ECS" },
  { id: 2, nome: "JXU" },
];

export default function ElencoGruppiPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col h-full w-[420px] bg-gradient-to-b from-purple-700 to-pink-600 text-white py-8 px-6">
        {/* Logo + motto */}
        <div className="flex flex-row items-center gap-4 mb-8 mt-2">
          <img src="/logo.png" alt="Develop Players Logo" className="w-16 h-16 rounded-full bg-white object-contain p-2" />
          <div>
            <div className="font-extrabold text-2xl leading-7 flex flex-col">
              <span>Develop</span>
              <span className="flex items-center">
                <span className="inline-block align-middle w-12 h-1 bg-white rounded mx-2" aria-hidden="true"></span>
                <span className="font-extrabold">Players</span>
              </span>
            </div>
            <div className="mt-1 text-base font-light tracking-wide whitespace-nowrap">potential knows no limits</div>
          </div>
        </div>

        {/* Menu laterale */}
        <nav className="flex flex-col gap-3 items-start mt-6 mb-auto">
          {/* Gestione */}
          <button className="flex items-center gap-3 px-7 py-3 rounded-lg bg-emerald-500 font-bold text-lg shadow-md uppercase tracking-wide">
            <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18m-9 5h9" /></svg>
            Gestione
          </button>
          {/* Risultati */}
          <button className="flex items-center gap-3 px-7 py-3 rounded-lg font-bold text-lg uppercase tracking-wide">
            <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 6h16M4 12h8m-8 6h16" /></svg>
            Risultati
          </button>
          {/* Risorse */}
          <button className="flex items-center gap-3 px-7 py-3 rounded-lg font-bold text-lg uppercase tracking-wide">
            <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24"><circle cx={12} cy={12} r={10} /><path d="M12 16v-4M12 8h.01" /></svg>
            Risorse
          </button>
        </nav>

        {/* Footer contatti */}
        <div className="w-full mt-8 pb-2">
          <hr className="w-full border-white/40 mb-5" />
          <div className="flex flex-col items-center gap-3 text-base">
            <div className="flex items-center gap-2">
              {/* Discord */}
              <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.369A19.791 19.791 0 0016.885 3.3a.078.078 0 00-.082.037c-.361.619-.764 1.429-1.047 2.068a18.493 18.493 0 00-5.527 0 12.087 12.087 0 00-1.064-2.068.077.077 0 00-.082-.037c-1.432.328-2.773.82-4.032 1.469A.072.072 0 004 4.451C.726 9.364-.266 14.105.082 18.791a.081.081 0 00.031.057c1.702 1.245 3.34 2.009 4.968 2.517a.077.077 0 00.084-.027c.384-.523.729-1.074 1.026-1.651a.076.076 0 00-.041-.105c-.527-.199-1.027-.434-1.512-.706a.078.078 0 01-.008-.132c.102-.077.204-.155.304-.237a.075.075 0 01.077-.012c3.182 1.456 6.617 1.456 9.77 0a.075.075 0 01.078.011c.1.082.202.16.304.237a.078.078 0 01-.008.132 11.001 11.001 0 01-1.511.706.076.076 0 00-.041.106c.3.576.646 1.127 1.026 1.651a.076.076 0 00.084.028c1.644-.508 3.282-1.272 4.97-2.517a.077.077 0 00.03-.057c.403-5.058-.67-9.771-3.785-14.34a.076.076 0 00-.041-.03zM8.02 15.331c-1.034 0-1.885-.947-1.885-2.111 0-1.164.83-2.111 1.885-2.111 1.066 0 1.913.958 1.885 2.111 0 1.164-.83 2.111-1.885 2.111zm7.966 0c-1.034 0-1.885-.947-1.885-2.111 0-1.164.83-2.111 1.885-2.111 1.066 0 1.913.958 1.885 2.111 0 1.164-.83 2.111-1.885 2.111z" /></svg>
              <span className="font-semibold">Develop Players</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Email */}
              <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="3" stroke="white" strokeWidth="2" />
                <path d="M4 6l8 7 8-7" stroke="white" strokeWidth="2" />
              </svg>
              <span>info@develop-players.org</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Telefono */}
              <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 013.09 4.18 2 2 0 015.11 2h3a2 2 0 012 1.72 12.36 12.36 0 00.56 2.73 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.35-1.35a2 2 0 012.11-.45 12.36 12.36 0 002.73.56A2 2 0 0122 16.92z"/>
              </svg>
              <span>+39 345 3307882</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col h-full">
        {/* Top bar */}
        <div className="flex justify-end items-center gap-5 px-8 pt-8">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8" fill="none" stroke="black" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" /><path d="M6 21v-2a4 4 0 014-4h0a4 4 0 014 4v2" /></svg>
            <span className="font-bold text-lg">ZAP-YNZ</span>
          </div>
          <button className="flex items-center gap-2 text-lg font-semibold"><svg className="w-6 h-6" fill="none" stroke="black" strokeWidth={2} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>ESCI</button>
        </div>

        {/* Pulsante scarica tutto */}
        <div className="flex justify-end px-8 mt-7 mb-2">
          <button className="flex items-center gap-2 bg-[#33275C] hover:bg-[#221d43] text-white px-7 py-2 rounded-full font-semibold text-lg transition">
            <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
            Scarica tutto
          </button>
        </div>

        {/* Tabella gruppi */}
        <div className="flex flex-col px-8 w-full">
          {/* Header riga */}
          <div className="flex items-center border-b border-gray-400 pb-3 mb-4 mt-4">
            <span className="w-1/3 font-semibold">Gruppi</span>
            <span className="w-1/3 font-semibold">Utenti</span>
            <div className="w-1/3 flex items-center justify-between">
              <span className="font-semibold">Foglio codici</span>
              <label className="flex items-center gap-2 text-sm font-normal">
                Cerca:
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="ml-2 px-2 py-1 rounded border border-gray-300"
                  style={{ width: 120 }}
                />
              </label>
            </div>
          </div>

          {/* Righe gruppi */}
          <div>
            {gruppi
              .filter(g => g.nome.toLowerCase().includes(search.toLowerCase()))
              .map((g, i) => (
                <div key={g.id} className={`flex items-center mb-3 rounded ${i % 2 === 0 ? 'bg-gray-100' : ''}`}>
                  {/* Nome gruppo */}
                  <div className="w-1/3 font-bold text-lg px-3 py-2">{g.nome}</div>
                  {/* Utenti */}
                  <div className="w-1/3 px-3">
                    <button className="w-full flex items-center justify-center gap-2 bg-[#33275C] text-white rounded-lg h-12 font-semibold hover:bg-[#221d43] transition">
                      <svg className="w-7 h-7" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4h-2a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      <span className="sr-only">Visualizza utenti</span>
                    </button>
                  </div>
                  {/* Foglio codici */}
                  <div className="w-1/3 flex items-center gap-3 px-3">
                    <button className="flex items-center justify-center bg-[#33275C] hover:bg-[#221d43] text-white rounded-full w-10 h-10 transition">
                      <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                    </button>
                    <button className="bg-[#33275C] hover:bg-[#221d43] text-white px-6 h-10 rounded-full font-semibold text-base transition">
                      Download
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}