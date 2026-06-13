import { Role } from "@/features/rbac/rbac.constants";

export type SidebarItems = {
  title: string;
  url: string;
  icon: React.ReactNode;
  isActive?: boolean;
  items: {
    title: string;
    url: string;
    allowedRoles: Role[];
  }[];
};
