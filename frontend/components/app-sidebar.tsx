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
        url: "/organizations",
        icon: <Building2Icon />,
        items: [
          {
            title: "Organization",
            url: "/organizations",
            allowedRoles: [Role.OWNER, Role.ADMIN, Role.OPERATOR],
          },
          {
            title: "Organization Members",
            url: "/organization-members",
            allowedRoles: [Role.ADMIN],
          },
          {
            title: "Committees",
            url: "/committees",
            allowedRoles: [Role.ADMIN, Role.OPERATOR],
          },
          {
            title: "Sub Committees",
            url: "/sub-committees",
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
            url: "/income",
            allowedRoles: [Role.ADMIN, Role.OPERATOR],
          },
          {
            title: "Expenses",
            url: "/expenses",
            allowedRoles: [Role.ADMIN, Role.OPERATOR],
          },
          {
            title: "Categories",
            url: "/categories",
            allowedRoles: [Role.ADMIN],
          },
          {
            title: "Receipt Books",
            url: "/receipt-books",
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
            url: "/users",
            allowedRoles: [Role.OWNER, Role.ADMIN],
          },
          {
            title: "Roles & Permissions",
            url: "/roles",
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
            url: "/activity-logs",
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
            url: "/settings/profile",
            allowedRoles: [Role.ADMIN, Role.OPERATOR],
          },
          {
            title: "Organization Settings",
            url: "/settings/organization",
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
