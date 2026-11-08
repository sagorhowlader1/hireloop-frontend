import { Bookmark, Briefcase, Calendar, CheckCircle2 } from "lucide-react"

const STATS = [
  { label: "Saved Jobs", value: "24", icon: Bookmark },
  { label: "Applications Submitted", value: "12", icon: Briefcase },
  { label: "Interviews Scheduled", value: "3", icon: Calendar },
  { label: "Offers Received", value: "1", icon: CheckCircle2 },
]

const ACTIVITY = [
  {
    id: "1",
    title: "Applied to Senior Product Designer",
    company: "TechFlow",
    time: "2 hours ago",
  },
  {
    id: "2",
    title: "Saved Frontend Engineer",
    company: "Vercel",
    time: "Yesterday",
  },
  {
    id: "3",
    title: "Interview scheduled with Linear",
    company: "Linear",
    time: "3 days ago",
  },
]

export default function SeekerDashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      {/* Stats row */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-2 rounded-xl border bg-card p-4 elevation-card"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <stat.icon className="size-4" />
              <span className="text-xs font-medium">{stat.label}</span>
            </div>
            <span className="font-heading text-2xl font-bold text-foreground">
              {stat.value}
            </span>
          </div>
        ))}
      </section>

      {/* Recent activity */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Recent Activity
          </h2>
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View All Activity
          </a>
        </div>
        <ul className="flex flex-col gap-2">
          {ACTIVITY.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-xl border bg-card p-4"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">
                  {item.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.company}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
