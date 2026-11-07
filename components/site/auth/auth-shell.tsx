import Link from "next/link"

import logo from "@/app/assets/logo.png"
import Image from "next/image"

export function AuthShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center gap-6 px-4 py-12">
      {/* Soft brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(50%_100%_at_50%_0%,oklch(0.55_0.18_305/20%),transparent_70%)]"
      />

      <Link
        href="/"
        aria-label="HireLoop home"
        className="inline-flex shrink-0"
      >
        <Image src={logo} alt="HireLoop" className="h-8 w-auto" sizes="120px" />
      </Link>

      {children}
    </main>
  )
}
