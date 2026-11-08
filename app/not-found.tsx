import Link from "next/link"

import logo from "@/app/assets/logo.png"
import Image from "next/image"
import { ArrowLeftIcon, HomeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 py-12 text-center">
      <Link
        href="/"
        aria-label="HireLoop home"
        className="inline-flex shrink-0"
      >
        <Image src={logo} alt="HireLoop" className="h-8 w-auto" sizes="120px" />
      </Link>

      <div className="flex flex-col gap-2">
        <span className="font-mono text-6xl font-bold text-muted-foreground/40">
          404
        </span>
        <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Page not found
        </h1>
        <p className="max-w-md text-sm text-muted-foreground sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button render={<Link href="/" />} nativeButton={false}>
          <HomeIcon className="size-4" />
          Back to home
        </Button>
        <Button
          variant="outline"
          render={<Link href="/jobs" />}
          nativeButton={false}
        >
          <ArrowLeftIcon className="size-4" />
          Browse jobs
        </Button>
      </div>
    </main>
  )
}
