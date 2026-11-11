"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import {
    ArrowRight,
    BuildingIcon,
    CalendarIcon,
    ChevronRightIcon,
    GlobeIcon,
    MapPinIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { createJob } from "@/lib/actions/jobs"

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]

const CATEGORIES = [
    "Engineering & Tech",
    "Design & Creative",
    "Marketing",
    "Sales",
    "Support",
    "Operations",
]

const SALARY_FREQUENCIES = [
    "per hour",
    "per day",
    "per week",
    "per month",
    "per project",
]

export default function NewJobPage() {
    const router = useRouter()

    const [jobTitle, setJobTitle] = useState("Frontend Developer")
    const [companyName, setCompanyName] = useState("HirePulse Network")
    const [jobCategory, setJobCategory] = useState(CATEGORIES[0])
    const [jobType, setJobType] = useState("Full-time")

    const [remoteAllowed, setRemoteAllowed] = useState(false)
    const [location, setLocation] = useState("New York, USA")
    const [deadline, setDeadline] = useState("2025-05-30")
    const [minSalary, setMinSalary] = useState("25")
    const [maxSalary, setMaxSalary] = useState("40")
    const [frequency, setFrequency] = useState("per hour")

    const [responsibilities, setResponsibilities] = useState(
        "Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
    )
    const [qualifications, setQualifications] = useState(
        "• 5+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers"
    )

    const handlePublish = async () => {
        const payload = {
            jobTitle,
            companyName,
            jobCategory,
            jobType,
            remoteAllowed,
            location,
            deadline,
            salary: { min: minSalary, max: maxSalary, frequency },
            responsibilities,
            qualifications,
        }
        console.info("Publishing job:", payload)
        // TODO: POST to the jobs API once the backend endpoint is available

        const result = await createJob(payload)

        console.log("Job created:", result)

        router.push("/dashboard/recruiter/jobs")
    }

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 sm:p-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 text-xs text-muted-foreground">
                <a
                    href="/dashboard/recruiter/jobs"
                    className="transition-colors hover:text-foreground"
                >
                    Manage Jobs
                </a>
                <ChevronRightIcon className="size-3" />
                <span className="text-foreground">Create New Listing</span>
            </nav>

            {/* Header */}
            <header className="flex flex-col justify-between  gap-3 sm:flex-row sm:items-start">
                <div className="flex flex-col gap-1">
                    <h1 className="font-heading text-2xl font-bold text-foreground">
                        Post a New Job
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Fill in the position specifications to attract qualified talent
                        across our network.
                    </p>
                </div>
            </header>

            {/* 1. Basic Information */}
            <section className="flex flex-col gap-5 rounded-xl border bg-card p-5 elevation-card sm:p-6">
                <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-foreground">
                    <span className="size-2 rounded-full bg-violet-500" />
                    1. Basic Information
                </h2>

                <div className="flex flex-col gap-2">
                    <FieldLabel required>Job Title</FieldLabel>
                    <Input
                        // value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g. Frontend Developer"
                        className="h-10"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <FieldLabel required>Company Name</FieldLabel>
                        <div className="relative">
                            <Input
                                // value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="Your company name"
                                className="h-10 pl-9"
                            />
                            <BuildingIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <FieldLabel required>Job Category</FieldLabel>
                        <Select
                            value={jobCategory}
                            onValueChange={(value) => setJobCategory(value ?? CATEGORIES[0])}
                        >
                            <SelectTrigger className="h-10 w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {CATEGORIES.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <FieldLabel required>Job Type</FieldLabel>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {JOB_TYPES.map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setJobType(type)}
                                aria-pressed={jobType === type}
                                className={cn(
                                    "flex h-10 items-center cursor-pointer justify-center rounded-lg border text-sm font-medium transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                                    jobType === type
                                        ? "border-primary bg-primary/10 text-foreground"
                                        : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
                                )}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. Location, Compensation & Timeline */}
            <section className="flex flex-col gap-5 rounded-xl border bg-card p-5 elevation-card sm:p-6">
                <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-foreground">
                    <span className="size-2 rounded-full bg-orange-500" />
                    2. Location, Compensation &amp; Timeline
                </h2>

                {/* Remote work toggle */}
                <div className="flex items-center justify-between gap-3 rounded-lg border bg-background p-3 dark:bg-input/30">
                    <div className="flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                            <GlobeIcon className="size-4 text-muted-foreground" />
                        </span>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-medium text-foreground">
                                Remote Work Allowed (IsRemote)
                            </span>
                            <span className="text-xs text-muted-foreground">
                                Enable worldwide or distributed candidate applications
                            </span>
                        </div>
                    </div>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={remoteAllowed}
                        aria-label="Remote work allowed"
                        onClick={() => setRemoteAllowed((prev) => !prev)}
                        className={cn(
                            "relative h-6 w-11 shrink-0 rounded-full transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                            remoteAllowed ? "bg-primary" : "bg-muted-foreground/30"
                        )}
                    >
                        <span
                            className={cn(
                                "absolute top-0.5 left-0.5 size-5 rounded-full bg-card shadow-sm transition-transform",
                                remoteAllowed && "translate-x-5"
                            )}
                        />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-baseline justify-between">
                            <FieldLabel>Job Location (location)</FieldLabel>
                            <span className="text-[0.7rem] text-muted-foreground">
                                Required
                            </span>
                        </div>
                        <div className="relative">
                            <Input
                                // value={location}
                                placeholder="e.g.New York, USA"
                                onChange={(e) => setLocation(e.target.value)}
                                className="h-10 pl-9"
                            />
                            <MapPinIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <FieldLabel>Application Deadline (deadline)</FieldLabel>
                        <div className="relative">
                            <Input
                                type="date"
                                // value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="h-10 pl-9"
                            />
                            <CalendarIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="flex flex-col gap-2">
                        <FieldLabel>Min Salary / Rate</FieldLabel>
                        <div className="relative">
                            <Input
                                type="number"
                                // value={minSalary}
                                placeholder="20"
                                onChange={(e) => setMinSalary(e.target.value)}
                                className="h-10 pl-8"
                            />
                            <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-sm text-muted-foreground">
                                $
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <FieldLabel>Max Salary / Rate</FieldLabel>
                        <div className="relative">
                            <Input
                                type="number"
                                // value={maxSalary}
                                placeholder="25"
                                onChange={(e) => setMaxSalary(e.target.value)}
                                className="h-10 pl-8"
                            />
                            <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-sm text-muted-foreground">
                                $
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <FieldLabel>Frequency</FieldLabel>
                        <Select
                            value={frequency}
                            onValueChange={(value) => setFrequency(value ?? "per hour")}
                        >
                            <SelectTrigger className="h-10 w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {SALARY_FREQUENCIES.map((freq) => (
                                    <SelectItem key={freq} value={freq}>
                                        {freq}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            {/* 3. Responsibilities & Requirements */}
            <section className="flex flex-col gap-5 rounded-xl border bg-card p-5 elevation-card sm:p-6">
                <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-foreground">
                    <span className="size-2 rounded-full bg-pink-500" />
                    3. Responsibilities &amp; Requirements
                </h2>

                <div className="flex flex-col gap-2">
                    <FieldLabel required>Key Responsibilities</FieldLabel>
                    <Textarea
                        rows={4}
                        // value={responsibilities}
                        placeholder="Describe the key responsibilities of the role..."
                        onChange={(e) => setResponsibilities(e.target.value)}
                        className="min-h-24"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <FieldLabel required>Qualifications &amp; Requirements</FieldLabel>
                    <Textarea
                        rows={4}
                        // value={qualifications}
                        placeholder="• 5+ years of experience with..."

                        onChange={(e) => setQualifications(e.target.value)}
                        className="min-h-24"
                    />
                </div>
                <section>
                    <Button onClick={handlePublish} className="shrink-0 cursor-pointer">
                        Publish Job
                        <ArrowRight data-icon="inline-end" />
                    </Button>
                </section>
            </section>
        </div>
    )
}

function FieldLabel({
    children,
    required,
    className,
}: {
    children: React.ReactNode
    required?: boolean
    className?: string
}) {
    return (
        <Label className={cn("text-xs font-medium text-foreground", className)}>
            {children}
            {required && <span className="text-violet-500"> *</span>}
        </Label>
    )
}
