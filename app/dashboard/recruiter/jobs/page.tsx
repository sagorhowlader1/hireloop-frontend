"use client"

import Link from "next/link"
import { useState } from "react"
import {
  BugIcon,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

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

const INITIAL_JOBS: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    department: "Engineering",
    icon: CodeIcon,
    iconTile: "bg-blue-500/15 text-blue-500",
    company: "HirePulse Network",
    location: "Remote: New York, USA",
    isRemote: true,
    type: "Full-time",
    compensation: "€25 – €40 / hr",
    applicants: 34,
    status: "Active",
    deadline: "May 30, 2025",
    deadlineNote: "Posted 4d ago",
  },
  {
    id: "2",
    title: "Senior Product Designer",
    department: "Design",
    icon: PenToolIcon,
    iconTile: "bg-orange-500/15 text-orange-500",
    company: "HirePulse Labs",
    location: "London, UK (Hybrid)",
    isRemote: false,
    type: "Full-time",
    compensation: "€90k – €115k / yr",
    applicants: 19,
    status: "Active",
    deadline: "Jun 14, 2025",
    deadlineNote: "Posted 1w ago",
  },
  {
    id: "3",
    title: "DevOps Specialist",
    department: "Infrastructure",
    icon: TerminalIcon,
    iconTile: "bg-cyan-500/15 text-cyan-500",
    company: "HirePulse Platform",
    location: "Berlin, Germany",
    isRemote: false,
    type: "Full-time",
    compensation: "€95k – €120k / yr",
    applicants: 12,
    status: "Active",
    deadline: "Jun 30, 2025",
    deadlineNote: "Posted 3d ago",
  },
  {
    id: "4",
    title: "Product Marketing Lead",
    department: "Marketing",
    icon: MegaphoneIcon,
    iconTile: "bg-violet-500/15 text-violet-500",
    company: "HirePulse Network",
    location: "Remote (EU/US)",
    isRemote: true,
    type: "Full-time",
    compensation: "€80k – €105k / yr",
    applicants: 27,
    status: "Active",
    deadline: "Jul 15, 2025",
    deadlineNote: "Posted 1w ago",
  },
  {
    id: "5",
    title: "QA Automation Engineer",
    department: "Quality",
    icon: BugIcon,
    iconTile: "bg-emerald-500/15 text-emerald-500",
    company: "HirePulse Platform",
    location: "Dublin, Ireland (Hybrid)",
    isRemote: false,
    type: "Part-time",
    compensation: "€35 – €50 / hr",
    applicants: 8,
    status: "Expired",
    deadline: "May 01, 2025",
    deadlineNote: "Closed",
  },
]

const TH =
  "px-4 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase whitespace-nowrap"

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS)
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null)

  const handleDelete = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id))
  }

  const handleConfirmDelete = () => {
    if (deleteTarget) handleDelete(deleteTarget.id)
    setDeleteTarget(null)
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

      {/* Jobs table */}
      <section className="overflow-x-auto rounded-xl border bg-card elevation-card">
        <table className="w-full min-w-4xl text-sm">
          <thead>
            <tr className="border-b">
              <th className={TH}>Job Title &amp; Dept</th>
              <th className={TH}>Company &amp; Location</th>
              <th className={TH}>Type</th>
              <th className={TH}>Compensation</th>
              <th className={TH}>Applicants</th>
              <th className={TH}>Status</th>
              <th className={TH}>Deadline</th>
              <th className={cn(TH, "text-right")}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              const JobIcon = job.icon
              return (
                <tr key={job.id} className="border-b last:border-0">
                  {/* Job title & dept */}
                  <td className="px-4 py-3">
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
                  <td className="px-4 py-3">
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
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full border bg-muted/50 px-2.5 py-0.5 text-xs text-foreground">
                      {job.type}
                    </span>
                  </td>

                  {/* Compensation */}
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    {job.compensation}
                  </td>

                  {/* Applicants */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="flex items-center gap-1.5">
                      <UsersIcon className="size-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        {job.applicants}
                      </span>
                      <span className="text-muted-foreground">Candidates</span>
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                        job.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          job.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-muted-foreground/60"
                        )}
                      />
                      {job.status}
                    </span>
                  </td>

                  {/* Deadline */}
                  <td className="px-4 py-3 whitespace-nowrap">
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
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
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
                        onClick={() => setDeleteTarget(job)}
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
