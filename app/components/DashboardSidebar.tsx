"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import {
  Bookmark,
  Briefcase,
  Building,
  CreditCard,
  DollarSign,
  FileText,
  Home,
  LayoutDashboard,
  ListChecks,
  PlusCircle,
  Settings,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

type Role = "seeker" | "recruiter" | "admin"

type MenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

const menuItemsByRole: Record<Role, MenuItem[]> = {
  seeker: [
    {
      id: "seeker-home",
      name: "Home",
      url: "/",
      icon: Home,
    },
    {
      id: "seeker-dashboard",
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "seeker-jobs",
      name: "Jobs",
      url: "/dashboard/seeker/jobs",
      icon: Briefcase,
    },
    {
      id: "seeker-saved-jobs",
      name: "Saved Jobs",
      url: "/dashboard/seeker/saved-jobs",
      icon: Bookmark,
    },
    {
      id: "seeker-applications",
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    {
      id: "seeker-billing",
      name: "Billing",
      url: "/dashboard/seeker/billing",
      icon: CreditCard,
    },
    {
      id: "seeker-settings",
      name: "Settings",
      url: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ],
  recruiter: [
    {
      id: "recruiter-home",
      name: "Home",
      url: "/",
      icon: Home,
    },
    {
      id: "recruiter-dashboard",
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "recruiter-company",
      name: "My Company",
      url: "/dashboard/recruiter/company",
      icon: Building,
    },
    {
      id: "recruiter-manage-jobs",
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: ListChecks,
    },
    {
      id: "recruiter-add-job",
      name: "Add Job",
      url: "/dashboard/recruiter/jobs/new",
      icon: PlusCircle,
    },
    {
      id: "recruiter-applications",
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    {
      id: "recruiter-settings",
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],
  admin: [
    {
      id: "admin-home",
      name: "Home",
      url: "/",
      icon: Home,
    },
    {
      id: "admin-dashboard",
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "admin-users",
      name: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "admin-companies",
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building,
    },
    {
      id: "admin-jobs",
      name: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: Briefcase,
    },
    {
      id: "admin-payments",
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: DollarSign,
    },
    {
      id: "admin-settings",
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
}

export function DashboardSidebar() {
  const { data: session } = useSession()
  const role = (session?.user?.role as Role) || "seeker"
  const items = menuItemsByRole[role] ?? menuItemsByRole.seeker
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton render={<Link href={item.url} />}>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
