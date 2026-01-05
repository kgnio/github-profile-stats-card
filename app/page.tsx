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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Copy as CopyIcon, ExternalLink, Github } from "lucide-react";
import { toast } from "sonner";
import { ProfileCardBotNav } from "@/components/nav/footer";

const THEMES = [
  { key: "midnight", label: "Midnight" },
  { key: "azure-noir", label: "Azure Noir" },
  { key: "cyber-city", label: "Cyber City" },
  { key: "darker-than-black", label: "Darker Than Black" },
  { key: "cupcake", label: "Cupcake" },
  { key: "ice", label: "Ice" },
  { key: "sunset", label: "Sunset" },
  { key: "pine-tree", label: "Pine Tree" },
] as const;

type ThemeKey = (typeof THEMES)[number]["key"];

function Surface({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={["rounded-2xl border", "bg-background", className].join(" ")}
    >
      {children}
    </div>
  );
}

function CodeBlock({
  children,
  title,
  rightSlot,
}: {
  children: React.ReactNode;
  title: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b px-3 py-2">
        <div className="text-[11px] font-medium text-muted-foreground">
          {title}
        </div>
        {rightSlot}
      </div>
      <div className="px-3 py-2">
        <div className="text-xs font-mono break-words whitespace-pre-wrap">
          {children}
        </div>
      </div>
    </div>
  );
}

