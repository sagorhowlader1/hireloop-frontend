import Image from "next/image"
import Link from "next/link"
import {
  BriefcaseIcon,
  Building2Icon,
  StarIcon,
  TrendingUpIcon,
  UserRoundSearchIcon,
} from "lucide-react"

import globe from "@/app/assets/globe.png"
import { cn } from "cn"

import { HeroSearch } from "@/components/site/hero-search"

const HERO_STATS = [
  {
    icon: BriefcaseIcon,
    value: "50K+",
    label: "Active Jobs",
    href: "/jobs",
  },
  {
    icon: Building2Icon,
    value: "12K+",
    label: "Companies",
    href: "/companies",
  },
  {
    icon: UserRoundSearchIcon,
    value: "2M+",
    label: "Job Seekers",
    href: null,
  },
  {
    icon: StarIcon,
    value: "97%",
    label: "Satisfaction Rate",
    href: null,
  },
]

const TRENDING_ROLES = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

function HeroBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border bg-card/50 px-3 py-1.5 font-mono text-xs text-muted-foreground">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full rounded-full bg-amber-400 opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex size-1.5 rounded-full bg-amber-400" />
      </span>
      50,000+ new jobs this month
    </span>
  )
}

function HeroStat({
  icon: Icon,
  value,
  label,
  href,
}: {
  icon: typeof BriefcaseIcon
  value: string
  label: string
  href: string | null
}) {
  const content = (
    <>
      <span className="flex size-9 items-center justify-center rounded-full border bg-card/50 text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <span className="text-lg leading-none font-bold">{value}</span>
      <span className="text-sm leading-snug text-muted-foreground">
        {label}
      </span>
    </>
  )

  const className = "flex flex-col items-center gap-2 text-center"

  return href ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  )
}

function HeroGlobe() {
  return (
    <div className="relative mx-auto max-w-4xl px-4 sm:mt-14">
      {/* soft brand glow behind the globe */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-1/3 bottom-1/4 -z-10 rounded-full bg-[radial-gradient(closest-side,oklch(0.55_0.2_305/35%),transparent_75%)] blur-2xl"
      />
      <Image
        src={globe}
        alt=""
        preload
        sizes="(min-width: 1024px) 896px, 100vw"
        className="h-auto w-full"
      />
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-0">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-14 text-center sm:px-6 sm:pt-20">
        <HeroBadge />

        <h1 className="mt-6 max-w-2xl font-heading text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mt-5 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role faster.
        </p>

        <div className="mt-8 w-full">
          <HeroSearch />
        </div>

        {/* Trending positions */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <TrendingUpIcon className="size-3.5" aria-hidden="true" />
            Trending Position
          </span>
          {TRENDING_ROLES.map((role) => (
            <Link
              key={role}
              href={`/jobs?q=${encodeURIComponent(role)}`}
              className="rounded-full border bg-card/40 px-3 py-1 text-xs transition-colors hover:bg-card hover:text-foreground"
            >
              {role}
            </Link>
          ))}
        </div>

        {/* Stats row */}
        <dl className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-x-4 gap-y-8 sm:mt-14 sm:grid-cols-4">
          {HERO_STATS.map((stat) => (
            <HeroStat
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              href={stat.href}
            />
          ))}
        </dl>

        <p className="mt-8 text-sm text-muted-foreground">
          Assisting over 15,000{" "}
          <span className="font-medium text-foreground">job seekers</span> find
          their dream positions.
        </p>
      </div>

      {/* <HeroGlobe  /> */}

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-72",
          "bg-[radial-gradient(60%_100%_at_50%_0%,oklch(0.55_0.18_305/20%),transparent_70%)]"
        )}
      />
    </section>
  )
}
