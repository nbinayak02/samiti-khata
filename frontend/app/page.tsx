"use client";
import { ModeToggle } from "@/components/mode-toogler";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleBtnClick = () => {
    router.push("/dashboard");
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Continue to Dashboard</CardTitle>
        <CardDescription>
          You will be redirected to login if not logged in already.
        </CardDescription>
        <CardAction>
          <ModeToggle />
        </CardAction>
      </CardHeader>
      <CardFooter className="flex flex-row justify-end">
        <Button onClick={handleBtnClick}>Continue</Button>
      </CardFooter>
    </Card>
  );
}
