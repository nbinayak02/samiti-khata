import ComponentErrorBoundary from "@/components/error-boundary";
import PageHeader from "@/components/pages/page-header";
import PageLayout from "@/components/pages/page-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUser } from "@/features/users/api/user.server.api";
import AddUserDialog from "@/features/users/components/add-user-dialog";
import UserTable from "@/features/users/components/user-table";
import { getQueryClient } from "@/lib/query/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: () => getUser({ pageIndex: 0, pageSize: 10 }),
  });

  return (
    <PageLayout>
      {/* header  */}
      <div className="flex flex-row justify-between items-center">
        <PageHeader title="Users" description="Manage users." />
        <AddUserDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Users</CardTitle>
          <CardDescription>Users registerd in SamitiKhata</CardDescription>
        </CardHeader>
        <CardContent>
          <ComponentErrorBoundary>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <UserTable />
            </HydrationBoundary>
          </ComponentErrorBoundary>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
