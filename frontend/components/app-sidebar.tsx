"use client";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { AppLogo } from "@/components/app-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Building2Icon,
  ShieldCheckIcon,
  WalletIcon,
  ClipboardListIcon,
  SettingsIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import { Role } from "@/features/rbac/rbac.constants";
import { User } from "@/features/auth/types";

export function AppSidebar({ user }: { user: User }) {
  const data = {
    user: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },

    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: <LayoutDashboardIcon />,
        isActive: true,
        items: [
          {
            title: "Overview",
            url: "/dashboard",
            allowedRoles: [Role.OWNER, Role.ADMIN, Role.OPERATOR],
          },
        ],
      },

      {
        title: "Organization",
        url: "/dashboard/organizations",
        icon: <Building2Icon />,
        items: [
          {
            title: "Organization",
            url: "/dashboard/organizations",
            allowedRoles: [Role.OWNER, Role.ADMIN, Role.OPERATOR],
          },
          {
            title: "Organization Members",
            url: "/dashboard/organization-members",
            allowedRoles: [Role.ADMIN],
          },
          {
            title: "Committees",
            url: "/dashboard/committees",
            allowedRoles: [Role.ADMIN, Role.OPERATOR],
          },
          {
            title: "Sub Committees",
            url: "/dashboard/sub-committees",
            allowedRoles: [Role.ADMIN, Role.OPERATOR],
          },
        ],
      },

      {
        title: "Finance",
        url: "#",
        icon: <WalletIcon />,
        items: [
          {
            title: "Income",
            url: "/dashboard/income",
            allowedRoles: [Role.ADMIN, Role.OPERATOR],
          },
          {
            title: "Expenses",
            url: "/dashboard/expenses",
            allowedRoles: [Role.ADMIN, Role.OPERATOR],
          },
          {
            title: "Categories",
            url: "/dashboard/categories",
            allowedRoles: [Role.ADMIN],
          },
          {
            title: "Receipt Books",
            url: "/dashboard/receipt-books",
            allowedRoles: [Role.ADMIN, Role.OPERATOR],
          },
        ],
      },

      {
        title: "Access Control",
        url: "#",
        icon: <ShieldCheckIcon />,
        items: [
          {
            title: "Users",
            url: "/dashboard/users",
            allowedRoles: [Role.OWNER, Role.ADMIN],
          },
          {
            title: "Roles & Permissions",
            url: "/dashboard/roles",
            allowedRoles: [Role.OWNER],
          },
        ],
      },

      {
        title: "Audit",
        url: "#",
        icon: <ClipboardListIcon />,
        items: [
          {
            title: "Activity Logs",
            url: "/dashboard/activity-logs",
            allowedRoles: [Role.ADMIN],
          },
        ],
      },

      {
        title: "Settings",
        url: "#",
        icon: <SettingsIcon />,
        items: [
          {
            title: "Profile",
            url: "/dashboard/settings/profile",
            allowedRoles: [Role.ADMIN, Role.OPERATOR],
          },
          {
            title: "Organization Settings",
            url: "/dashboard/settings/organization",
            allowedRoles: [Role.ADMIN],
          },
        ],
      },
    ],
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <AppLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} userRole={user.role as Role} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
