import DashboardLayout from "@/components/shared/DashboardLayout";
import { toast } from "@/components/ui/toast";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard")({
  component: DashboardLayout,
  beforeLoad: ({ context: { auth } }) => {
    if (!auth?.user && !auth.isPending) {
      toast.add({
        description: "Please login to continue.",
        
      });
      throw redirect({
        to: "/login",
      });
    }
  },
});
