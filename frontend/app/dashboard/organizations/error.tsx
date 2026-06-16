"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function Error({ error, retry }: ErrorProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-destructive text-center">
          Failed to load resource.
        </CardTitle>
        <CardDescription className="text-center">
          {error.message}
        </CardDescription>
        <CardAction>
          <Button onClick={retry}>Retry</Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
