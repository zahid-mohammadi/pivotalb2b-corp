import { createContext, useContext, useEffect, useState } from "react";
import type { Theme, BrandColor } from "@/lib/theme";
import { defaultTheme, brandColors, getSystemTheme } from "@/lib/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setBrandColor: (color: BrandColor) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return saved ? JSON.parse(saved) : defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));

    // Update theme.json dynamically
    fetch("/api/theme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(theme),
    }).catch(console.error);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme.appearance !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      document.documentElement.classList.toggle("dark", media.matches);
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme.appearance]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (newTheme.appearance === "system") {
      document.documentElement.classList.toggle("dark", getSystemTheme() === "dark");
    } else {
      document.documentElement.classList.toggle("dark", newTheme.appearance === "dark");
    }
  };

  const setBrandColor = (color: BrandColor) => {
    setTheme({ ...theme, primary: brandColors[color] });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, setBrandColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
