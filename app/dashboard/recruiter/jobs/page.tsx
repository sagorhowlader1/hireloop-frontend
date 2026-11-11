"use client"

import Link from "next/link"
import {
  CodeIcon,
  EllipsisVerticalIcon,
  GlobeIcon,
  MapPinIcon,
  MegaphoneIcon,
  PencilIcon,
  PenToolIcon,
  PlusIcon,
  TerminalIcon,
  Trash2Icon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { getJobs, type ApiJob } from "@/lib/api/jobs"

type Job = {
  id: string
  title: string
  department: string
  icon: LucideIcon
  /** Tailwind classes for the colored icon tile */
  iconTile: string
  company: string
  location: string
  isRemote: boolean
  type: "Full-time" | "Part-time" | "Contract" | "Internship"
  compensation: string
  applicants: number
  status: "Active" | "Expired"
  deadline: string
  deadlineNote: string
}

const JOB_TYPES: Job["type"][] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
]

/** Icon tile per job category, falling back to a neutral blue code icon. */
const CATEGORY_STYLES: Array<{
  match: string
  icon: LucideIcon
  iconTile: string
}> = [
  {
    match: "engineering",
    icon: CodeIcon,
    iconTile: "bg-blue-500/15 text-blue-500",
  },
  {
    match: "design",
    icon: PenToolIcon,
    iconTile: "bg-orange-500/15 text-orange-500",
  },
  {
    match: "marketing",
    icon: MegaphoneIcon,
    iconTile: "bg-violet-500/15 text-violet-500",
  },
  {
    match: "operations",
    icon: TerminalIcon,
    iconTile: "bg-cyan-500/15 text-cyan-500",
  },
]

function styleForCategory(category?: string) {
  const lower = (category ?? "").toLowerCase()
  const found = CATEGORY_STYLES.find((style) => lower.includes(style.match))
  return (
    found ?? {
      icon: CodeIcon,
      iconTile: "bg-blue-500/15 text-blue-500",
    }
  )
}

function formatCompensation(salary: ApiJob["salary"]): string {
  if (!salary?.min || !salary?.max) return "—"
  const unit = salary.frequency?.replace(/^per\s+/, "") ?? "hr"
  return `€${salary.min} – €${salary.max} / ${unit}`
}

function formatDeadline(deadline: string): string {
  const date = new Date(deadline)
  if (Number.isNaN(date.getTime())) return deadline
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}

function toJob(job: ApiJob): Job {
  const style = styleForCategory(job.jobCategory ?? job.department)
  const rawDeadline = job.deadline ?? ""
  const deadlineDate = new Date(rawDeadline)
  const isExpired =
    !Number.isNaN(deadlineDate.getTime()) && deadlineDate.getTime() < Date.now()

  return {
    id: job._id,
    title: job.title ?? job.jobTitle ?? "Untitled role",
    department: job.department ?? job.jobCategory ?? "",
    icon: style.icon,
    iconTile: job.iconTile ?? style.iconTile,
    company: job.company ?? job.companyName ?? "",
    location: job.location ?? "",
    isRemote: job.isRemote ?? job.remoteAllowed ?? false,
    type:
      JOB_TYPES.find((type) => type === (job.type ?? job.jobType)) ??
      "Full-time",
    compensation: job.compensation ?? formatCompensation(job.salary),
    applicants: job.applicants ?? 0,
    status:
      job.status === "Expired" || (job.status === undefined && isExpired)
        ? "Expired"
        : "Active",
    deadline: formatDeadline(rawDeadline),
    deadlineNote: job.deadlineNote ?? "",
  }
}

const TH =
  "px-3 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase whitespace-nowrap 2xl:px-4"

const PAGE_SIZE = 6

type PageItem = number | "ellipsis-start" | "ellipsis-end"

/** Classic pagination range with ellipses: 1 … (c-1) c (c+1) … last */
function getPageItems(current: number, total: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const items: PageItem[] = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  if (start > 2) items.push("ellipsis-start")
  for (let page = start; page <= end; page++) items.push(page)
  if (end < total - 1) items.push("ellipsis-end")

  items.push(total)
  return items
}

