import { Role } from "@/features/rbac/rbac.constants";
import { SidebarItems } from "./types";

export default function getFilteredItemsByRole(
  items: SidebarItems[],
  userRole: Role,
): SidebarItems[] {
  const sidebarItems = items.reduce(
    (accumulator: SidebarItems[], currentItem) => {
      const navLinks = currentItem.items;
      const filteredNavLinks = navLinks.filter((link) =>
        link.allowedRoles.includes(userRole),
      );

      accumulator.push({
        ...currentItem,
        items: filteredNavLinks,
      });

      return accumulator;
    },
    [],
  );

  return sidebarItems;
}
