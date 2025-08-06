"use client";
import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";

// Utility
const getPreference = (key: string, fallback: string): string =>
  typeof window !== "undefined" ? localStorage.getItem(key) || fallback : fallback;

const setPreference = (key: string, value: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
    // Aggiorna anche la classe font/spaziatura in tempo reale se necessario
    if (key === "fontFamily") {
      document.body.classList.remove("font-user-standard", "font-user-lexend", "font-user-opendyslexic");
      document.body.classList.add(`font-user-${value}`);
    }
    if (key === "spacing") {
      document.body.classList.remove("spacing-normal", "spacing-large");
      document.body.classList.add(`spacing-${value}`);
    }
  }
};

export default function Settings() {
  // STATE
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("md");
  const [contrast, setContrast] = useState("off");
  const [fontFamily, setFontFamily] = useState("standard");
  const [spacing, setSpacing] = useState("normal");
  const [open, setOpen] = useState(false);

  // Aggiorna classi body e salva preferenze
  useEffect(() => {
    let className =
      `${theme === "dark" ? "theme-dark" : ""} font-size-${fontSize} font-user-${fontFamily} spacing-${spacing}`;
    if (contrast === "on") className += " contrast-on";
    document.body.className = className;
    setPreference("theme", theme);
    setPreference("fontSize", fontSize);
    setPreference("contrast", contrast);
    setPreference("fontFamily", fontFamily);
    setPreference("spacing", spacing);
  }, [theme, fontSize, contrast, fontFamily, spacing]);

  // Aggiorna da localStorage a mount
  useEffect(() => {
    setTheme(getPreference("theme", "light"));
    setFontSize(getPreference("fontSize", "md"));
    setContrast(getPreference("contrast", "off"));
    setFontFamily(getPreference("fontFamily", "standard"));
    setSpacing(getPreference("spacing", "normal"));
  }, []);

  // Calcola colore scritta reattivo
  const [fgColor, setFgColor] = useState("var(--foreground)");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const color = getComputedStyle(document.body).getPropertyValue("--foreground") || "#181818";
      setFgColor(color.trim());
    }
  }, [theme, contrast]);

  return (
    <>
      <button
        className="fixed top-6 right-6 z-50 bg-white rounded-full shadow p-2 border text-2xl flex items-center justify-center"
        onClick={() => setOpen(o => !o)}
        aria-label="Impostazioni accessibilità"
        type="button"
      >
        <FaCog className="w-7 h-7" />
      </button>
      {open && (
        <div
          className="settings-panel fixed top-20 right-6 p-5 z-50 w-80"
          style={{ background: "var(--surface)", color: fgColor }}
        >
          <h3 className="font-bold mb-4 text-lg" style={{ color: fgColor }}>
            Impostazioni accessibilità
          </h3>
          {/* TEMA */}
          <div className="mb-4">
            <label className="font-semibold block mb-1">Tema:</label>
            <select
              value={theme}
              onChange={e => setTheme(e.target.value)}
              className="border rounded p-1 w-full"
              aria-label="Tema"
            >
              <option value="light">Chiaro</option>
              <option value="dark">Scuro</option>
            </select>
          </div>
          {/* CONTRASTO */}
          <div className="mb-4">
            <label className="font-semibold block mb-1">Contrasto:</label>
            <select
              value={contrast}
              onChange={e => setContrast(e.target.value)}
              className="border rounded p-1 w-full"
              aria-label="Contrasto alto"
            >
              <option value="off">Disattivato</option>
              <option value="on">Attivato</option>
            </select>
          </div>
          {/* DIMENSIONE TESTO */}
          <div className="mb-4">
            <label className="font-semibold block mb-1">Dimensione testo:</label>
            <select
              value={fontSize}
              onChange={e => setFontSize(e.target.value)}
              className="border rounded p-1 w-full"
            >
              <option value="md">Normale</option>
              <option value="lg">Grande</option>
              <option value="xl">Molto grande</option>
            </select>
          </div>
          {/* FONT FAMILY */}
          <div className="mb-4">
            <label className="font-semibold block mb-1">Font:</label>
            <select
              value={fontFamily}
              onChange={e => setFontFamily(e.target.value)}
              className="border rounded p-1 w-full"
              aria-label="Font"
            >
              <option value="standard">Sans-serif</option>
              <option value="lexend">Lexend</option>
            </select>
          </div>
          {/* SPACING */}
          <div>
            <label className="font-semibold block mb-1">Spaziatura:</label>
            <select
              value={spacing}
              onChange={e => setSpacing(e.target.value)}
              className="border rounded p-1 w-full"
              aria-label="Spaziatura"
            >
              <option value="normal">Normale</option>
              <option value="large">Maggiore</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
}