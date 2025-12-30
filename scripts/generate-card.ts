import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

import { getTheme } from "../lib/themes";
import type { Theme } from "../types/theme";

type Day = { date: string; count: number };

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

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function compact(n: number) {
  if (!Number.isFinite(n)) return "0";
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}b`;
  if (abs >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  if (abs >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return `${n}`;
}

function fmtISO(s?: string | null) {
  return s || "-";
}

function streakFromDailyCounts(daily: Day[]) {
  let current = 0;
  let longest = 0;

  let run = 0;
  for (const x of daily) {
    if (x.count > 0) run++;
    else run = 0;
    if (run > longest) longest = run;
  }

  let i = daily.length - 1;
  while (i >= 0 && daily[i].count > 0) {
    current++;
    i--;
  }

  let lastActive: string | null = null;
  for (let j = daily.length - 1; j >= 0; j--) {
    if (daily[j].count > 0) {
      lastActive = daily[j].date;
      break;
    }
  }

  return { current, longest, lastActive };
}

function areaPath(
  values: number[],
  width: number,
  height: number,
  pad: number
) {
  const max = Math.max(1, ...values);
  const w = width - pad * 2;
  const h = height - pad * 2;

  const denom = Math.max(1, values.length - 1);

  const pts = values.map((v, idx) => {
    const x = pad + (w * idx) / denom;
    const y = pad + h - (h * v) / max;
    return [x, y] as const;
  });

  const lineD = pts
    .map(
      (p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`
    )
    .join(" ");

  const baselineY = pad + h;
  const areaD =
    `${lineD} ` +
    `L ${pts[pts.length - 1][0].toFixed(2)} ${baselineY.toFixed(2)} ` +
    `L ${pts[0][0].toFixed(2)} ${baselineY.toFixed(2)} Z`;

  return { lineD, areaD, max };
}

