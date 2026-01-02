import type { Theme } from "@/types/theme";
import { midnightTheme } from "./midnight";
import { cupcakeTheme } from "./cupcake";
import { iceTheme } from "./ice";
import { sunsetTheme } from "./sunset";

const THEMES: Record<string, Theme> = {
  midnight: midnightTheme,
  cupcake: cupcakeTheme,
  ice: iceTheme,
  sunset: sunsetTheme,
};

export function getTheme(name: string | null | undefined): Theme {
  const key = (name || "midnight").trim().toLowerCase();
  return THEMES[key] || midnightTheme;
}

export const themeNames = Object.keys(THEMES);
