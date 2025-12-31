import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

import { getTheme } from "../lib/themes";
import type { Theme } from "../types/theme";

type Day = { date: string; count: number };

/* ===================== DATA ===================== */

async function graphql(
  token: string,
  query: string,
  variables: Record<string, any>
) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error(`GraphQL HTTP ${res.status}`);

  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors, null, 2));
  return json.data;
}

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

function compact(n: number) {
  if (!Number.isFinite(n)) return "0";
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}b`;
  if (abs >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  if (abs >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return `${n}`;
}

const fmtISO = (s?: string | null) => s || "-";

function streakFromDailyCounts(daily: Day[]) {
  let total = 0;
  let current = 0;
  let longest = 0;
  let run = 0;

  for (const d of daily) total += d.count;

  for (const d of daily) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }

  for (let i = daily.length - 1; i >= 0 && daily[i].count > 0; i--) current++;

  const lastActive =
    [...daily].reverse().find((d) => d.count > 0)?.date ?? null;

  return { total, current, longest, lastActive };
}

/* ===================== SVG HELPERS ===================== */

function areaPath(values: number[], w: number, h: number, pad: number) {
  const max = Math.max(1, ...values);
  const iw = w - pad * 2;
  const ih = h - pad * 2;
  const denom = Math.max(1, values.length - 1);

  const pts = values.map((v, i) => {
    const x = pad + (iw * i) / denom;
    const y = pad + ih - (ih * v) / max;
    return [x, y] as const;
  });

  const lineD = pts
    .map((p, i) => `${i ? "L" : "M"} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`)
    .join(" ");

  const baseY = pad + ih;
  const areaD =
    `${lineD} L ${pts.at(-1)![0].toFixed(2)} ${baseY.toFixed(2)} ` +
    `L ${pts[0][0].toFixed(2)} ${baseY.toFixed(2)} Z`;

  return { lineD, areaD, max };
}

function iconPath(kind: string) {
  if (kind === "star")
    return "M12 2.2l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.7 6.1 20.2l1.2-6.5-4.8-4.6 6.6-.9L12 2.2z";
  if (kind === "commit")
    return "M9 12a3 3 0 1 0 6 0Zm-7 0h4m8 0h8";
  if (kind === "pr")
    return "M6 4v16m0-13a2 2 0 1 0 0-4Zm0 14a2 2 0 1 0 0-4Zm6-14h6a2 2 0 0 1 2 2v7m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z";
  if (kind === "issue") return "M12 2a10 10 0 1 0 0 20Zm0 6v6m0 4h.01";
  if (kind === "list") return "M4 6h16M4 10h16M4 14h16M4 18h16";
  return "";
}

function renderDivider(x: number, theme: Theme) {
  const L = theme.layout;
  if (L.dividerStyle === "none") return "";

  const dash = L.dividerStyle === "dashed" ? L.dividerDash || "4 6" : "none";

  return `<line x1="${x}" y1="${L.dividerTopY}" x2="${x}" y2="${
    L.cardH - L.dividerBottomY
  }"
    stroke="${theme.colors.divider}"
    stroke-width="${L.strokeDivider}"
    stroke-dasharray="${dash}" />`;
}

function renderAccent(theme: Theme, W: number, H: number, pad: number) {
  const L = theme.layout;
  if (L.accentShapeVariant === "none") return "";

  if (L.accentShapeVariant === "wave") {
    const x0 = W - 340;
    const x1 = W - 190;
    const x2 = W - 90;
    const y0 = pad;
    const y1 = H * 0.55;
    const y2 = H - pad;

    return `<path d="M ${x0} ${y0}
      C ${x1} ${y1}, ${x2} ${y1}, ${W} ${y2}
      L ${W} ${y0} Z"
      fill="url(#accent)" opacity="${L.accentShapeOpacity}" />`;
  }

  if (L.accentShapeVariant === "blob") {
    const x = W - 260;
    const y = pad + 10;
    const w = 260;
    const h = H - pad * 2 - 20;
    return `<path d="
      M ${x + w * 0.15} ${y + h * 0.1}
      C ${x + w * 0.55} ${y - h * 0.05}, ${x + w * 1.05} ${y + h * 0.2}, ${
      x + w * 0.85
    } ${y + h * 0.55}
      C ${x + w * 0.7} ${y + h * 0.9}, ${x + w * 0.25} ${y + h * 1.05}, ${
      x + w * 0.1
    } ${y + h * 0.7}
      C ${x - w * 0.05} ${y + h * 0.4}, ${x + w * 0.0} ${y + h * 0.2}, ${
      x + w * 0.15
    } ${y + h * 0.1}
      Z"
      fill="url(#accent)" opacity="${L.accentShapeOpacity}" />`;
  }

  // diagonal
  return `<path d="M${W - L.accentShapeX1} ${pad}
    L${W - L.accentShapeX2} ${pad}
    L${W - L.accentShapeX3} ${H - pad}
    L${W - L.accentShapeX4} ${H - pad} Z"
    fill="url(#accent)" opacity="${L.accentShapeOpacity}" />`;
}

function renderChart(
  theme: Theme,
  values: number[],
  lineD: string,
  areaD: string
) {
  const L = theme.layout;
  const pad = L.chartPad;
  const w = L.chartW;
  const h = L.chartH;

  if (L.chartVariant === "bars") {
    const max = Math.max(1, ...values);
    const gap = L.chartBarGap ?? 0;
    const bw = (w - pad * 2 - gap * (values.length - 1)) / values.length;

    return values
      .map((v, i) => {
        const bh = ((h - pad * 2) * v) / max;
        const x = pad + i * (bw + gap);
        const y = h - pad - bh;
        return `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}"
          width="${bw.toFixed(2)}" height="${bh.toFixed(2)}"
          rx="${(L.chartBarRadius ?? 0).toFixed(2)}"
          fill="${theme.colors.chartFill}" />`;
      })
      .join("");
  }

  if (L.chartVariant === "dots") {
    const max = Math.max(1, ...values);
    const denom = Math.max(1, values.length - 1);

    return values
      .map((v, i) => {
        const x = pad + ((w - pad * 2) * i) / denom;
        const y = pad + (h - pad * 2) - ((h - pad * 2) * v) / max;
        return `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}"
          r="${(L.chartDotR ?? 2).toFixed(2)}"
          fill="${theme.colors.chartFill}" />`;
      })
      .join("");
  }

  if (L.chartVariant === "spark") {
    const dash = L.chartLineDash ? L.chartLineDash : "none";
    return `<path d="${lineD}"
      stroke="url(#accent)"
      stroke-width="${L.chartStroke}"
      fill="none"
      stroke-dasharray="${dash}" />`;
  }

  // area
  return `
    <path d="${areaD}" fill="url(#chartFill)" />
    <path d="${lineD}" stroke="url(#accent)"
      stroke-width="${L.chartStroke}" fill="none" />
  `;
}

/* ===================== SVG CARD ===================== */

function svgCard(input: {
  theme: Theme;
  total: number;
  current: number;
  longest: number;
  lastActive: string | null;
  series30: number[];
  stars: number;
  commits: number;
  prs: number;
  issues: number;
  contributedTo: number;
}) {
  const {
    theme,
    total,
    current,
    longest,
    lastActive,
    series30,
    stars,
    commits,
    prs,
    issues,
    contributedTo,
  } = input;

  const L = theme.layout;
  const W = L.cardW;
  const H = L.cardH;
  const pad = L.cardPad;

  const { lineD, areaD, max } = areaPath(
    series30,
    L.chartW,
    L.chartH,
    L.chartPad
  );

  const midX = (L.leftDividerX + L.rightDividerX) / 2;
  const midY = L.ringCenterY + L.ringYOffset;

  const ringCirc = 2 * Math.PI * L.ringR;
  const denom = Math.max(1, longest, current);
  const ratio = clamp(current / denom, 0, 1);
  const dash = `${(ratio * ringCirc).toFixed(2)} ${ringCirc.toFixed(2)}`;

  const rows = [
    { icon: "star", label: "Total Stars:", value: compact(stars) },
    { icon: "commit", label: "Total Commits:", value: compact(commits) },
    { icon: "pr", label: "Total PRs:", value: compact(prs) },
    { icon: "issue", label: "Total Issues:", value: compact(issues) },
    { icon: "list", label: "Contributed to:", value: compact(contributedTo) },
  ];

  const gridLines = L.chartGrid
    ? Array.from({ length: L.gridLines + 1 }, (_, i) => {
        const y =
          L.chartPad +
          ((L.chartH - L.chartPad * 2) * i) / Math.max(1, L.gridLines);
        return `<line x1="${L.chartPad}" y1="${y.toFixed(2)}"
          x2="${(L.chartW - L.chartPad).toFixed(2)}" y2="${y.toFixed(2)}"
          stroke="${theme.colors.panelStroke}"
          opacity="${L.gridOpacity}" />`;
      }).join("")
    : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none"
  xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GitHub stats card">

  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop stop-color="${theme.colors.bgStops[0]}"/>
      <stop offset="1" stop-color="${theme.colors.bgStops[1]}"/>
    </linearGradient>

    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      ${theme.colors.accentStops
        .map((c, i) => `<stop offset="${i / 2}" stop-color="${c}"/>`)
        .join("")}
    </linearGradient>

    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
      <stop stop-color="${theme.colors.chartFill}" stop-opacity="${L.chartFillOpacityTop}"/>
      <stop offset="1" stop-color="${theme.colors.chartFill}" stop-opacity="${L.chartFillOpacityBottom}"/>
    </linearGradient>

    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="${L.shadowDx}" dy="${L.shadowDy}"
        stdDeviation="${L.shadowBlur}"
        flood-color="${theme.colors.shadowColor}"
        flood-opacity="${L.shadowOpacity}" />
    </filter>

    <style>
      text { font-family: ${L.fontFamily}; dominant-baseline: alphabetic; }
    </style>
  </defs>

  <rect x="${pad}" y="${pad}" width="${W - pad * 2}" height="${H - pad * 2}"
    rx="${L.radiusCard}" fill="url(#bg)"
    stroke="${theme.colors.cardStroke}"
    stroke-width="${L.strokeCard}"
    filter="url(#shadow)" />

  ${renderAccent(theme, W, H, pad)}
  ${renderDivider(L.leftDividerX, theme)}
  ${renderDivider(L.rightDividerX, theme)}

  <!-- LEFT: CHART + METRICS -->
  <g transform="translate(${L.leftColX},${L.leftTopY})">
    <rect x="0" y="0" width="${L.chartW}" height="${L.chartH}"
      rx="${L.radiusPanel}"
      fill="${theme.colors.panelBg}"
      stroke="${theme.colors.panelStroke}" />

    ${gridLines}

    ${renderChart(theme, series30, lineD, areaD)}

    <text x="${L.chartPad}" y="${(L.chartH - L.chartLabelBottomPad).toFixed(2)}"
      fill="${theme.colors.textDim}"
      font-size="${L.chartLabelFontSize}">
      ${L.chartLabelLeftText}
    </text>

    <text x="${(L.chartW - L.chartPad).toFixed(2)}" y="${L.chartMaxLabelY}"
      text-anchor="end"
      fill="${theme.colors.textDim}"
      font-size="${L.chartLabelFontSize}">
      ${L.chartLabelRightPrefix} ${max}
    </text>

    <g transform="translate(0,${L.metricsY})">
      <text x="0" y="0"
        fill="${theme.colors.textStrong}"
        font-size="${L.totalFontSize}"
        font-weight="${L.totalFontWeight}">
        ${total.toLocaleString("en-US")}
      </text>

      <text x="${L.totalLabelX}" y="0"
        fill="${theme.colors.textMuted}"
        font-size="${L.totalLabelFontSize}"
        font-weight="${L.totalLabelFontWeight}">
        ${L.totalLabelText}
      </text>

      <text x="0" y="${L.lastActiveRowY}"
        fill="${theme.colors.textDim}"
        font-size="${L.lastActiveLabelFontSize}">
        ${L.lastActiveLabelText}
      </text>

      <text x="${L.lastActiveValueX}" y="${L.lastActiveRowY}"
        fill="${theme.colors.textStrong}"
        font-size="${L.lastActiveValueFontSize}"
        font-weight="${L.lastActiveValueFontWeight}">
        ${fmtISO(lastActive)}
      </text>
    </g>
  </g>

  <!-- MIDDLE: RING + STREAK -->
  <g>
    <circle cx="${midX}" cy="${midY}" r="${L.ringR}"
      stroke="${theme.colors.divider}"
      stroke-width="${L.ringStroke}" />

    <circle cx="${midX}" cy="${midY}" r="${L.ringR}"
      stroke="url(#accent)"
      stroke-width="${L.ringStroke}"
      stroke-linecap="round"
      stroke-dasharray="${dash}"
      transform="rotate(-90 ${midX} ${midY})" />

    <text x="${midX}" y="${(midY + L.ringValueDy).toFixed(2)}"
      text-anchor="middle"
      fill="${theme.colors.textStrong}"
      font-size="${L.ringValueFontSize}"
      font-weight="${L.ringValueFontWeight}">
      ${current}
    </text>

    <text x="${midX}" y="${(midY + L.streakTitleDy).toFixed(2)}"
      text-anchor="middle"
      fill="${theme.colors.textMuted}"
      font-size="${L.streakTitleFontSize}"
      font-weight="${L.streakTitleFontWeight}">
      ${current}-day commit streak
    </text>

    <text x="${midX}" y="${(midY + L.streakDescDy).toFixed(2)}"
      text-anchor="middle"
      fill="${theme.colors.textDim}"
      font-size="${L.streakDescFontSize}"
      font-weight="${L.streakDescFontWeight}">
      Coding consistently for ${current} days in a row.
    </text>
  </g>

  <!-- RIGHT: LIST -->
  <g transform="translate(${L.rightDividerX + L.listXPad},${L.listY})">
    ${rows
      .map((r, i) => {
        const y = i * L.listRowH;
        const d = iconPath(r.icon);
        const isStar = r.icon === "star";

        const icon = isStar
          ? `<path d="${d}" fill="${theme.colors.listIcon}" opacity="${L.listIconOpacity}"/>`
          : `<path d="${d}" stroke="${theme.colors.listIcon}"
              stroke-width="${L.listIconStroke}"
              stroke-linecap="round" stroke-linejoin="round"
              opacity="${L.listIconOpacity}" />`;

        return `
        <g transform="translate(0,${y})">
          <g transform="translate(0,${L.listIconDy})">
            <svg x="0" y="0" width="${L.listIconBox}" height="${L.listIconBox}"
              viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              ${icon}
            </svg>
          </g>

          <text x="${L.listLabelX}" y="0"
            fill="${theme.colors.listLabel}"
            font-size="${L.listFontSize}"
            font-weight="${L.listLabelWeight}">
            ${r.label}
          </text>

          <text x="${L.listValueX}" y="0"
            fill="${theme.colors.listValue}"
            font-size="${L.listFontSize}"
            font-weight="${L.listValueWeight}">
            ${r.value}
          </text>
        </g>`;
      })
      .join("")}
  </g>

</svg>`;
}

