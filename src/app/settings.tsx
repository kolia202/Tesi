"use client";
import { useEffect, useState } from "react";

const getPreference = (key: string, fallback: string): string =>
  typeof window !== "undefined" ? localStorage.getItem(key) || fallback : fallback;

const setPreference = (key: string, value: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export default function Settings() {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("md");
  const [contrast, setContrast] = useState("normal");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTheme(getPreference("theme", "light"));
    setFontSize(getPreference("fontSize", "md"));
    setContrast(getPreference("contrast", "normal"));
  }, []);

  useEffect(() => {
    document.body.className = `
      ${theme === "dark" ? "theme-dark" : ""}
      ${contrast === "high" ? "contrast-high" : ""}
      font-size-${fontSize}
    `;
    setPreference("theme", theme);
    setPreference("fontSize", fontSize);
    setPreference("contrast", contrast);
  }, [theme, fontSize, contrast]);

  return (
    <>
      <button
        className="fixed top-6 right-6 z-50 bg-white rounded-full shadow p-2 border text-2xl"
        onClick={() => setOpen((o) => !o)}
        aria-label="Impostazioni accessibilità"
      >
        ⚙️
      </button>
      {open && (
        <div className="fixed top-20 right-6 bg-white rounded-xl shadow-lg p-5 z-50 w-80 border">
          <h3 className="font-bold mb-2 text-lg">Impostazioni accessibilità</h3>
          <div className="mb-4">
            <label className="font-semibold">Tema:</label>
            <select value={theme} onChange={e => setTheme(e.target.value)}
              className="block mt-1 border rounded p-1 w-full">
              <option value="light">Chiaro</option>
              <option value="dark">Scuro</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="font-semibold">Dimensione testo:</label>
            <select value={fontSize} onChange={e => setFontSize(e.target.value)}
              className="block mt-1 border rounded p-1 w-full">
              <option value="sm">Piccolo</option>
              <option value="md">Normale</option>
              <option value="lg">Grande</option>
              <option value="xl">Molto grande</option>
            </select>
          </div>
          <div>
            <label className="font-semibold">Contrasto:</label>
            <select value={contrast} onChange={e => setContrast(e.target.value)}
              className="block mt-1 border rounded p-1 w-full">
              <option value="normal">Normale</option>
              <option value="high">Alto</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
}