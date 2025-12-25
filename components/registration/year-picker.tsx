"use client"

import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface YearPickerProps {
  year?: string
  setYear: (year: string | undefined) => void
  locale?: "fa" | "en"
  minYear?: number
  maxYear?: number
}

export function YearPicker({ year, setYear, locale = "fa", minYear, maxYear }: YearPickerProps) {
  const [mode, setMode] = useState<"fa" | "en">(locale)

  const currentYear = new Date().getFullYear()
  const currentJalaliYear = currentYear - 621

  const startYear = minYear || (mode === "fa" ? currentJalaliYear - 50 : currentYear - 50)
  const endYear = maxYear || (mode === "fa" ? currentJalaliYear : currentYear)

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal", !year && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {year || <span>{mode === "fa" ? "انتخاب سال" : "Select year"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">نوع تقویم:</span>
            <div className="flex bg-muted rounded-md p-1">
              <button
                onClick={() => setMode("fa")}
                className={cn(
                  "px-3 py-1 text-xs rounded-sm transition-all",
                  mode === "fa" ? "bg-background shadow-sm" : "hover:bg-background/50",
                )}
              >
                شمسی
              </button>
              <button
                onClick={() => setMode("en")}
                className={cn(
                  "px-3 py-1 text-xs rounded-sm transition-all",
                  mode === "en" ? "bg-background shadow-sm" : "hover:bg-background/50",
                )}
              >
                میلادی
              </button>
            </div>
          </div>

          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="انتخاب سال" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  )
}