function StatusBadge({ status }: { status: Job["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        status === "Active"
          ? "bg-emerald-500/10 text-emerald-500"
          : "bg-muted text-muted-foreground"
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "Active" ? "bg-emerald-500" : "bg-muted-foreground/60"
        )}
      />
      {status}
    </span>
  )
}

function JobActions({ job, onDelete }: { job: Job; onDelete: () => void }) {
  return (
    <div className="flex items-center gap-1.5">
      <Button
        nativeButton={false}
        render={<Link href={`/dashboard/recruiter/jobs/new`} />}
        variant="outline"
        className="border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 dark:border-primary/40 dark:bg-primary/10 dark:hover:bg-primary/20"
      >
        <PencilIcon />
        Update
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Delete ${job.title}`}
        onClick={onDelete}
        className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2Icon />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label={`More actions for ${job.title}`}
              className="text-muted-foreground hover:text-foreground"
            />
          }
        >
          <EllipsisVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem>View applicants</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(jobs.length / PAGE_SIZE))

  // Keep the page in range after deletions shrink the list.
  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const currentPage = Math.min(page, totalPages)

  const pagedJobs = useMemo(
    () => jobs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [jobs, currentPage]
  )

  const pageItems = useMemo(
    () => getPageItems(currentPage, totalPages),
    [currentPage, totalPages]
  )

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)

        const data = await getJobs()

        if (!Array.isArray(data)) {
          throw new Error("Invalid jobs data")
        }

        setJobs(data.map(toJob))
      } catch (err) {
        console.error("Failed to fetch jobs:", err)
        setError("Failed to load jobs. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const handleDelete = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id))
  }

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      handleDelete(deleteTarget.id)
    }
    setDeleteTarget(null)
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Loading jobs...
      </div>
    )
  }

  if (error) {
    return <div className="p-6 text-center text-destructive">{error}</div>
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-muted-foreground">
        <Link
          href="/dashboard/recruiter"
          className="transition-colors hover:text-foreground"
        >
          Manage Jobs
        </Link>
        <span className="text-muted-foreground/60">›</span>
        <span className="text-foreground">Job Listings &amp; Postings</span>
      </nav>

      {/* Header */}
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Manage Job Posts
          </h1>
          <p className="text-sm text-muted-foreground">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/dashboard/recruiter/jobs/new" />}
        >
          <PlusIcon />
          New Job Post
        </Button>
      </header>

      {/* Jobs table (md and up) */}
      <section className="hidden overflow-x-auto rounded-xl border bg-card elevation-card md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className={TH}>Job Title &amp; Dept</th>
              <th className={TH}>Company &amp; Location</th>
              <th className={cn(TH, "hidden 2xl:table-cell")}>Type</th>
              <th className={cn(TH, "hidden xl:table-cell")}>Compensation</th>
              <th className={cn(TH, "hidden xl:table-cell")}>Applicants</th>
              <th className={TH}>Status</th>
              <th className={cn(TH, "hidden xl:table-cell")}>Deadline</th>
              <th className={cn(TH, "text-right")}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedJobs.map((job) => {
              const JobIcon = job.icon
              return (
                <tr key={job.id} className="border-b last:border-0">
                  {/* Job title & dept */}
                  <td className="px-3 py-3 2xl:px-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-lg",
                          job.iconTile
                        )}
                      >
                        <JobIcon className="size-4" />
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-foreground">
                          {job.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {job.department}
                        </span>
                      </div>
                    </div>
                  </td>
                  {/* Company & location */}
                  <td className="px-3 py-3 2xl:px-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-foreground">
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        {job.isRemote ? (
                          <GlobeIcon className="size-3" />
                        ) : (
                          <MapPinIcon className="size-3" />
                        )}
                        {job.location}
                      </span>
                    </div>
                  </td>
                  {/* Type */}
                  <td className="hidden px-3 py-3 2xl:table-cell 2xl:px-4">
                    <span className="inline-flex rounded-full border bg-muted/50 px-2.5 py-0.5 text-xs text-foreground">
                      {job.type}
                    </span>
                  </td>
                  {/* Compensation */}
                  <td className="hidden px-3 py-3 whitespace-nowrap text-muted-foreground xl:table-cell xl:px-4">
                    {job.compensation}
                  </td>
                  {/* Applicants */}
                  <td className="hidden px-3 py-3 whitespace-nowrap xl:table-cell xl:px-4">
                    <span className="flex items-center gap-1.5">
                      <UsersIcon className="size-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        {job.applicants}
                      </span>
                      <span className="text-muted-foreground">Candidates</span>
                    </span>
                  </td>
                  {/* Status */}
                  <td className="px-3 py-3 2xl:px-4">
                    <StatusBadge status={job.status} />
                  </td>
                  {/* Deadline */}
                  <td className="hidden px-3 py-3 whitespace-nowrap xl:table-cell xl:px-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-muted-foreground">
                        {job.deadline}
                      </span>
                      <span className="text-xs text-muted-foreground/70">
                        {job.deadlineNote}
                      </span>
                    </div>
                  </td>
                  {/* Actions */}
                  <td className="px-3 py-3 text-right 2xl:px-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <JobActions
                        job={job}
                        onDelete={() => setDeleteTarget(job)}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}

            {jobs.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  No job posts found. Create your first listing to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Pagination */}
      {jobs.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          {/* <p className="text-xs text-muted-foreground">
            Pages{" "}
            <span className="font-medium text-foreground">
              {(currentPage - 1) * PAGE_SIZE + 1}–
              {Math.min(currentPage * PAGE_SIZE, jobs.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">{jobs.length}</span>{" "} 
            jobs
          </p>  */}
          <Pagination className="sm:justify-end sm:mx-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                />
              </PaginationItem>
              {pageItems.map((item) => (
                <PaginationItem key={item}>
                  {item === "ellipsis-start" || item === "ellipsis-end" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      isActive={item === currentPage}
                      onClick={() => setPage(item)}
                      aria-label={`Go to page ${item}`}
                    >
                      {item}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  disabled={currentPage === totalPages}
                  onClick={() => setPage(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Jobs list (small screens) */}
      <section className="flex flex-col gap-3 md:hidden">
        {pagedJobs.map((job) => {
          const JobIcon = job.icon
          return (
            <article
              key={job.id}
              className="rounded-xl border bg-card p-4 elevation-card"
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg",
                    job.iconTile
                  )}
                >
                  <JobIcon className="size-4" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="font-medium text-foreground">
                    {job.title}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {job.department} · {job.company}
                  </span>
                </div>
                <StatusBadge status={job.status} />
              </div>

              <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                {job.isRemote ? (
                  <GlobeIcon className="size-3" />
                ) : (
                  <MapPinIcon className="size-3" />
                )}
                {job.location}
              </p>

              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[10px] tracking-wider text-muted-foreground/70 uppercase">
                    Type
                  </dt>
                  <dd className="text-foreground">{job.type}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[10px] tracking-wider text-muted-foreground/70 uppercase">
                    Compensation
                  </dt>
                  <dd className="text-muted-foreground">{job.compensation}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[10px] tracking-wider text-muted-foreground/70 uppercase">
                    Applicants
                  </dt>
                  <dd className="flex items-center gap-1.5 text-foreground">
                    <UsersIcon className="size-3.5 text-muted-foreground" />
                    {job.applicants} Candidates
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[10px] tracking-wider text-muted-foreground/70 uppercase">
                    Deadline
                  </dt>
                  <dd className="flex flex-col text-muted-foreground">
                    {job.deadline}
                    <span className="text-[10px] text-muted-foreground/70">
                      {job.deadlineNote}
                    </span>
                  </dd>
                </div>
              </dl>

              <div className="mt-4 border-t pt-3">
                <JobActions job={job} onDelete={() => setDeleteTarget(job)} />
              </div>
            </article>
          )
        })}

        {jobs.length === 0 && (
          <div className="rounded-xl border bg-card px-4 py-10 text-center text-sm text-muted-foreground elevation-card">
            No job posts found. Create your first listing to get started.
          </div>
        )}
      </section>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete job post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                {deleteTarget?.title}
              </span>
              ? This will permanently remove the listing and its{" "}
              {deleteTarget?.applicants} candidate application
              {deleteTarget?.applicants === 1 ? "" : "s"}. This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              <Trash2Icon />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