/* ===================== MAIN ===================== */

async function main() {
  const token = process.env.GH_TOKEN;
  const username = (process.env.CARD_USERNAME || "").trim();
  const themeKey = (process.env.CARD_THEME || "").trim();
  const out = (process.env.CARD_OUTPUT || "card.svg").trim();

  if (!token) throw new Error("Missing GH_TOKEN env var.");
  if (!username) throw new Error("Missing CARD_USERNAME env var.");

  const theme = getTheme(themeKey);

  const q = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalRepositoriesWithContributedCommits
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
          nodes { stargazerCount }
        }
      }
    }
  `;

  const data = await graphql(token, q, { login: username });

  const weeks = data.user.contributionsCollection.contributionCalendar
    .weeks as any[];

  const daily: Day[] = weeks
    .flatMap((w) => w.contributionDays)
    .map((d: any) => ({ date: d.date, count: d.contributionCount }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const { total, current, longest, lastActive } = streakFromDailyCounts(daily);

  const series30Raw = daily.slice(-30).map((d) => d.count);
  const series30 = Array.from({ length: 30 }, (_, i) => series30Raw[i] ?? 0);

  const commits =
    data.user.contributionsCollection.totalCommitContributions || 0;
  const prs =
    data.user.contributionsCollection.totalPullRequestContributions || 0;
  const issues = data.user.contributionsCollection.totalIssueContributions || 0;
  const contributedTo =
    data.user.contributionsCollection.totalRepositoriesWithContributedCommits ||
    0;

  const stars = (data.user.repositories.nodes as any[]).reduce(
    (acc, r) => acc + (r.stargazerCount || 0),
    0
  );

  const svg = svgCard({
    theme,
    total: total || 0,
    current,
    longest,
    lastActive,
    series30,
    stars,
    commits,
    prs,
    issues,
    contributedTo,
  });

  const dir = dirname(out);
  if (dir && dir !== ".") await mkdir(dir, { recursive: true });

  await writeFile(out, svg, "utf8");
  console.log(
    `✅ Wrote ${out} for user=${username} theme=${themeKey || "default"}`
  );
}

main().catch((err) => {
  console.error("❌ generate-card failed:", err);
  process.exit(1);
});
