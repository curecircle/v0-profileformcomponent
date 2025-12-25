"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SearchableSelect } from "@/components/ui/searchable-select"
import type { StudentData } from "@/lib/types"
import { cn } from "@/lib/utils"
import { universities } from "@/lib/data/universities"
import { degrees } from "@/lib/data/degrees"

interface EducationInfoStepProps {
  data: Partial<StudentData>
  onChange: (data: Partial<StudentData>) => void
  errors: Record<string, string>
}

const universityOptions = universities.map((u) => ({ label: u.name_fa, value: u.id }))
const degreeOptions = degrees.map((d) => ({ label: d.name_fa, value: d.id }))

export function EducationInfoStep({ data, onChange, errors }: EducationInfoStepProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="university">دانشگاه</Label>
        <SearchableSelect
          options={universityOptions}
          value={data.universityId}
          onValueChange={(val) => onChange({ universityId: val })}
          placeholder="انتخاب دانشگاه"
          searchPlaceholder="جستجو..."
          className={cn(errors.universityId && "border-destructive")}
        />
        {errors.universityId && <p className="text-xs text-destructive">{errors.universityId}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="major">رشته تحصیلی</Label>
        {/* Keeping major as text for now or custom select if list provided, using text input as placeholder */}
        <Input
          id="major"
          value={data.major || ""}
          onChange={(e) => onChange({ major: e.target.value })}
          placeholder="رشته تحصیلی"
          className={cn(errors.major && "border-destructive")}
        />
        {errors.major && <p className="text-xs text-destructive">{errors.major}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="degree">مقطع</Label>
        <SearchableSelect
          options={degreeOptions}
          value={data.degreeId}
          onValueChange={(val) => onChange({ degreeId: val })}
          placeholder="انتخاب مقطع"
        />
        {errors.degreeId && <p className="text-xs text-destructive">{errors.degreeId}</p>}
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="startYear">سال شروع تحصیل</Label>
        <Input
          id="startYear"
          type="number"
          value={data.startYear || ""}
          onChange={(e) => onChange({ startYear: e.target.value })}
          placeholder="۱۴۰۰"
          min="1380"
          max="1410"
          className={cn(errors.startYear && "border-destructive")}
        />
        {errors.startYear && <p className="text-xs text-destructive">{errors.startYear}</p>}
      </div>
    </div>
  )
}