function iconPath(kind: string) {
  if (kind === "star")
    return "M12 2.2l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.7 6.1 20.2l1.2-6.5-4.8-4.6 6.6-.9L12 2.2z";
  if (kind === "commit")
    return "M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0Zm-7 0h4m8 0h8";
  if (kind === "pr")
    return "M6 4v16m0-13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6-14h6a2 2 0 0 1 2 2v7m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z";
  if (kind === "issue")
    return "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 6v6m0 4h.01";
  return "M4 6h16M4 10h16M4 14h16M4 18h16";
}

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

  const W = 1080;
  const H = 260;
  const pad = 14;

  const leftDivider = 430;
  const rightDivider = 750;

  const leftColX = 48;
  const leftTopY = theme.layout.leftTopY;

  const chartW = 340;
  const chartH = 96;

  const {
    lineD,
    areaD,
    max: max30,
  } = areaPath(series30, chartW, chartH, theme.layout.chartPad);

  const gridYs = Array.from({ length: theme.layout.gridLines + 1 }, (_, i) => {
    const y =
      theme.layout.chartPad +
      ((chartH - theme.layout.chartPad * 2) * i) / theme.layout.gridLines;
    return y;
  });

  const ringR = theme.layout.ringR;
  const ringStroke = theme.layout.ringStroke;
  const ringCirc = 2 * Math.PI * ringR;
  const denom = Math.max(1, longest, current);
  const ratio = clamp(current / denom, 0, 1);
  const dash = `${(ratio * ringCirc).toFixed(2)} ${ringCirc.toFixed(2)}`;

  const midCenterX = (leftDivider + rightDivider) / 2;
  const midCenterY = 118 + theme.layout.ringYOffset;

  const streakTitle = `${current}-day commit streak`;
  const streakDesc = `Coding consistently for ${current} days in a row.`;

  const lastActiveText = fmtISO(lastActive);

  const listX = rightDivider + theme.layout.listXPad;
  const listY = theme.layout.listY;
  const rowH = theme.layout.listRowH;

  const rows = [
    { icon: "star", label: "Total Stars:", value: compact(stars) },
    { icon: "commit", label: "Total Commits:", value: compact(commits) },
    { icon: "pr", label: "Total PRs:", value: compact(prs) },
    { icon: "issue", label: "Total Issues:", value: compact(issues) },
    { icon: "list", label: "Contributed to:", value: compact(contributedTo) },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none"
     xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GitHub stats card">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop stop-color="${theme.colors.bgStops[0]}"/>
      <stop offset="1" stop-color="${theme.colors.bgStops[1]}"/>
    </linearGradient>

    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="${theme.colors.accentStops[0]}"/>
      <stop offset="0.55" stop-color="${theme.colors.accentStops[1]}"/>
      <stop offset="1" stop-color="${theme.colors.accentStops[2]}"/>
    </linearGradient>

    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
      <stop stop-color="${theme.colors.chartFill}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${theme.colors.chartFill}" stop-opacity="0"/>
    </linearGradient>

    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.22"/>
    </filter>
  </defs>

  <rect x="${pad}" y="${pad}" width="${W - pad * 2}" height="${H - pad * 2}"
        rx="${theme.layout.radiusCard}" fill="url(#bg)" stroke="${
    theme.colors.cardStroke
  }"
        stroke-width="${theme.layout.strokeCard}" filter="url(#softShadow)"/>

  <path d="M${W - 360} ${pad} L${W - 140} ${pad} L${W - 40} ${H - pad} L${
    W - 260
  } ${H - pad} Z"
        fill="url(#accent)" opacity="0.07"/>

  <line x1="${leftDivider}" y1="52" x2="${leftDivider}" y2="${H - 52}"
        stroke="${theme.colors.divider}" stroke-width="${
    theme.layout.strokeDivider
  }"/>
  <line x1="${rightDivider}" y1="52" x2="${rightDivider}" y2="${H - 52}"
        stroke="${theme.colors.divider}" stroke-width="${
    theme.layout.strokeDivider
  }"/>

  <g transform="translate(${leftColX},${leftTopY})">
    <g>
      <rect x="0" y="0" width="${chartW}" height="${chartH}" rx="${
    theme.layout.radiusPanel
  }"
            fill="${theme.colors.panelBg}" stroke="${
    theme.colors.panelStroke
  }"/>
      ${gridYs
        .map(
          (y) =>
            `<line x1="${theme.layout.chartPad}" y1="${y.toFixed(2)}" x2="${(
              chartW - theme.layout.chartPad
            ).toFixed(2)}" y2="${y.toFixed(2)}" stroke="${
              theme.colors.panelStroke
            }" opacity="0.55"/>`
        )
        .join("\n")}
      <path d="${areaD}" fill="url(#chartFill)"/>
      <path d="${lineD}" stroke="url(#accent)" stroke-width="${
    theme.layout.chartStroke
  }" fill="none"/>
      <text x="${theme.layout.chartPad}" y="${chartH - 10}" fill="${
    theme.colors.textDim
  }"
            font-size="11" font-family="ui-sans-serif, system-ui">Last 30 days</text>
      <text x="${
        chartW - theme.layout.chartPad
      }" y="18" text-anchor="end" fill="${theme.colors.textDim}"
            font-size="11" font-family="ui-sans-serif, system-ui">max ${max30}</text>
    </g>

    <g transform="translate(0,${theme.layout.metricsY})">
      <text x="0" y="0" fill="${theme.colors.textStrong}" font-size="${
    theme.layout.totalFontSize
  }" font-weight="800"
            font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto">${total.toLocaleString(
              "en-US"
            )}</text>

      <text x="${theme.layout.totalLabelX}" y="0" fill="${
    theme.colors.textMuted
  }" font-size="14" font-weight="600"
            font-family="ui-sans-serif, system-ui">Total contributions</text>

      <text x="0" y="30" fill="${
        theme.colors.textDim
      }" font-size="12" font-family="ui-sans-serif, system-ui">Last active</text>
      <text x="74" y="30" fill="${
        theme.colors.textStrong
      }" font-size="12" font-weight="650"
            font-family="ui-sans-serif, system-ui">${lastActiveText}</text>
    </g>
  </g>

  <g>
    <circle cx="${midCenterX}" cy="${midCenterY}" r="${ringR}" stroke="${
    theme.colors.divider
  }" stroke-width="${ringStroke}"/>
    <circle cx="${midCenterX}" cy="${midCenterY}" r="${ringR}" stroke="url(#accent)" stroke-width="${ringStroke}"
      stroke-linecap="round" stroke-dasharray="${dash}"
      transform="rotate(-90 ${midCenterX} ${midCenterY})"/>

    <text x="${midCenterX}" y="${midCenterY + 16}" text-anchor="middle" fill="${
    theme.colors.textStrong
  }"
      font-size="40" font-weight="850" font-family="ui-sans-serif, system-ui">${current}</text>

    <text x="${midCenterX}" y="${midCenterY + 74}" text-anchor="middle" fill="${
    theme.colors.textMuted
  }"
      font-size="14" font-family="ui-sans-serif, system-ui">${streakTitle}</text>

    <text x="${midCenterX}" y="${midCenterY + 94}" text-anchor="middle" fill="${
    theme.colors.textDim
  }"
      font-size="12" font-family="ui-sans-serif, system-ui">${streakDesc}</text>
  </g>

  <g transform="translate(${listX},${listY})">
    ${rows
      .map((row, idx) => {
        const y = idx * rowH;
        const p = iconPath(row.icon);
        const isStar = row.icon === "star";

        const iconSvg = isStar
          ? `<path d="${p}" fill="${theme.colors.listIcon}" opacity="0.95"/>`
          : `<path d="${p}" stroke="${theme.colors.listIcon}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"/>`;

        return `
        <g transform="translate(0,${y})">
          <g transform="translate(0,-15)">
            <svg x="0" y="0" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              ${iconSvg}
            </svg>
          </g>
          <text x="30" y="0" fill="${theme.colors.listLabel}" font-size="14.5" font-weight="650" font-family="ui-sans-serif, system-ui">${row.label}</text>
          <text x="186" y="0" fill="${theme.colors.listValue}" font-size="14.5" font-weight="850" font-family="ui-sans-serif, system-ui">${row.value}</text>
        </g>`;
      })
      .join("\n")}
  </g>
</svg>`;
}

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

  const { current, longest, lastActive } = streakFromDailyCounts(daily);

  const last = daily.slice(-30).map((d) => d.count);
  const series30 = Array.from({ length: 30 }, (_, i) => last[i] ?? 0);

  const total =
    data.user.contributionsCollection.contributionCalendar.totalContributions ||
    0;

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
