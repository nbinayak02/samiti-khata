import DashboardLayout from "@/components/shared/DashboardLayout";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_dashboard")({
  component: DashboardLayout,
  beforeLoad: ({ context: { auth } }) => {
    if (!auth?.user && !auth.isPending) {
      toast.error("Please login to continue.");
      throw redirect({
        to: "/login",
      });
    }
  },
});
