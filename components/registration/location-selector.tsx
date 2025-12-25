"use client"

import { Label } from "@/components/ui/label"
import { SearchableSelect, type SelectOption } from "@/components/ui/searchable-select"
import { countries } from "@/lib/data/countries"
import { getStatesByCountry } from "@/lib/data/states"
import { getCitiesByState } from "@/lib/data/cities"
import { useMemo } from "react"
import { Globe, MapPin, Building2 } from "lucide-react"

interface LocationSelectorProps {
  country: string
  province: string
  city: string
  onCountryChange: (value: string) => void
  onProvinceChange: (value: string) => void
  onCityChange: (value: string) => void
  errors: {
    country?: string
    province?: string
    city?: string
  }
}

export function LocationSelector({
  country,
  province,
  city,
  onCountryChange,
  onProvinceChange,
  onCityChange,
  errors,
}: LocationSelectorProps) {
  const countryOptions: SelectOption[] = useMemo(
    () =>
      countries.map((c) => ({
        value: c.id,
        label: c.name_en,
      })),
    [],
  )

  const stateOptions: SelectOption[] = useMemo(() => {
    if (!country) return []
    return getStatesByCountry(country).map((s) => ({
      value: s.id,
      label: s.name_en,
    }))
  }, [country])

  const cityOptions: SelectOption[] = useMemo(() => {
    if (!province) return []
    return getCitiesByState(province).map((c) => ({
      value: c.id,
      label: c.name_en,
    }))
  }, [province])

  const handleCountryChange = (value: string) => {
    onCountryChange(value)
    onProvinceChange("")
    onCityChange("")
  }

  const handleProvinceChange = (value: string) => {
    onProvinceChange(value)
    onCityChange("")
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          Country *
        </Label>
        <SearchableSelect
          options={countryOptions}
          value={country}
          onValueChange={handleCountryChange}
          placeholder="Select country"
          searchPlaceholder="Search country..."
          emptyText="No country found"
        />
        {errors.country && <p className="text-xs text-destructive mt-1">{errors.country}</p>}
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          Province/State *
        </Label>
        <SearchableSelect
          options={stateOptions}
          value={province}
          onValueChange={handleProvinceChange}
          placeholder={country ? "Select province/state" : "Select country first"}
          searchPlaceholder="Search province..."
          emptyText="No province found"
          disabled={!country}
        />
        {errors.province && <p className="text-xs text-destructive mt-1">{errors.province}</p>}
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          City *
        </Label>
        <SearchableSelect
          options={cityOptions}
          value={city}
          onValueChange={onCityChange}
          placeholder={province ? "Select city" : "Select province first"}
          searchPlaceholder="Search city..."
          emptyText="No city found"
          disabled={!province}
        />
        {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
      </div>
    </div>
  )
}
