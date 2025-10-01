import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "../../../lib/common/utils";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { Label } from "../label";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

export interface DatePickerProps {
  className?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

export function DatePicker({
  className,
  value,
  onChange,
  placeholder = "Select date",
  label,
  disabled,
}: DatePickerProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [internalDate, setInternalDate] = useState<Date | undefined>(undefined);

  const date = value !== undefined ? value : internalDate;
  const setDate = onChange || setInternalDate;

  return (
    <div className={cn("flex flex-col gap-0.5")}>
      <Label htmlFor="date" className="px-1 text-muted-foreground">
        {label || "Date"}
      </Label>

      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <div className={cn("flex flex-col gap-0.5", className)}>
            <Button
              type="button"
              variant="outline"
              id="date"
              className="w-full justify-between font-normal"
              disabled={disabled}
            >
              {date ? date.toLocaleDateString() : placeholder}
              <ChevronDownIcon />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-3" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
