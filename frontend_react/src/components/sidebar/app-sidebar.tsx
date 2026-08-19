import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Book } from "lucide-react";
import { sidebarNavItems } from "@/constants/sidebarItems";
import { Link } from "@tanstack/react-router";
import IconRenderer from "../shared/Icon-Renderer";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={
                <Link to="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Book className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">Samiti Khata</span>
                    <span className="">v2.0.0</span>
                  </div>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarNavItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<Link to={item.url} className="font-medium" />}
                >
                  {item.title}
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton render={<Link to={item.url} />}>
                          <IconRenderer Icon={item.icon} />
                          {item.title}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
