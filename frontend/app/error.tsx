'use client'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-destructive text-center">
          Unwanted Error Occured
        </CardTitle>
        <CardDescription className="text-center">
          Something went wrong on the server. Please report the error and try
          again later!
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
