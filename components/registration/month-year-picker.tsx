"use client"

import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface MonthYearPickerProps {
  year?: string
  month?: string
  setYear: (year: string | undefined) => void
  setMonth: (month: string | undefined) => void
  minYear?: number
  maxYear?: number
  placeholder?: string
}

const gregorianMonths = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
]

export function MonthYearPicker({
  year,
  month,
  setYear,
  setMonth,
  minYear,
  maxYear,
  placeholder = "Select date",
}: MonthYearPickerProps) {
  const [open, setOpen] = useState(false)

  const currentYear = new Date().getFullYear()
  const startYear = minYear || currentYear - 50
  const endYear = maxYear || currentYear + 10

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i)
  const months = gregorianMonths

  const displayText = year && month ? `${months.find((m) => m.value === month)?.label} ${year}` : ""

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal h-11", !year && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate">{displayText || placeholder}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Month</label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {months.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Year</label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {years.map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {year && month && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setYear(undefined)
                setMonth(undefined)
              }}
              className="text-xs text-muted-foreground"
            >
              Clear selection
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
