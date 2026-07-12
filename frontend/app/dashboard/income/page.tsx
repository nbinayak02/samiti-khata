import { DateRangePicker } from "@/components/shared/Date-Range-Picker";
import StickyHeaderTableDemo from "@/components/tables/sticky-table-demo";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AddIncomeSheet } from "@/features/income/components/Add-Income-Sheet";

export default function IncomePage() {
  return (
    <div className="h-screen flex flex-col gap-1 overflow-hidden">
      <div className="flex flex-row justify-between px-10 py-5 shrink-0">
        <div className="flex flex-col">
          <div className="text-2xl font-bold">Income</div>
          <p className="text-muted-foreground text-sm">
            Record and review Income entries.
          </p>
        </div>
        <AddIncomeSheet />
      </div>
      <div className="bg-muted/30 shrink-0">
        <Separator />
        <div className="py-5 px-10 flex flex-row justify-between items-center gap-5">
          <Input placeholder="Search" className="w-full max-w-sm" />
          <div>
            <Combobox items={["a", "b", "c"]}>
              <ComboboxInput placeholder="Committee" />
              <ComboboxContent>
                <ComboboxEmpty>No committees found.</ComboboxEmpty>
                <ComboboxList>
                  <ComboboxItem>asdf</ComboboxItem>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
          <DateRangePicker />
          <Combobox items={["a", "b", "c"]}>
            <ComboboxInput placeholder="Committee" />
            <ComboboxContent>
              <ComboboxEmpty>No committees found.</ComboboxEmpty>
              <ComboboxList>
                <ComboboxItem>asdf</ComboboxItem>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
        <Separator />
      </div>
      <div className="mt-5 px-10 flex-1 min-h-0 flex flex-col overflow-hidden">
        {/* <StickyHeaderTableDemo /> */}
      </div>
    </div>
  );
}
