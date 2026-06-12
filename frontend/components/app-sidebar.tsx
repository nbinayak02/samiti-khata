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

// This is sample data.
const data = {
  user: {
    name: "User Name",
    email: "user@example.com",
    avatar: "/avatars/shadcn.jpg",
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
          title: "My Organization",
          url: "/organizations",
          allowedRoles: [Role.OWNER, Role.ADMIN],
        },
        {
          title: "Organization Members",
          url: "/organization-members",
          allowedRoles: [Role.OWNER, Role.ADMIN],
        },
        {
          title: "Committees",
          url: "/committees",
          allowedRoles: [Role.OWNER, Role.ADMIN, Role.OPERATOR],
        },
        {
          title: "Sub Committees",
          url: "/sub-committees",
          allowedRoles: [Role.OWNER, Role.ADMIN, Role.OPERATOR],
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
          allowedRoles: [Role.OWNER, Role.ADMIN, Role.OPERATOR],
        },
        {
          title: "Expenses",
          url: "/expenses",
          allowedRoles: [Role.OWNER, Role.ADMIN, Role.OPERATOR],
        },
        {
          title: "Categories",
          url: "/categories",
          allowedRoles: [Role.OWNER, Role.ADMIN],
        },
        {
          title: "Receipt Books",
          url: "/receipt-books",
          allowedRoles: [Role.OWNER, Role.ADMIN, Role.OPERATOR],
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
          allowedRoles: [Role.OWNER, Role.ADMIN],
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
          allowedRoles: [Role.OWNER, Role.ADMIN, Role.OPERATOR],
        },
        {
          title: "Organization Settings",
          url: "/settings/organization",
          allowedRoles: [Role.OWNER, Role.ADMIN],
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: <FrameIcon />,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: <PieChartIcon />,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: <MapIcon />,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
