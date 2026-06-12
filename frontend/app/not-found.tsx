import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-destructive text-center">404 | Not Found</CardTitle>
        <CardDescription>
          The requested resource is not found on the server.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
