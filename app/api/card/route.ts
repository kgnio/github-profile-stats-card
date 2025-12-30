import { getTheme } from "@/lib/themes";
import type { Theme } from "@/types/theme";

export const runtime = "edge";

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
  let total = 0;
  let current = 0;
  let longest = 0;

  for (const x of daily) total += x.count;

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

  return { total, current, longest, lastActive };
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

  // guard against length <= 1
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

  const L = theme.layout;

  const W = L.cardW;
  const H = L.cardH;
  const pad = L.cardPad;

  const leftDivider = L.leftDividerX;
  const rightDivider = L.rightDividerX;

  const leftColX = L.leftColX;
  const leftTopY = L.leftTopY;

  const chartW = L.chartW;
  const chartH = L.chartH;

  const {
    lineD,
    areaD,
    max: max30,
  } = areaPath(series30, chartW, chartH, L.chartPad);

  const gridYs = Array.from({ length: L.gridLines + 1 }, (_, i) => {
    const y =
      L.chartPad + ((chartH - L.chartPad * 2) * i) / Math.max(1, L.gridLines);
    return y;
  });

  const ringR = L.ringR;
  const ringStroke = L.ringStroke;
  const ringCirc = 2 * Math.PI * ringR;
  const denom = Math.max(1, longest, current);
  const ratio = clamp(current / denom, 0, 1);
  const dash = `${(ratio * ringCirc).toFixed(2)} ${ringCirc.toFixed(2)}`;

  const midCenterX = (leftDivider + rightDivider) / 2;
  const midCenterY = L.ringCenterY + L.ringYOffset;

  const streakTitle = `${current}-day commit streak`;
  const streakDesc = `Coding consistently for ${current} days in a row.`;

  const lastActiveText = fmtISO(lastActive);

  const listX = rightDivider + L.listXPad;
  const listY = L.listY;
  const rowH = L.listRowH;

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
      <stop stop-color="${theme.colors.chartFill}" stop-opacity="${
    L.chartFillOpacityTop
  }"/>
      <stop offset="1" stop-color="${theme.colors.chartFill}" stop-opacity="${
    L.chartFillOpacityBottom
  }"/>
    </linearGradient>

    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="${L.shadowDx}" dy="${L.shadowDy}" stdDeviation="${
    L.shadowBlur
  }"
        flood-color="${theme.colors.shadowColor}" flood-opacity="${
    L.shadowOpacity
  }"/>
    </filter>
  </defs>

  <rect x="${pad}" y="${pad}" width="${W - pad * 2}" height="${H - pad * 2}"
        rx="${L.radiusCard}" fill="url(#bg)" stroke="${theme.colors.cardStroke}"
        stroke-width="${L.strokeCard}" filter="url(#softShadow)"/>

  <path d="M${W - L.accentShapeX1} ${pad} L${W - L.accentShapeX2} ${pad} L${
    W - L.accentShapeX3
  } ${H - pad} L${W - L.accentShapeX4} ${H - pad} Z"
        fill="url(#accent)" opacity="${L.accentShapeOpacity}"/>

  <line x1="${leftDivider}" y1="${L.dividerTopY}" x2="${leftDivider}" y2="${
    H - L.dividerBottomY
  }"
        stroke="${theme.colors.divider}" stroke-width="${L.strokeDivider}"/>
  <line x1="${rightDivider}" y1="${L.dividerTopY}" x2="${rightDivider}" y2="${
    H - L.dividerBottomY
  }"
        stroke="${theme.colors.divider}" stroke-width="${L.strokeDivider}"/>

  <g transform="translate(${leftColX},${leftTopY})">
    <g>
      <rect x="0" y="0" width="${chartW}" height="${chartH}" rx="${
    L.radiusPanel
  }"
            fill="${theme.colors.panelBg}" stroke="${
    theme.colors.panelStroke
  }"/>
      ${gridYs
        .map(
          (y) =>
            `<line x1="${L.chartPad}" y1="${y.toFixed(2)}" x2="${(
              chartW - L.chartPad
            ).toFixed(2)}" y2="${y.toFixed(2)}" stroke="${
              theme.colors.panelStroke
            }" opacity="${L.gridOpacity}"/>`
        )
        .join("\n")}
      <path d="${areaD}" fill="url(#chartFill)"/>
      <path d="${lineD}" stroke="url(#accent)" stroke-width="${
    L.chartStroke
  }" fill="none"/>

      <text x="${L.chartPad}" y="${chartH - L.chartLabelBottomPad}" fill="${
    theme.colors.textDim
  }"
            font-size="${L.chartLabelFontSize}" font-family="${L.fontFamily}">${
    L.chartLabelLeftText
  }</text>

      <text x="${chartW - L.chartPad}" y="${
    L.chartMaxLabelY
  }" text-anchor="end" fill="${theme.colors.textDim}"
            font-size="${L.chartLabelFontSize}" font-family="${L.fontFamily}">${
    L.chartLabelRightPrefix
  } ${max30}</text>
    </g>

    <g transform="translate(0,${L.metricsY})">
      <text x="0" y="0" fill="${theme.colors.textStrong}" font-size="${
    L.totalFontSize
  }" font-weight="${L.totalFontWeight}"
            font-family="${L.fontFamily}">${total.toLocaleString(
    "en-US"
  )}</text>

      <text x="${L.totalLabelX}" y="0" fill="${
    theme.colors.textMuted
  }" font-size="${L.totalLabelFontSize}" font-weight="${L.totalLabelFontWeight}"
            font-family="${L.fontFamily}">${L.totalLabelText}</text>

      <text x="0" y="${L.lastActiveRowY}" fill="${
    theme.colors.textDim
  }" font-size="${L.lastActiveLabelFontSize}"
            font-family="${L.fontFamily}">${L.lastActiveLabelText}</text>

      <text x="${L.lastActiveValueX}" y="${L.lastActiveRowY}" fill="${
    theme.colors.textStrong
  }"
            font-size="${L.lastActiveValueFontSize}" font-weight="${
    L.lastActiveValueFontWeight
  }"
            font-family="${L.fontFamily}">${lastActiveText}</text>
    </g>
  </g>

  <g>
    <circle cx="${midCenterX}" cy="${midCenterY}" r="${ringR}" stroke="${
    theme.colors.divider
  }" stroke-width="${ringStroke}"/>
    <circle cx="${midCenterX}" cy="${midCenterY}" r="${ringR}" stroke="url(#accent)" stroke-width="${ringStroke}"
      stroke-linecap="round" stroke-dasharray="${dash}"
      transform="rotate(-90 ${midCenterX} ${midCenterY})"/>

    <text x="${midCenterX}" y="${
    midCenterY + L.ringValueDy
  }" text-anchor="middle" fill="${theme.colors.textStrong}"
      font-size="${L.ringValueFontSize}" font-weight="${
    L.ringValueFontWeight
  }" font-family="${L.fontFamily}">${current}</text>

    <text x="${midCenterX}" y="${
    midCenterY + L.streakTitleDy
  }" text-anchor="middle" fill="${theme.colors.textMuted}"
      font-size="${L.streakTitleFontSize}" font-weight="${
    L.streakTitleFontWeight
  }" font-family="${L.fontFamily}">${streakTitle}</text>

    <text x="${midCenterX}" y="${
    midCenterY + L.streakDescDy
  }" text-anchor="middle" fill="${theme.colors.textDim}"
      font-size="${L.streakDescFontSize}" font-weight="${
    L.streakDescFontWeight
  }" font-family="${L.fontFamily}">${streakDesc}</text>
  </g>

  <g transform="translate(${listX},${listY})">
    ${rows
      .map((row, idx) => {
        const y = idx * rowH;
        const p = iconPath(row.icon);
        const isStar = row.icon === "star";

        const iconSvg = isStar
          ? `<path d="${p}" fill="${theme.colors.listIcon}" opacity="${L.listIconOpacity}"/>`
          : `<path d="${p}" stroke="${theme.colors.listIcon}" stroke-width="${L.listIconStroke}" stroke-linecap="round" stroke-linejoin="round" opacity="${L.listIconOpacity}"/>`;

        return `
        <g transform="translate(0,${y})">
          <g transform="translate(0,${L.listIconDy})">
            <svg x="0" y="0" width="${L.listIconBox}" height="${L.listIconBox}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              ${iconSvg}
            </svg>
          </g>
          <text x="${L.listLabelX}" y="0" fill="${theme.colors.listLabel}" font-size="${L.listFontSize}" font-weight="${L.listLabelWeight}" font-family="${L.fontFamily}">${row.label}</text>
          <text x="${L.listValueX}" y="0" fill="${theme.colors.listValue}" font-size="${L.listFontSize}" font-weight="${L.listValueWeight}" font-family="${L.fontFamily}">${row.value}</text>
        </g>`;
      })
      .join("\n")}
  </g>
