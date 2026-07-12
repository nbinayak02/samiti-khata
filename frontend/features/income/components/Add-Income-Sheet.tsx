"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AddIncomeForm from "./Add-Income-Form";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AddIncomeSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <PlusCircle />
          Add New Income
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full min-w-150 flex flex-col">
        <SheetHeader>
          <SheetTitle>Add New Income</SheetTitle>
          <SheetDescription>
            Record income details. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <ScrollArea className="flex-1 min-h-0">
          <AddIncomeForm />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
