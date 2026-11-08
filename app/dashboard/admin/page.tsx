import { Download } from "lucide-react"

const STATS = [
  { label: "Total Users", value: "12,847" },
  { label: "Total Recruiters", value: "1,204" },
  { label: "Total Companies", value: "842" },
  { label: "Jobs Posted", value: "3,619" },
  { label: "Platform Revenue", value: "$48.2K" },
]

const TRANSACTIONS = [
  {
    id: "TRX-220199-HL",
    user: "Creative Studio",
    plan: "Enterprise Monthly",
    amount: "$299.00",
    date: "Oct 12, 2024",
    status: "Success",
  },
  {
    id: "TRX-220198-HL",
    user: "Independent",
    plan: "Professional Annual",
    amount: "$1,188.00",
    date: "Oct 11, 2024",
    status: "Success",
  },
  {
    id: "TRX-220197-HL",
    user: "Retail Global",
    plan: "Starter Monthly",
    amount: "$29.00",
    date: "Oct 10, 2024",
    status: "Pending",
  },
  {
    id: "TRX-220196-HL",
    user: "TechFlow Inc",
    plan: "Enterprise Monthly",
    amount: "$299.00",
    date: "Oct 9, 2024",
    status: "Failed",
  },
]

const statusColor: Record<string, string> = {
  Success: "text-primary",
  Pending: "text-muted-foreground",
  Failed: "text-destructive",
}

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      {/* Header */}
      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-sm text-muted-foreground">
            Platform metrics for the last 30 days.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Last 30 Days
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Download className="size-4" />
            Export Report
          </button>
        </div>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-2 rounded-xl border bg-card p-4 elevation-card"
          >
            <span className="text-xs font-medium text-muted-foreground">
              {stat.label}
            </span>
            <span className="font-heading text-xl font-bold text-foreground">
              {stat.value}
            </span>
          </div>
        ))}
      </section>

      {/* Recent subscription transactions */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Recent Subscription Transactions
          </h2>
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View All Activity
          </a>
        </div>
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">USER/RECRUITER</th>
                <th className="px-4 py-3 font-medium">PLAN TYPE</th>
                <th className="px-4 py-3 font-medium">TRANSACTION ID</th>
                <th className="px-4 py-3 font-medium">AMOUNT</th>
                <th className="px-4 py-3 font-medium">DATE</th>
                <th className="px-4 py-3 font-medium">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {tx.user}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{tx.plan}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {tx.id}
                  </td>
                  <td className="px-4 py-3 text-foreground">{tx.amount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{tx.date}</td>
                  <td
                    className={`px-4 py-3 font-medium ${statusColor[tx.status] ?? "text-muted-foreground"}`}
                  >
                    {tx.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
