import type { Theme } from "@/types/theme";
import { midnightTheme } from "./midnight";
import { cupcakeTheme } from "./cupcake";
import { iceTheme } from "./ice";
import { sunsetTheme } from "./sunset";
import { pineTreeTheme } from "./pine-tree";
import { azureNoirTheme } from "./azure-noir";
import { cyberCityTheme } from "./cyber-city";
import { darkerThanBlackTheme } from "./darker-than-black";

const THEMES: Record<string, Theme> = {
  midnight: midnightTheme,
  "azure-noir": azureNoirTheme,
  "cyber-city": cyberCityTheme,
  "darker-than-black": darkerThanBlackTheme,
  cupcake: cupcakeTheme,
  ice: iceTheme,
  sunset: sunsetTheme,
  "pine-tree": pineTreeTheme,
};

export function getTheme(name: string | null | undefined): Theme {
  const key = (name || "midnight").trim().toLowerCase();
  return THEMES[key] || midnightTheme;
}

export const themeNames = Object.keys(THEMES);
