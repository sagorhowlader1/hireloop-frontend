import Link from "next/link"
import { FaFacebook, FaLinkedin, FaPinterest } from "react-icons/fa"

import logo from "@/app/assets/logo.png"
import Image from "next/image"

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/ai" },
      { label: "Companies", href: "/companies" },
      { label: "Salary data", href: "/salary" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Career library", href: "/library" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Brand Guideline", href: "/brand" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
]

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebook },
  { label: "Pinterest", href: "https://pinterest.com", icon: FaPinterest },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedin },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              aria-label="HireLoop home"
              className="inline-flex shrink-0"
            >
              <Image
                src={logo}
                alt="HireLoop"
                className="h-7 w-auto"
                sizes="88px"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
            <div className="flex items-center gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h3 className="font-heading text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>Copyright 2024 Programming Hero</span>
          <span>Terms & Policy - Privacy Guideline</span>
        </div>
      </div>
    </footer>
  )
}
