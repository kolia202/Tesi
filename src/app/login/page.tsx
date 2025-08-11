"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  FaUser,
  FaInfoCircle,
  FaLock,
  FaLockOpen,
  FaGamepad,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

function InfoPopup({
  open,
  text,
  onClose,
}: {
  open: boolean;
  text: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute z-50 p-2 text-sm rounded shadow-lg"
      style={{
        top: "-2.5rem",
        right: 0,
        background: "var(--surface)",
        color: "var(--foreground)",
        border: "1px solid var(--border)",
        maxWidth: "240px",
      }}
    >
      {text}
    </div>
  );
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clientCode, setClientCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openPopup, setOpenPopup] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/classi");
  };

  return (
    <div className="min-h-screen flex bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <aside
        className="hidden md:flex flex-col justify-between p-10 text-white shrink-0"
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
            <div
              style={{
                fontWeight: 800,
                lineHeight: 1.1,
                fontSize: "calc(var(--fs-base) * 1.8)",
              }}
            >
              <div>Develop</div>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="inline-block rounded"
                  style={{
                    width: 48,
                    height: 4,
                    background: "#fff",
                  }}
                />
                <span>Players</span>
              </div>
            </div>
            <div
              className="mt-2"
              style={{
                fontWeight: 300,
                letterSpacing: ".02em",
                whiteSpace: "nowrap",
                fontSize: "calc(var(--fs-base) * 1.1)",
              }}
            >
              potential knows no limits
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center px-2">
          <h1
            style={{
              fontWeight: 600,
              fontSize: "calc(var(--fs-base) * 2.2)",
              marginBottom: ".5em",
            }}
          >
            Proffilo
          </h1>
          <p style={{ fontWeight: 300, fontSize: "calc(var(--fs-base) * 1.05)" }}>
            Uno strumento frutto di anni di ricerca<br />
            nell’ambito della valutazione delle funzioni<br />
            cognitive nell’apprendimento.
          </p>
        </div>

        <div className="flex flex-col gap-3 items-center w-full mt-10">
          <hr
            className="w-3/4"
            style={{
              borderColor: "rgba(255,255,255,.4)",
              marginBottom: ".75rem",
            }}
          />
          <div className="flex items-center gap-2 whitespace-nowrap">
            <FaGamepad className="w-5 h-5" />
            <span style={{ fontSize: "calc(var(--fs-base) * 1.1)" }}>
              Develop Players
            </span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <FaEnvelope className="w-5 h-5" />
            <span style={{ fontSize: "calc(var(--fs-base) * 1.1)" }}>
              info@develop-players.org
            </span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <FaPhoneAlt className="w-5 h-5" />
            <span style={{ fontSize: "calc(var(--fs-base) * 1.1)" }}>
              +39 345 3307882
            </span>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col justify-center items-center px-4 py-8">
        <div className="max-w-2xl w-full">
          <h2 className="font-bold text-center mb-2">LOGIN</h2>
          <p className="text-center mb-7">
            Hai ricevuto via mail Username e Password.<br />
            Inseriscili nei campi sottostanti per accedere a PROFFILO
          </p>

          <form
            onSubmit={handleLogin}
            className="rounded-3xl py-10 px-8 flex flex-col gap-7 shadow-lg"
            style={{
              background: "var(--surface)",
              border: "2px solid var(--border)",
            }}
            autoComplete="off"
          >
            <div className="relative">
              <label
                htmlFor="username"
                className="block font-bold mb-1 uppercase"
              >
                Nome utente:
              </label>
              <div
                className="flex items-center rounded-md px-2 control tap-target focus-within:ring-2"
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
                <FaUser className="icon mx-1" title="Utente" />
                <div className="relative">
                  <FaInfoCircle
                    className="icon mx-1 cursor-pointer"
                    title="Info"
                    onClick={() =>
                      setOpenPopup(openPopup === "username" ? null : "username")
                    }
                  />
                  <InfoPopup
                    open={openPopup === "username"}
                    text="Inserisci il nome utente ricevuto via mail dall'amministrazione."
                    onClose={() => setOpenPopup(null)}
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block font-bold mb-1 uppercase"
              >
                Password:
              </label>
              <div
                className="flex items-center rounded-md px-2 control tap-target focus-within:ring-2"
                style={{
                  background: "var(--background)",
                  border: "2px solid var(--border)",
                  boxShadow: "0 1px 4px 0 rgba(30,30,30,0.04)",
                }}
              >
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="flex-1 bg-transparent outline-none px-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  style={{ color: "var(--foreground)" }}
                />
                {showPassword ? (
                  <FaLockOpen
                    className="icon mx-1 cursor-pointer"
                    title="Nascondi password"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaLock
                    className="icon mx-1 cursor-pointer"
                    title="Mostra password"
                    onClick={() => setShowPassword(true)}
                  />
                )}
                <div className="relative">
                  <FaInfoCircle
                    className="icon mx-1 cursor-pointer"
                    title="Info"
                    onClick={() =>
                      setOpenPopup(openPopup === "password" ? null : "password")
                    }
                  />
                  <InfoPopup
                    open={openPopup === "password"}
                    text="Inserisci la password ricevuta via mail dall'amministrazione."
                    onClose={() => setOpenPopup(null)}
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="clientCode"
                className="block font-bold mb-1 uppercase"
              >
                Codice committente:
              </label>
              <div
                className="flex items-center rounded-md px-2 control tap-target focus-within:ring-2"
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
                <div className="relative">
                  <FaInfoCircle
                    className="icon mx-1 cursor-pointer"
                    title="Info"
                    onClick={() =>
                      setOpenPopup(openPopup === "client" ? null : "client")
                    }
                  />
                  <InfoPopup
                    open={openPopup === "client"}
                    text="Codice fornito dall'amministrazione."
                    onClose={() => setOpenPopup(null)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-48 mx-auto font-bold rounded-full mt-2 focus:ring-4 focus:outline-none btn tap-target"
              style={{
                background: "var(--button-bg)",
                color: "var(--button-fg)",
                borderColor: "var(--border)",
                minWidth: 130,
              }}
            >
              Log in
            </button>
          </form>

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