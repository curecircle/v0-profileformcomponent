"use client"

import { PhoneInput } from "../phone-input"
import { LocationSelector } from "../location-selector"
import type { CompanyManagerData } from "@/lib/types"

interface ManagerLocationStepProps {
  data: Partial<CompanyManagerData>
  onChange: (data: Partial<CompanyManagerData>) => void
  errors: Record<string, string>
}

export function ManagerLocationStep({ data, onChange, errors }: ManagerLocationStepProps) {
  return (
    <div className="space-y-6">
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
