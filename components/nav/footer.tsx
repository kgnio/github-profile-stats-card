"use client";

import * as React from "react";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Github, Linkedin, Instagram, BookOpen } from "lucide-react";

const SOCIALS = {
  github: "https://github.com/kgnio",
  linkedin: "https://www.linkedin.com/in/ogulkagan-mamak",
  instagram: "https://www.instagram.com/kaganmmk",
  medium: "https://medium.com/@kgnio",
} as const;

function IconLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  const isExternal = href.startsWith("http");

  return (
    <Button asChild variant="outline" size="icon" className="h-9 w-9">
      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
        >
          {icon}
        </a>
      ) : (
        <Link href={href} aria-label={label} title={label}>
          {icon}
        </Link>
      )}
    </Button>
  );
}

export function ProfileCardBotNav() {
  return (
    <Card className="mt-5">
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="text-base font-semibold tracking-tight">Socials</div>
          <div className="mt-1 text-xs text-muted-foreground">
            You can contact me with your feedback and suggestions.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 justify-start sm:justify-end">
          <IconLink
            href={SOCIALS.github}
            label="GitHub"
            icon={<Github className="h-4 w-4" />}
          />
          <IconLink
            href={SOCIALS.linkedin}
            label="LinkedIn"
            icon={<Linkedin className="h-4 w-4" />}
          />
          <IconLink
            href={SOCIALS.instagram}
            label="Instagram"
            icon={<Instagram className="h-4 w-4" />}
          />
          <IconLink
            href={SOCIALS.medium}
            label="Medium"
            icon={<BookOpen className="h-4 w-4" />}
          />
        </div>
      </div>
    </Card>
  );
}
