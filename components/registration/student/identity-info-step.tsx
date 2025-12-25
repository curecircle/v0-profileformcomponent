"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { IdentityData } from "@/lib/types"
import { DatePicker } from "../date-picker"
import { CreditCard, Calendar, Users } from "lucide-react"

interface IdentityInfoStepProps {
  data: Partial<IdentityData>
  onChange: (data: Partial<IdentityData>) => void
  errors: Record<string, string>
}

export function IdentityInfoStep({ data, onChange, errors }: IdentityInfoStepProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="nationalId" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          National ID *
        </Label>
        <Input
          id="nationalId"
          value={data.nationalId || ""}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "")
            if (value.length <= 10) {
              onChange({ nationalId: value })
            }
          }}
          placeholder="10-digit National ID"
          maxLength={10}
          className="h-11"
        />
        {errors.nationalId && <p className="text-xs text-destructive">{errors.nationalId}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            Gender *
          </Label>
          <Select value={data.gender || ""} onValueChange={(value) => onChange({ gender: value as any })}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-xs text-destructive">{errors.gender}</p>}
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Birth Date *
          </Label>
          <DatePicker date={data.birthDate as string} setDate={(date) => onChange({ birthDate: date || "" })} />
          {errors.birthDate && <p className="text-xs text-destructive">{errors.birthDate}</p>}
        </div>
      </div>
    </div>
  )
}
