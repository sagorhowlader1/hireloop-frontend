"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { MapPinIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const inputClass =
  "flex min-w-0 flex-1 items-center gap-2.5 px-5 text-sm text-muted-foreground"

export function HeroSearch() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("")

  function handleSubmit(values?: { query?: string; location?: string }) {
    const q = values?.query ?? query
    const l = values?.location ?? location
    const params = new URLSearchParams()
    if (q.trim()) params.set("q", q.trim())
    if (l.trim()) params.set("location", l.trim())
    router.push(params.size > 0 ? `/jobs?${params.toString()}` : "/jobs")
  }

  return (
    <form
      role="search"
      aria-label="Job search"
      onSubmit={(event) => {
        event.preventDefault()
        handleSubmit()
      }}
      className="mx-auto flex w-full max-w-2xl flex-col gap-1.5 rounded-xl border bg-card/70 p-1.5 elevation-card sm:flex-row sm:items-center sm:rounded-full"
    >
      <label className={inputClass}>
        <SearchIcon className="size-4 shrink-0" />
        <span className="sr-only">Job title, skill or company</span>
        <input
          type="search"
          name="q"
          placeholder="Job title, skill or company"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="h-10 w-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground focus:text-foreground"
        />
      </label>
      <span
        aria-hidden="true"
        className="hidden h-6 w-px shrink-0 bg-border sm:block"
      />
      <label className={inputClass}>
        <MapPinIcon className="size-4 shrink-0" />
        <span className="sr-only">Location or Remote</span>
        <input
          type="text"
          name="location"
          placeholder="Location or Remote"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          className="h-10 w-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground focus:text-foreground"
        />
      </label>
      <Button type="submit" size="lg" className="shrink-0 sm:rounded-full">
        Search
      </Button>
    </form>
  )
}
