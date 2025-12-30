"use client";

import * as React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const THEMES = [
  { key: "midnight", label: "Midnight" },
  { key: "cupcake", label: "Cupcake" },
  { key: "ice", label: "Ice" },
] as const;

type ThemeKey = (typeof THEMES)[number]["key"];

export default function Home() {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  const [user, setUser] = React.useState("kgnio");
  const [theme, setTheme] = React.useState<ThemeKey>("midnight");

  const activeUrl = React.useMemo(() => {
    const u = user.trim() || "kgnio";
    return `${base}/api/card?user=${encodeURIComponent(u)}&theme=${theme}`;
  }, [base, user, theme]);

  const md = `![GitHub Profile Stats](${activeUrl})`;

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* HEADER */}
        <header className="mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            GitHub SVG generator
          </div>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            GitHub Profile Stats Card
          </h1>

          <p className="max-w-2xl text-sm text-muted-foreground">
            Pick a theme, preview the SVG, then copy the URL or README markdown.
          </p>
        </header>

        {/* GRID */}
        <section className="grid gap-6 lg:grid-cols-2">
          {/* LEFT PANEL */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <div className="text-sm font-medium">Preview</div>
                <div className="text-xs text-muted-foreground">
                  Live SVG output
                </div>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(activeUrl, "_blank")}
              >
                Open SVG
              </Button>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* ACTIVE SVG */}
              <div className="w-full rounded-lg border bg-muted p-2">
                <div
                  className="relative w-full overflow-hidden rounded-md bg-background"
                  style={{ aspectRatio: "3 / 1" }}
                >
                  <img
                    src={activeUrl}
                    alt="Active SVG preview"
                    className="absolute inset-0 h-full w-full object-contain"
                    draggable={false}
                  />
                </div>
              </div>

              {/* THEME LIST */}
              <div className="space-y-3">
                {THEMES.map((t) => {
                  const active = t.key === theme;
                  const u = user.trim() || "kgnio";
                  const previewUrl = `${base}/api/card?user=${encodeURIComponent(
                    u
                  )}&theme=${t.key}`;

                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setTheme(t.key)}
                      className={[
                        "flex w-full items-center gap-4 rounded-lg border p-3 text-left transition",
                        active
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted",
                      ].join(" ")}
                    >
                      {/* FIXED PREVIEW BOX (NO SHIFT) */}
                      <div className="h-[56px] w-[168px] shrink-0 overflow-hidden rounded-md border bg-background">
                        <div className="relative h-full w-full">
                          <img
                            src={previewUrl}
                            alt={`${t.label} preview`}
                            className="absolute inset-0 h-full w-full object-contain"
                            draggable={false}
                          />
                        </div>
                      </div>

                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">
                          {t.label}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          theme={t.key}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* RIGHT PANEL */}
          <Card>
            <CardHeader>
              <div className="text-sm font-medium">Generate</div>
              <div className="text-xs text-muted-foreground">
                Customize and copy
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* USER INPUT */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">
                  GitHub username
                </label>
                <Input
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="kgnio"
                />
              </div>

              {/* THEME SELECT */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Theme</label>
                <Select
                  value={theme}
                  onValueChange={(v) => setTheme(v as ThemeKey)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {THEMES.map((t) => (
                      <SelectItem key={t.key} value={t.key}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* URL */}
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">URL</div>
                <div className="rounded-md border bg-muted p-2 text-xs font-mono break-words">
                  {activeUrl}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copy(activeUrl)}
                  >
                    Copy URL
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(activeUrl, "_blank")}
                  >
                    Open
                  </Button>
                </div>
              </div>

              {/* MARKDOWN */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    README Markdown
                  </div>
                  <Button size="sm" variant="outline" onClick={() => copy(md)}>
                    Copy
                  </Button>
                </div>
                <pre className="rounded-md border bg-muted p-2 text-xs font-mono whitespace-pre-wrap break-words">
                  {md}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* HOW TO USE */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="text-sm font-medium">How to use</div>
              <div className="text-xs text-muted-foreground">
                Use my hosted endpoint in your profile README, or run it in your
                own repo with GitHub Actions.
              </div>
            </CardHeader>

            <CardContent className="grid gap-6 lg:grid-cols-2">
              {/* OPTION A: USE MY DEPLOY */}
              <div className="space-y-3">
                <div className="text-xs font-medium">
                  Option A — Use my hosted SVG (recommended)
                </div>

                <ol className="list-decimal space-y-2 pl-4 text-xs text-muted-foreground">
                  <li>
                    Create a new repository on GitHub named exactly{" "}
                    <span className="font-mono text-foreground">
                      &lt;your-username&gt;
                    </span>{" "}
                    (same as your GitHub username).
                  </li>
                  <li>
                    Add a{" "}
                    <span className="font-mono text-foreground">README.md</span>{" "}
                    file (GitHub will show it on your profile automatically).
                  </li>
                  <li>
                    Pick your username + theme here, then copy the Markdown
                    below.
                  </li>
                  <li>Paste it into your profile README and commit.</li>
                </ol>

                <div className="text-xs text-muted-foreground">
                  Embed example
                </div>
                <pre className="rounded-md border bg-muted p-3 text-xs font-mono whitespace-pre-wrap break-words">
                  {`![GitHub Profile Stats](${base}/api/card?user=<username>&theme=<theme>)`}
                </pre>

                <div className="text-[11px] text-muted-foreground">
                  Tip: replace{" "}
                  <span className="font-mono text-foreground">
                    &lt;username&gt;
                  </span>{" "}
                  with your GitHub username and{" "}
                  <span className="font-mono text-foreground">
                    &lt;theme&gt;
                  </span>{" "}
                  with one of the themes.
                </div>
              </div>

              {/* OPTION B: RUN IN YOUR OWN REPO (ACTIONS) */}
              <div className="space-y-3">
                <div className="text-xs font-medium">
                  Option B — Run it in your own repo (GitHub Actions)
                </div>

                <ol className="list-decimal space-y-2 pl-4 text-xs text-muted-foreground">
                  <li>
                    Fork / clone this repository into your GitHub account.
                  </li>

                  <li>
                    Create a GitHub Personal Access Token (PAT) and save it as a
                    repository secret:
                    <div className="mt-1 text-[11px] leading-relaxed">
                      <span className="font-mono text-foreground">
                        Settings → Secrets and variables → Actions → Secrets
                      </span>{" "}
                      → add{" "}
                      <span className="font-mono text-foreground">
                        GH_TOKEN
                      </span>
                    </div>
                  </li>

                  <li>
                    Add repository variables (used by the workflow):
                    <div className="mt-1 grid gap-1">
                      <span className="font-mono text-foreground">
                        CARD_USERNAME
                      </span>
                      <span className="font-mono text-foreground">
                        CARD_THEME
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] leading-relaxed">
                      <span className="font-mono text-foreground">
                        Settings → Secrets and variables → Actions → Variables
                      </span>
                    </div>
                  </li>

                  <li>
                    Run the workflow:
                    <div className="mt-1 text-[11px] leading-relaxed">
                      <span className="font-mono text-foreground">
                        Actions → Generate Profile Card → Run workflow
                      </span>
                    </div>
                  </li>

                  <li>
                    The workflow uses{" "}
                    <span className="font-mono text-foreground">
                      scripts/generate-card.ts
                    </span>{" "}
                    and commits the generated SVG into your repo as{" "}
                    <span className="font-mono text-foreground">
                      public/card.svg
                    </span>
                    .
                  </li>

                  <li>
                    Embed that committed file in your profile README using the
                    raw GitHub URL.
                  </li>
                </ol>

                <div className="text-xs text-muted-foreground">
                  Example embed (from your own repo)
                </div>
                <pre className="rounded-md border bg-muted p-3 text-xs font-mono whitespace-pre-wrap break-words">
                  {`![GitHub Profile Stats](https://raw.githubusercontent.com/<your-username>/<your-repo>/main/public/card.svg)`}
                </pre>

                <div className="text-[11px] text-muted-foreground">
                  Tip: After the first workflow run, open{" "}
                  <span className="font-mono text-foreground">
                    public/card.svg
                  </span>{" "}
                  on GitHub and use its “Raw” URL.
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
