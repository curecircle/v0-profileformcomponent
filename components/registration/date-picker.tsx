"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DatePickerProps {
  date?: string
  setDate: (date: string | undefined) => void
}

const monthsEn = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const yearsEn = Array.from({ length: 100 }, (_, i) => 2025 - i) // 1926 to 2025

export function DatePicker({ date, setDate }: DatePickerProps) {
  const [selectedYear, setSelectedYear] = React.useState<number>(2000)
  const [selectedMonth, setSelectedMonth] = React.useState<number>(1)
  const [selectedDay, setSelectedDay] = React.useState<number>(1)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    if (date && !isOpen) {
      const d = new Date(date)
      if (!isNaN(d.getTime())) {
        setSelectedYear(d.getFullYear())
        setSelectedMonth(d.getMonth() + 1)
        setSelectedDay(d.getDate())
      }
    }
  }, [date, isOpen])

  const getMaxDays = () => {
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (selectedMonth === 2) {
      const isLeap = (selectedYear % 4 === 0 && selectedYear % 100 !== 0) || selectedYear % 400 === 0
      return isLeap ? 29 : 28
    }
    return monthDays[selectedMonth - 1]
  }

  const handleDateChange = (y: number, m: number, d: number) => {
    const maxDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]
    const validDay = Math.min(d, maxDays)

    setSelectedYear(y)
    setSelectedMonth(m)
    setSelectedDay(validDay)

    const newDate = new Date(y, m - 1, validDay)
    setDate(newDate.toISOString().split("T")[0])
  }

  const dateDisplay = date
    ? (() => {
        const d = new Date(date)
        return `${monthsEn[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
      })()
    : null

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full h-11 justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateDisplay || <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Select
              value={selectedDay.toString()}
              onValueChange={(v) => handleDateChange(selectedYear, selectedMonth, Number.parseInt(v))}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: getMaxDays() }, (_, i) => i + 1).map((d) => (
                  <SelectItem key={d} value={d.toString()}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedMonth.toString()}
              onValueChange={(v) => handleDateChange(selectedYear, Number.parseInt(v), selectedDay)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {monthsEn.map((m, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedYear.toString()}
              onValueChange={(v) => handleDateChange(Number.parseInt(v), selectedMonth, selectedDay)}
            >
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {yearsEn.map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
