"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import logo from "@/app/assets/logo.png"
import { ThemeToggle, ThemeToggleCompact } from "@/components/site/theme-toggle"
import { useSession, signOut } from "@/lib/auth-client"



function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image src={logo} alt="HireLoop" className="h-7 w-auto" sizes="88px" />
    </Link>
  )
}

function NavLink({
  href,
  label,
  active,
  className,
}: {
  href: string
  label: string
  active: boolean
  className?: string
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "text-sm whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:font-semibold aria-[current=page]:text-foreground",
        className
      )}
    >
      {label}
    </Link>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const NAV_LINKS = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/companies" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: `/dashboard/${session?.user.role || 'seeker'}` },
  ]
  const handleSigOut = async () => {
    await signOut()
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand */}
        <Logo />

        {/* Desktop links */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={isActivePath(pathname, link.href)}
              className="rounded-lg px-3 py-2"
            />
          ))}
        </nav>

        {/* Desktop actions */}
        {
          session?.user ?
            <>
              <span>Welcome {session.user.name}</span>
              <Button
                variant="ghost"
                className="text-muted-foreground cursor-pointer hover:text-foreground"
                nativeButton={true}
                onClick={handleSigOut}
              >
                Sign Out
              </Button>
            </>

            : <>
              <div className="hidden items-center gap-2 md:flex">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                  nativeButton={false}
                  render={<Link href="/signin" />}
                >
                  Sign In
                </Button>
                <Button
                  nativeButton={false}
                  className="border-border/80"
                  render={<Link href="/signup" />}
                >
                  Get Started
                </Button>
              </div>
            </>
        }

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger
            data-slot="navbar-menu-trigger"
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="right" className="gap-0 p-4">
            <SheetHeader className="flex-row items-center justify-between p-0">
              <SheetTitle>
                <span className="sr-only">HireLoop</span>
              </SheetTitle>
              <div className="flex flex-1 items-center justify-between">
                <Logo />
                <ThemeToggleCompact />
              </div>
            </SheetHeader>
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1 border-t py-3"
            >
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={isActivePath(pathname, link.href)}
                  className="px-3 py-2.5 hover:bg-muted"
                />
              ))}
            </nav>
            <div className="flex items-center gap-2 border-t pt-4">
              <Button
                variant="outline"
                className="flex-1"
                nativeButton={false}
                render={<Link href="/signin" />}
              >
                Sign In
              </Button>
              <Button
                nativeButton={false}
                className="flex-1"
                render={<Link href="/signup" />}
              >
                Get Started
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
