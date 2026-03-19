import * as React from "react"

import { NavMain } from "@/components/layouts/nav-main"
import { NavSecondary } from "@/components/layouts/nav-secondary"
import { NavUser } from "@/components/common/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  UsersIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
  Book,
  BanknoteArrowDown,
  BanknoteArrowUp,
  NotebookTabs,
  Building2,
} from "lucide-react"
import { Link } from "react-router-dom"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
      roles: ["OWNER", "ADMIN", "OPERATOR"],
    },
    {
      title: "Organization",
      url: "/dashboard/organization",
      icon: <Building2 />,
      roles: ["OWNER", "ADMIN", "OPERATOR"],
    },
    {
      title: "Committee",
      url: "/dashboard/committee",
      icon: <NotebookTabs />,
      roles: ["ADMIN", "OPERATOR"],
    },
    {
      title: "Income",
      url: "/dashboard/income",
      icon: <BanknoteArrowUp />,
      roles: ["ADMIN", "OPERATOR"],
    },
    {
      title: "Expense",
      url: "/dashboard/expense",
      icon: <BanknoteArrowDown />,
      roles: ["ADMIN", "OPERATOR"],
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: <UsersIcon />,
      roles: ["ADMIN", "OWNER"],
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Search",
      url: "#",
      icon: <SearchIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to="/dashboard">
                <Book className="size-5!" />
                <span className="text-base font-semibold">Samiti Khata</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
