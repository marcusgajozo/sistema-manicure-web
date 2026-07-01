"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, ClockIcon } from "lucide-react";

import { Button } from "@/common/components/shadcn-ui/button";
import { Calendar } from "@/common/components/shadcn-ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/shadcn-ui/popover";
import { cn } from "@/common/lib/utils";

type DatePickerProps = {
  value?: Date | string;
  onChange?: (date: string | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export function DatePicker({
  value,
  onChange,
  placeholder = "Selecione uma data",
  className,
  disabled,
}: DatePickerProps) {
  const selectedDate = value ? new Date(value) : undefined;

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      onChange?.(undefined);
      return;
    }

    if (selectedDate) {
      date.setHours(selectedDate.getHours());
      date.setMinutes(selectedDate.getMinutes());
    } else {
      date.setHours(9); // Default time
      date.setMinutes(0);
    }

    onChange?.(date.toISOString());
  };

  const handleTimeChange = (type: "hour" | "minute", val: string) => {
    if (!selectedDate) return;
    const newDate = new Date(selectedDate);
    if (type === "hour") {
      newDate.setHours(parseInt(val, 10) || 0);
    } else {
      newDate.setMinutes(parseInt(val, 10) || 0);
    }
    onChange?.(newDate.toISOString());
  };

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground",
              className,
            )}
            disabled={disabled}
          />
        }
      >
        <CalendarIcon data-icon="inline-start" />
        {selectedDate ? (
          format(selectedDate, "PPP 'às' HH:mm", { locale: ptBR })
        ) : (
          <span>{placeholder}</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
        />
        {selectedDate && (
          <div className="flex items-center justify-between gap-2 border-t p-3">
            <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
              <ClockIcon className="h-4 w-4" />
              <span>Horário</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="0"
                max="23"
                className="w-14 rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                value={selectedDate.getHours().toString().padStart(2, "0")}
                onChange={(e) => handleTimeChange("hour", e.target.value)}
              />
              <span className="text-muted-foreground">:</span>
              <input
                type="number"
                min="0"
                max="59"
                className="w-14 rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                value={selectedDate.getMinutes().toString().padStart(2, "0")}
                onChange={(e) => handleTimeChange("minute", e.target.value)}
              />
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
