import type { Theme } from "@/types/theme";
import { midnightTheme } from "./midnight";
import { sakuraTheme } from "./sakura";

const THEMES: Record<string, Theme> = {
  midnight: midnightTheme,
  sakura: sakuraTheme,
};

export function getTheme(name: string | null | undefined): Theme {
  const key = (name || "midnight").trim().toLowerCase();
  return THEMES[key] || midnightTheme;
}

export const themeNames = Object.keys(THEMES);
