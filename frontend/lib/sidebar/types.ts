import { Role } from "@/features/rbac/rbac.constants";
import { LucideIcon } from "lucide-react";

export type SidebarItems = {
  title: string;
  url: string;
  items: {
    icon: LucideIcon;
    title: string;
    url: string;
    allowedRoles: Role[];
  }[];
};
