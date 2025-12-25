"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
  label?: string
  required?: boolean
}

export function PhoneInput({ value, onChange, error, label = "شماره موبایل", required = true }: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^\d+\-() ]/g, "")
    onChange(cleaned)
  }

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor="phone">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <Input
        id="phone"
        type="tel"
        value={value}
        onChange={handleChange}
        placeholder="0912 345 6789"
        className={cn(error && "border-destructive")}
        dir="ltr"
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
      <p className="text-xs text-muted-foreground">فقط اعداد و علائم +، -، ()، فاصله مجاز است</p>
    </div>
  )
}
