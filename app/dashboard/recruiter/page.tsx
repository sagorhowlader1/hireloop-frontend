import { Plus } from "lucide-react"

const STATS = [
  { label: "Total Job Posts", value: "24" },
  { label: "Total Applicants", value: "186" },
  { label: "Active Jobs", value: "12" },
  { label: "Jobs Closed", value: "8" },
]

const APPLICATIONS = [
  {
    id: "1",
    candidate: "Julianne Moore",
    role: "Senior Product Designer",
    date: "Oct 12, 2024",
    experience: "6 yrs",
    status: "Interviewing",
  },
  {
    id: "2",
    candidate: "Robert Downey",
    role: "Backend Engineer",
    date: "Oct 11, 2024",
    experience: "4 yrs",
    status: "Reviewing",
  },
  {
    id: "3",
    candidate: "Emma Stone",
    role: "Marketing Lead",
    date: "Oct 10, 2024",
    experience: "5 yrs",
    status: "Reviewing",
  },
  {
    id: "4",
    candidate: "Chris Pratt",
    role: "Product Manager",
    date: "Oct 8, 2024",
    experience: "7 yrs",
    status: "Rejected",
  },
]

const statusColor: Record<string, string> = {
  Interviewing: "text-primary",
  Reviewing: "text-muted-foreground",
  Rejected: "text-destructive",
}

export default function RecruiterDashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      {/* Welcome header */}
      <section className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Welcome back, Alex
        </h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening with your job posts today.
        </p>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-2 rounded-xl border bg-card p-4 elevation-card"
          >
            <span className="text-xs font-medium text-muted-foreground">
              {stat.label}
            </span>
            <span className="font-heading text-2xl font-bold text-foreground">
              {stat.value}
            </span>
          </div>
        ))}
      </section>

      {/* Recent applications */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Recent Applications
          </h2>
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
          </a>
        </div>
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">Candidate Name</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Date Applied</th>
                <th className="px-4 py-3 font-medium">Experience</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {APPLICATIONS.map((app) => (
                <tr key={app.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {app.candidate}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {app.role}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {app.date}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {app.experience}
                  </td>
                  <td
                    className={`px-4 py-3 font-medium ${statusColor[app.status] ?? "text-muted-foreground"}`}
                  >
                    {app.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAB */}
      <a
        href="#"
        className="fixed right-6 bottom-6 flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105 sm:right-8 sm:bottom-8"
      >
        <Plus className="size-4" />
        Create Job Post
      </a>
    </div>
  )
}
