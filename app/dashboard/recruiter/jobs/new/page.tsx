"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Briefcase, MapPin, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]
const EXPERIENCE_LEVELS = ["Entry", "Mid", "Senior", "Lead", "Executive"]

export default function NewJobPage() {
  const router = useRouter()
  const [jobType, setJobType] = useState(JOB_TYPES[0])
  const [experience, setExperience] = useState(EXPERIENCE_LEVELS[1])
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const payload = {
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      location: String(formData.get("location") ?? "").trim(),
      salary: String(formData.get("salary") ?? "").trim(),
      jobType,
      experience,
    }

    // TODO: send `payload` to your API / better-auth / DB.
    console.info("New job submitted:", payload)

    // Simulate a short delay then redirect back to manage jobs.
    await new Promise((resolve) => setTimeout(resolve, 400))
    setSubmitting(false)
    router.push("/dashboard/recruiter/manage-jobs")
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Create Job Post
        </h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details below to publish a new job opening.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-xl border bg-card p-5 elevation-card sm:p-6"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="title">Job Title</Label>
          <div className="relative">
            <Briefcase className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="title"
              name="title"
              type="text"
              required
              placeholder="e.g. Senior Product Designer"
              className="h-9 bg-background/40 pl-9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            name="description"
            required
            rows={5}
            placeholder="Describe the role, responsibilities, and requirements…"
            className="bg-background/40"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="location"
                name="location"
                type="text"
                required
                placeholder="e.g. New York, USA"
                className="h-9 bg-background/40 pl-9"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="salary">Salary</Label>
            <div className="relative">
              <DollarSign className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="salary"
                name="salary"
                type="text"
                placeholder="e.g. $80k - $120k"
                className="h-9 bg-background/40 pl-9"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label>Job Type</Label>
            <Select value={jobType} onValueChange={(v) => v && setJobType(v)}>
              <SelectTrigger className="h-9 bg-background/40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {JOB_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Experience Level</Label>
            <Select
              value={experience}
              onValueChange={(v) => v && setExperience(v)}
            >
              <SelectTrigger className="h-9 bg-background/40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_LEVELS.map((e) => (
                  <SelectItem key={e} value={e}>
                    {e}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Publishing…" : "Publish Job"}
          </Button>
        </div>
      </form>
    </div>
  )
}
