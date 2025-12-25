"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SearchableSelect } from "@/components/ui/searchable-select"
import type { GraduateData } from "@/lib/types"
import { cn } from "@/lib/utils"
import { specialties } from "@/lib/data/specialties"
import { universities } from "@/lib/data/universities"

interface SpecialtyInfoStepProps {
  data: Partial<GraduateData>
  onChange: (data: Partial<GraduateData>) => void
  errors: Record<string, string>
}

const specialtyOptions = specialties.map((s) => ({ label: s.name_fa, value: s.id }))
const universityOptions = universities.map((u) => ({ label: u.name_fa, value: u.id }))

export function SpecialtyInfoStep({ data, onChange, errors }: SpecialtyInfoStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="specialty">تخصص</Label>
        <SearchableSelect
          options={specialtyOptions}
          value={data.specialtyId}
          onValueChange={(val) => onChange({ specialtyId: val })}
          placeholder="انتخاب تخصص"
          searchPlaceholder="جستجو..."
          className={cn(errors.specialtyId && "border-destructive")}
        />
        {errors.specialtyId && <p className="text-xs text-destructive">{errors.specialtyId}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="graduateUniversity">دانشگاه فارغ‌التحصیلی</Label>
        <SearchableSelect
          options={universityOptions}
          value={data.graduateUniversityId}
          onValueChange={(val) => onChange({ graduateUniversityId: val })}
          placeholder="انتخاب دانشگاه"
          searchPlaceholder="جستجو..."
          className={cn(errors.graduateUniversityId && "border-destructive")}
        />
        {errors.graduateUniversityId && <p className="text-xs text-destructive">{errors.graduateUniversityId}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="graduationYear">سال فارغ‌التحصیلی</Label>
        <Input
          id="graduationYear"
          type="number"
          value={data.graduationYear || ""}
          onChange={(e) => onChange({ graduationYear: e.target.value })}
          placeholder="۱۴۰۰"
          min="1350"
          max="1410"
          className={cn(errors.graduationYear && "border-destructive")}
        />
        {errors.graduationYear && <p className="text-xs text-destructive">{errors.graduationYear}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="medicalCode">شماره نظام پزشکی</Label>
        <Input
          id="medicalCode"
          value={data.medicalCode || ""}
          onChange={(e) => onChange({ medicalCode: e.target.value })}
          className="text-left dir-ltr"
        />
      </div>
    </div>
  )
}
