// components/ui/date-picker.tsx
"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "MM/YYYY",
  className,
}: DatePickerProps) {
  const handleSelect = (date: Date | undefined) => {
    if (date) {
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      onChange(`${month.toString().padStart(2, "0")}/${year}`);
    }
  };

  const parseDate = () => {
    if (value) {
      const [month, year] = value.split("/");
      return new Date(parseInt(year), parseInt(month) - 1, 1);
    }
    return undefined;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? value : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <DayPicker
          mode="single"
          selected={parseDate()}
          onSelect={handleSelect}
          showOutsideDays
          captionLayout="dropdown-buttons" // Changed to "dropdown-buttons" for better visibility
          fromYear={1970}
          toYear={new Date().getFullYear() + 10}
          classNames={{
            root: "p-3 bg-white",
            caption: "flex justify-center pt-1 relative items-center gap-1",
            caption_label: "hidden",
            caption_dropdowns: "flex gap-1",
            dropdown: "py-1 px-2 border rounded text-sm",
            nav: "flex items-center",
            nav_button:
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell:
              "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
            day_selected:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle:
              "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
