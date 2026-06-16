import { ReactNode } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function StatsCard({
  title,
  stats,
  subTitle,
  // icon,
}: {
  title: string;
  stats: number;
  subTitle: string;
  // icon: ReactNode;
}) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {/* <CardAction>{icon}</CardAction> */}
      </CardHeader>
      <CardContent className="text-2xl font-bold">{stats}</CardContent>
      <CardFooter>{subTitle}</CardFooter>
    </Card>
  );
}
