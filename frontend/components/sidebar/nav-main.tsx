"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Role } from "@/features/rbac/rbac.constants";
import getFilteredItemsByRole from "@/lib/sidebar/getFilteredItems";
import { SidebarItems } from "@/lib/sidebar/types";
import Link from "next/link";

export function NavMain({
  items,
  userRole,
}: {
  items: SidebarItems[];
  userRole: Role;
}) {
  const filteredItems = getFilteredItemsByRole(items, userRole);
  return (
    <SidebarGroup>
      <SidebarMenu>
        {filteredItems.map((item) => (
          <SidebarMenuItem key={item.title} className="space-y-5">
            <SidebarMenuButton asChild>
              <Link href={item.url}>{item.title}</Link>
            </SidebarMenuButton>
            <SidebarMenuSub>
              {item.items?.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton asChild>
                    <Link href={subItem.url}>
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
