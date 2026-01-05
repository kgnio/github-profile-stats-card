export type RankMeta = {
  title: string;
  bg: string;
  fg: string;
  stroke: string;
};

export function streakTitle(current: number): string {
  return streakRankMeta(current).title;
}

export function streakRankMeta(current: number): RankMeta {
  const d = Math.floor(Number(current) || 0);
  if (d <= 0)
    return {
      title: "Young Wanderer (Level 1)",
      bg: "#93C5FD",
      fg: "#0B1220",
      stroke: "rgba(59,130,246,0.35)",
    };
  const pick = (
    title: string,
    bg: string,
    fg = "#0B0F14",
    stroke = "rgba(0,0,0,0.18)"
  ) => ({
    title,
    bg,
    fg,
    stroke,
  });

  if (d >= 1 && d <= 10)
    return pick(
      "Young Wanderer (Level 1)",
      "#93C5FD",
      "#0B1220",
      "rgba(59,130,246,0.35)"
    );
  if (d >= 11 && d <= 20)
    return pick(
      "Forest Traveler (Level 2)",
      "#86EFAC",
      "#052E16",
      "rgba(34,197,94,0.35)"
    );
  if (d >= 21 && d <= 30)
    return pick(
      "Aspiring Adventurer (Level 3)",
      "#FDE68A",
      "#3B2F05",
      "rgba(245,158,11,0.35)"
    );
  if (d >= 31 && d <= 40)
    return pick(
      "Valiant Explorer (Level 4)",
      "#FDBA74",
      "#3B1D09",
      "rgba(249,115,22,0.35)"
    );
  if (d >= 41 && d <= 50)
    return pick(
      "Brave Knight (Level 5)",
      "#FCA5A5",
      "#3B0A0A",
      "rgba(239,68,68,0.35)"
    );
  if (d >= 51 && d <= 100)
    return pick(
      "Seasoned Hero (Level 6)",
      "#C4B5FD",
      "#1F1235",
      "rgba(139,92,246,0.35)"
    );
  if (d >= 101 && d <= 150)
    return pick(
      "Chosen Champion (Level 7)",
      "#67E8F9",
      "#042F2E",
      "rgba(6,182,212,0.35)"
    );
  if (d >= 151 && d <= 200)
    return pick(
      "Master Adventurer (Level 8)",
      "#F9A8D4",
      "#3B0A23",
      "rgba(236,72,153,0.35)"
    );
  if (d >= 201 && d <= 250)
    return pick(
      "Legend Bearer (Level 9)",
      "#A7F3D0",
      "#052E1A",
      "rgba(16,185,129,0.35)"
    );
  if (d >= 251 && d <= 365)
    return pick(
      "Hero of the Realm (Level 10)",
      "#FBCFE8",
      "#3A0A22",
      "rgba(219,39,119,0.30)"
    );
  if (d >= 366 && d <= 730)
    return pick(
      "Eternal Legend (Level 11)",
      "#99F6E4",
      "#042F2E",
      "rgba(13,148,136,0.35)"
    );
  if (d >= 731 && d <= 1095)
    return pick(
      "Timeless Hero (Level 12)",
      "#FCD34D",
      "#3B2F05",
      "rgba(217,119,6,0.35)"
    );
  if (d >= 1096 && d <= 1460)
    return pick(
      "Mythwoven Soul (Level 13)",
      "#A78BFA",
      "#1F1235",
      "rgba(124,58,237,0.35)"
    );
  if (d >= 1461 && d <= 1826)
    return pick(
      "Light of the Ages (Level 14)",
      "#FBBF24",
      "#3B2F05",
      "rgba(245,158,11,0.35)"
    );
  return pick(
    "Spirit of the Realm (Max Level)",
    "#60A5FA",
    "#0B1220",
    "rgba(59,130,246,0.35)"
  );
}