function StepRow({
  n,
  title,
  desc,
}: {
  n: number;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl border bg-card p-3 shadow-sm">
      <div className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border bg-background text-[11px] font-medium">
        {n}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-medium">{title}</div>
        <div className="text-[11px] text-muted-foreground leading-relaxed">
          {desc}
        </div>
      </div>
    </div>
  );
}

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
      toast.success("Copied", { description: label });
    } catch {
      toast.error("Copy failed", {
        description: "Clipboard permission blocked.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        {/* HEADER */}
        <header className="mb-8 space-y-3 sm:mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="rounded-full">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              GitHub SVG generator
            </Badge>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">
              GitHub Profile Stats Card
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Pick a theme, preview the SVG, then copy the URL or README
              markdown.
            </p>
          </div>
        </header>

        {/* GRID */}
        <section className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          {/* LEFT PANEL */}
          <Card className="h-[78svh] overflow-hidden sm:h-[700px] flex flex-col">
            <CardHeader className="flex flex-row items-start justify-between gap-4 shrink-0">
              <div className="space-y-1">
                <div className="text-sm font-medium">Preview</div>
                <div className="text-xs text-muted-foreground">
                  Live SVG output
                </div>
              </div>

              <Button
                size="sm"
                variant="outline"
                className="shrink-0"
                onClick={() => window.open(activeUrl, "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open SVG
              </Button>
            </CardHeader>

            <CardContent className="flex-1 min-h-0 flex flex-col gap-5">
              {/* ACTIVE SVG */}
              <Surface className="p-3">
                <div className="overflow-hidden rounded-xl border bg-background">
                  <AspectRatio ratio={3 / 1}>
                    <img
                      src={activeUrl}
                      alt="Active SVG preview"
                      className="h-full w-full object-contain"
                      draggable={false}
                    />
                  </AspectRatio>
                </div>
              </Surface>

              <div className="flex items-center justify-between">
                <div className="text-xs font-medium">Themes</div>
                <div className="text-xs text-muted-foreground">
                  {THEMES.length} options
                </div>
              </div>

              <Separator />

              <ScrollArea className="min-h-0 flex-1 pr-2">
                <div className="space-y-3 pb-1">
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
                          "group flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-4 rounded-2xl border p-2.5 sm:p-3 text-left transition shadow-sm",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                          active
                            ? "border-primary/40 bg-primary/5"
                            : "bg-card hover:bg-accent/40",
                        ].join(" ")}
                      >
                        <div className="w-full sm:w-[168px] shrink-0 overflow-hidden rounded-xl border bg-background">
                          {/* Mobile */}
                          <div className="relative h-[72px] w-full sm:hidden">
                            <img
                              src={previewUrl}
                              alt={`${t.label} preview`}
                              className="absolute inset-0 h-full w-full object-cover"
                              draggable={false}
                            />
                          </div>

                          {/* Desktop */}
                          <div className="hidden sm:block">
                            <AspectRatio ratio={3 / 1}>
                              <img
                                src={previewUrl}
                                alt={`${t.label} preview`}
                                className="h-full w-full object-contain"
                                draggable={false}
                              />
                            </AspectRatio>
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="text-sm font-medium truncate">
                              {t.label}
                            </div>
                            {active ? (
                              <Badge className="rounded-full shrink-0">
                                Active
                              </Badge>
                            ) : (
                              <Badge
                                variant="secondary"
                                className="rounded-full opacity-70 shrink-0"
                              >
                                Select
                              </Badge>
                            )}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground truncate">
                            theme={t.key}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* RIGHT PANEL */}
          <Card className="h-[78svh] overflow-hidden sm:h-[700px] flex flex-col">
            <CardHeader className="space-y-1 shrink-0">
              <div className="text-sm font-medium">Generate</div>
              <div className="text-xs text-muted-foreground">
                Customize and copy
              </div>
            </CardHeader>

            <CardContent className="flex-1 min-h-0 flex flex-col gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  GitHub username
                </label>
                <Input
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="kgnio"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Theme
                </label>
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

              <Separator />

              {/* URL */}
              <div className="space-y-3">
                <div className="text-xs font-medium text-muted-foreground">
                  URL
                </div>

                <Surface className="p-0">
                  <CodeBlock
                    title="URL"
                    rightSlot={
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-[11px]"
                          onClick={() =>
                            copy(activeUrl, "Profile card URL copied")
                          }
                        >
                          <CopyIcon className="mr-1 h-3.5 w-3.5" />
                          Copy
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-[11px]"
                          onClick={() => window.open(activeUrl, "_blank")}
                        >
                          <ExternalLink className="mr-1 h-3.5 w-3.5" />
                          Open
                        </Button>
                      </div>
                    }
                  >
                    {activeUrl}
                  </CodeBlock>
                </Surface>
              </div>

              {/* MARKDOWN */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-medium text-muted-foreground">
                    README Markdown
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 text-[11px]"
                    onClick={() => copy(md, "README markdown copied")}
                  >
                    <CopyIcon className="mr-1 h-3.5 w-3.5" />
                    Copy
                  </Button>
                </div>

                <Surface className="p-3">
                  <pre className="text-xs font-mono whitespace-pre-wrap break-words">
                    {md}
                  </pre>
                </Surface>
              </div>
            </CardContent>
          </Card>

          {/* HOW TO USE */}
          <Card className="lg:col-span-2 overflow-hidden">
            <CardHeader className="space-y-2">
              <div className="text-sm font-medium">How to use</div>
              <div className="text-xs text-muted-foreground">
                Use my hosted endpoint in your profile README, or run it in your
                own repo with GitHub Actions.
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                <a
                  href="https://github.com/kgnio/github-profile-stats-card"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 hover:bg-accent/40 transition shadow-sm"
                >
                  <Github className="h-3.5 w-3.5" />
                  View the GitHub repo (full guide)
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </a>
                <span className="hidden sm:inline">•</span>
                <span>
                  For screenshots + troubleshooting, open the repo README.
                </span>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <Tabs defaultValue="direct" className="w-full">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <TabsList className="w-full sm:w-auto">
                    <TabsTrigger value="direct">
                      Directly from this site
                    </TabsTrigger>
                    <TabsTrigger value="local">
                      Your local (GitHub Actions)
                    </TabsTrigger>
                  </TabsList>

                  <div className="text-[11px] text-muted-foreground">
                    Same output, different hosting.
                  </div>
                </div>

                <Separator className="my-4" />

                <TabsContent value="direct" className="mt-0">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border bg-card p-5 shadow-sm">
                      <div className="mb-3 flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-md">
                          Steps
                        </Badge>
                        <div className="text-xs font-medium">
                          Use hosted endpoint
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <StepRow
                          n={1}
                          title="Create profile repo"
                          desc="Make a repo named exactly <your-username>."
                        />
                        <StepRow
                          n={2}
                          title="Add README.md"
                          desc="GitHub shows it on your profile."
                        />
                        <StepRow
                          n={3}
                          title="Paste embed markdown"
                          desc="Pick username + theme and paste into README."
                        />
                      </div>
                    </div>

                    <div className="rounded-2xl border bg-card p-5 shadow-sm">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="text-xs font-medium">Embed example</div>
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

                      <CodeBlock title="Markdown">
                        {`![GitHub Profile Stats](${base}/api/card?user=<username>&theme=<theme>)`}
                      </CodeBlock>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="local" className="mt-0">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border bg-card p-5 shadow-sm">
                      <div className="mb-3 flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-md">
                          Steps
                        </Badge>
                        <div className="text-xs font-medium">
                          Generate SVG in your repo
                        </div>
                      </div>

                      <Surface className="p-3">
                        <div className="text-[11px] text-muted-foreground leading-relaxed">
                          Generates{" "}
                          <strong className="text-foreground">
                            public/card.svg
                          </strong>{" "}
                          inside your fork, then you embed it with a raw GitHub
                          URL. Uses{" "}
                          <span className="font-mono text-foreground">
                            PROFILE_REPO_TOKEN
                          </span>
                          .
                        </div>
                      </Surface>

                      <div className="mt-3 grid gap-2">
                        <StepRow
                          n={1}
                          title="Fork the repo"
                          desc="Keep the name: github-profile-stats-card"
                        />
                        <StepRow
                          n={2}
                          title="Enable workflows"
                          desc="Actions → Enable workflows"
                        />
                        <StepRow
                          n={3}
                          title="Add Secret"
                          desc="Secrets → PROFILE_REPO_TOKEN"
                        />
                        <StepRow
                          n={4}
                          title="Add Variables"
                          desc="Variables → CARD_USERNAME + CARD_THEME"
                        />
                        <StepRow
                          n={5}
                          title="Run workflow"
                          desc="Actions → Generate Profile Card → Run workflow"
                        />
                      </div>
                    </div>

                    <div className="rounded-2xl border bg-card p-5 shadow-sm">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="text-xs font-medium">Embed example</div>
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

                      <CodeBlock title="Markdown">
                        {`![GitHub Profile Card](https://raw.githubusercontent.com/<username>/github-profile-stats-card/main/public/card.svg)`}
                      </CodeBlock>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <ProfileCardBotNav />
      </div>
    </main>
  );
}
