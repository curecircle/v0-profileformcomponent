"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface IntlPhoneInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
  label?: string
  required?: boolean
}

export function IntlPhoneInput({
  value,
  onChange,
  error,
  label = "Mobile Number",
  required = true,
}: IntlPhoneInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const itiRef = useRef<any>(null)
  const [phoneValue, setPhoneValue] = useState(value || "")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Add CSS
    if (!document.querySelector('link[href*="intl-tel-input"]')) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.min.css"
      document.head.appendChild(link)
    }

    // Add script
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js"
    script.async = true

    script.onload = () => {
      if (inputRef.current && (window as any).intlTelInput) {
        itiRef.current = (window as any).intlTelInput(inputRef.current, {
          preferredCountries: ["ir", "us", "gb", "de", "fr", "ca"],
          separateDialCode: true,
          initialCountry: "ir",
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        })

        inputRef.current.addEventListener("countrychange", () => {
          if (itiRef.current) {
            const fullNumber = itiRef.current.getNumber()
            onChange(fullNumber)
          }
        })

        setIsLoaded(true)
      }
    }

    document.body.appendChild(script)

    return () => {
      if (itiRef.current && itiRef.current.destroy) {
        itiRef.current.destroy()
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [onChange])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "")
    setPhoneValue(numericValue)

    if (itiRef.current) {
      const fullNumber = itiRef.current.getNumber()
      onChange(fullNumber || numericValue)
    } else {
      onChange(numericValue)
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor="phone">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <Input
        ref={inputRef}
        id="phone"
        type="tel"
        value={phoneValue}
        onChange={handleChange}
        placeholder="912 345 6789"
        className={cn("h-11", error && "border-destructive")}
        dir="ltr"
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
      <p className="text-xs text-muted-foreground">Enter numbers only</p>
    </div>
  )
}
