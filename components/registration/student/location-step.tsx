"use client"

import { PhoneInput } from "../phone-input"
import { LocationSelector } from "../location-selector"
import type { StudentData } from "@/lib/types"
import { MapPin } from "lucide-react"

interface LocationStepProps {
  data: Partial<StudentData>
  onChange: (data: Partial<StudentData>) => void
  errors: Record<string, string>
}

export function LocationStep({ data, onChange, errors }: LocationStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <MapPin className="h-5 w-5" />
        <span className="text-sm font-medium">Contact & Location Information</span>
      </div>

      <PhoneInput value={data.mobile || ""} onChange={(value) => onChange({ mobile: value })} error={errors.mobile} />

      <LocationSelector
        country={data.country || ""}
        province={data.province || ""}
        city={data.city || ""}
        onCountryChange={(value) => onChange({ country: value })}
        onProvinceChange={(value) => onChange({ province: value })}
        onCityChange={(value) => onChange({ city: value })}
        errors={{
          country: errors.country,
          province: errors.province,
          city: errors.city,
        }}
      />
    </div>
  )
}
