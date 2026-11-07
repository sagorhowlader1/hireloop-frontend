import Link from "next/link"

import ctaBg from "@/app/assets/cta-bg.png"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden">
      {/* wireframe-dome background asset: grid lines fading into a dark veil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `url("${ctaBg.src}")`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
        <h2 className="max-w-xl font-heading text-3xl font-medium text-balance text-foreground sm:text-4xl lg:text-5xl">
          Your next role is already looking for you
        </h2>

        <p className="mt-4 max-w-md text-base text-pretty text-muted-foreground sm:text-lg">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            className="shrink-0"
            render={<Link href="/signup" />}
            nativeButton={false}
          >
            Create a free account
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="shrink-0"
            render={<Link href="/pricing" />}
            nativeButton={false}
          >
            View pricing
          </Button>
        </div>
      </div>
    </section>
  )
}
