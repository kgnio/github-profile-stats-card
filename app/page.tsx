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

import { ExternalLink, Copy as CopyIcon } from "lucide-react";
import { Github } from "lucide-react";

import { toast } from "sonner";

const THEMES = [
  { key: "midnight", label: "Midnight" },
  { key: "cupcake", label: "Cupcake" },
  { key: "ice", label: "Ice" }, 
  { key: "sunset", label: "Sunset" },
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

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied", {
        description: label,
      });
    } catch {
      toast.error("Copy failed", {
        description: "Clipboard permission blocked.",
      });
    }
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
                      {/* PREVIEW BOX */}
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
                    onClick={() => copy(activeUrl, "Profile card URL copied")}
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
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copy(md, "README markdown copied")}
                  >
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
          <Card className="lg:col-span-2 overflow-hidden">
            <CardHeader>
              <div className="text-sm font-medium">How to use</div>

              <div className="text-xs text-muted-foreground">
                Use my hosted endpoint in your profile README, or run it in your
                own repo with GitHub Actions.
              </div>

              {/* Repo link */}
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                <a
                  href="https://github.com/kgnio/github-profile-stats-card"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border bg-background px-2 py-1 hover:bg-muted transition"
                >
                  <Github className="h-3.5 w-3.5" />
                  View the GitHub repo (full guide)
                </a>
                <span className="hidden sm:inline">•</span>
                <span>
                  For screenshots + troubleshooting, open the repo README.
                </span>
              </div>
            </CardHeader>

            <CardContent className="grid gap-6 p-6 lg:grid-cols-2">
              {/* OPTION A */}
              <div className="rounded-xl border bg-card p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md border bg-muted px-2 py-1 text-[11px] font-medium">
                      Option A
                    </span>
                    <div className="text-xs font-medium">Use my hosted SVG</div>
                    <span className="inline-flex items-center rounded-full border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      recommended
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid gap-2">
                    {[
                      {
                        title: "Create profile repo",
                        desc: "Make a repo named exactly <your-username>.",
                      },
                      {
                        title: "Add README.md",
                        desc: "GitHub shows it on your profile.",
                      },
                      {
                        title: "Copy markdown",
                        desc: "Pick username + theme and paste it into README.",
                      },
                    ].map((s, i) => (
                      <div
                        key={s.title}
                        className="flex gap-3 rounded-lg border bg-muted/30 p-3"
                      >
                        <div className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border bg-card text-[11px] font-medium">
                          {i + 1}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-medium">{s.title}</div>
                          <div className="text-[11px] text-muted-foreground leading-relaxed">
                            {s.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border bg-muted/40 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="text-[11px] font-medium text-muted-foreground">
                        Embed example
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 text-[11px]"
                        onClick={() =>
                          copy(
                            `![GitHub Profile Stats](${base}/api/card?user=<username>&theme=<theme>)`,
                            "Embed markdown copied"
                          )
                        }
                      >
                        <CopyIcon className="mr-1 h-3.5 w-3.5" />
                        Copy
                      </Button>
                    </div>

                    <pre className="text-xs font-mono whitespace-pre-wrap break-words">
                      {`![GitHub Profile Stats](${base}/api/card?user=<username>&theme=<theme>)`}
                    </pre>

                    <div className="mt-2 text-[11px] text-muted-foreground">
                      Tip: replace{" "}
                      <span className="font-mono text-foreground">
                        &lt;username&gt;
                      </span>{" "}
                      and{" "}
                      <span className="font-mono text-foreground">
                        &lt;theme&gt;
                      </span>
                      .
                    </div>
                  </div>
                </div>
              </div>

              {/* OPTION B */}
              <div className="rounded-xl border bg-card p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md border bg-muted px-2 py-1 text-[11px] font-medium">
                      Option B
                    </span>
                    <div className="text-xs font-medium">
                      Run it in your repo (GitHub Actions)
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-muted/30 p-3 text-[11px] text-muted-foreground leading-relaxed">
                  Generates{" "}
                  <strong className="text-foreground">public/card.svg</strong>{" "}
                  inside your fork, then you embed it with a raw GitHub URL.
                  Uses{" "}
                  <span className="font-mono text-foreground">
                    PROFILE_REPO_TOKEN
                  </span>
                  .
                </div>

                <div className="mt-3 grid gap-2">
                  {[
                    {
                      title: "Fork the repo",
                      desc: "Keep the name: github-profile-stats-card",
                    },
                    {
                      title: "Enable workflows",
                      desc: "Actions → Enable workflows",
                    },
                    {
                      title: "Add Secret",
                      desc: "Secrets → PROFILE_REPO_TOKEN",
                    },
                    {
                      title: "Add Variables",
                      desc: "Variables → CARD_USERNAME + CARD_THEME",
                    },
                    {
                      title: "Run workflow",
                      desc: "Actions → Generate Profile Card → Run workflow",
                    },
                  ].map((s, i) => (
                    <div
                      key={s.title}
                      className="flex gap-3 rounded-lg border bg-muted/30 p-3"
                    >
                      <div className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border bg-card text-[11px] font-medium">
                        {i + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium">{s.title}</div>
                        <div className="text-[11px] text-muted-foreground leading-relaxed">
                          {s.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 rounded-lg border bg-muted/40 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-[11px] font-medium text-muted-foreground">
                      Embed example
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 text-[11px]"
                        onClick={() =>
                          copy(
                            `![GitHub Profile Card](https://raw.githubusercontent.com/<username>/github-profile-stats-card/main/public/card.svg)`,
                            "Embed markdown copied"
                          )
                        }
                      >
                        <CopyIcon className="mr-1 h-3.5 w-3.5" />
                        Copy
                      </Button>
                    </div>
                  </div>

                  <pre className="text-xs font-mono whitespace-pre-wrap break-words">
                    {`![GitHub Profile Card](https://raw.githubusercontent.com/<username>/github-profile-stats-card/main/public/card.svg)`}
                  </pre>

                  <div className="mt-2 text-[11px] text-muted-foreground">
                    Tip: If updates don’t appear immediately, GitHub image
                    caching may take a few minutes.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
