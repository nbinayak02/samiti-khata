"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddReceiptForm from "./Add-Receipt-Form";

export function AddReceiptSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <PlusCircle />
          Add New Receipt
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full min-w-150 flex flex-col">
        <SheetHeader>
          <SheetTitle>Add New Receipt</SheetTitle>
          <SheetDescription>
            Record receipt details. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <ScrollArea className="flex-1 min-h-0">
          <AddReceiptForm />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