</svg>`;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const user = (url.searchParams.get("user") || "").trim();
    const theme = getTheme(url.searchParams.get("theme"));
    const token = process.env.GH_TOKEN;

    if (!token) return new Response("Missing GH_TOKEN", { status: 500 });
    if (!user) return new Response("Missing ?user=", { status: 400 });

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

    const data = await graphql(token, q, { login: user });

    const weeks = data.user.contributionsCollection.contributionCalendar
      .weeks as any[];

    const daily: Day[] = weeks
      .flatMap((w) => w.contributionDays)
      .map((d: any) => ({ date: d.date, count: d.contributionCount }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const { total, current, longest, lastActive } =
      streakFromDailyCounts(daily);

    const series30Raw = daily.slice(-30).map((d) => d.count);
    const series30 = Array.from({ length: 30 }, (_, i) => series30Raw[i] ?? 0);

    const commits =
      data.user.contributionsCollection.totalCommitContributions || 0;
    const prs =
      data.user.contributionsCollection.totalPullRequestContributions || 0;
    const issues =
      data.user.contributionsCollection.totalIssueContributions || 0;
    const contributedTo =
      data.user.contributionsCollection
        .totalRepositoriesWithContributedCommits || 0;

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

    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
      },
    });
  } catch (e: any) {
    return new Response(String(e?.message || e), { status: 500 });
  }
}
