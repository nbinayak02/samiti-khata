import { Role } from "@/features/rbac/rbac.constants";
import {
  Book,
  Building2,
  CircleArrowDown,
  CircleArrowUp,
  Cog,
  GitBranch,
  LayoutDashboard,
  List,
  Logs,
  Search,
  UserCog,
  Users,
} from "lucide-react";
import { SidebarItems } from "./types";

export const sidebarNavItems: SidebarItems[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    items: [
      {
        icon: LayoutDashboard,
        title: "Overview",
        url: "/dashboard",
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
      },
    ],
  },

  {
    title: "Transactions",
    url: "/transactions",
    items: [
      {
        icon: CircleArrowDown,
        title: "Income",
        url: "/income",
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
      },
      {
        icon: CircleArrowUp,
        title: "Expenses",
        url: "/expenses",
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
      },
    ],
  },

  {
    title: "Reports",
    url: "/reports",
    items: [
      {
        icon: Search,
        title: "Search Records",
        url: "/reports",
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
      },
    ],
  },

  {
    title: "Receipt Management",
    url: "/receipt-management",
    items: [
      {
        icon: Book,
        title: "Receipt Books",
        url: "/receipt-books",
        allowedRoles: [Role.ADMIN],
      },
    ],
  },

  {
    title: "Organization",
    url: "/organization",
    items: [
      {
        icon: Building2,
        title: "Committees",
        url: "/committees",
        allowedRoles: [Role.ADMIN],
      },
      {
        icon: GitBranch,
        title: "Sub Committees",
        url: "/sub-committees",
        allowedRoles: [Role.ADMIN],
      },
      {
        icon: List,
        title: "Expense Categories",
        url: "/expense-categories",
        allowedRoles: [Role.ADMIN],
      },
    ],
  },

  {
    title: "Users",
    url: "/users",
    items: [
      {
        icon: Users,
        title: "Users",
        url: "/users",
        allowedRoles: [Role.ADMIN],
      },
    ],
  },

  {
    title: "Audit",
    url: "/audit",
    items: [
      {
        icon: Logs,
        title: "Activity Logs",
        url: "/activity-logs",
        allowedRoles: [Role.ADMIN],
      },
    ],
  },

  {
    title: "Settings",
    url: "/settings",
    items: [
      {
        icon: UserCog,
        title: "Profile",
        url: "/profile",
        allowedRoles: [Role.ADMIN, Role.OPERATOR],
      },
      {
        icon: Cog,
        title: "Organization",
        url: "/organization-settings",
        allowedRoles: [Role.ADMIN],
      },
    ],
  },
];
