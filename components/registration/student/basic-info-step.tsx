"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { BaseFormData } from "@/lib/types"
import { User } from "lucide-react"

interface BasicInfoStepProps {
  data: Partial<BaseFormData>
  onChange: (data: Partial<BaseFormData>) => void
  errors: Record<string, string>
}

export function BasicInfoStep({ data, onChange, errors }: BasicInfoStepProps) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            First Name *
          </Label>
          <Input
            id="firstName"
            value={data.firstName || ""}
            onChange={(e) => onChange({ firstName: e.target.value })}
            placeholder="Enter your first name"
            className="h-11"
          />
          {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            Last Name *
          </Label>
          <Input
            id="lastName"
            value={data.lastName || ""}
            onChange={(e) => onChange({ lastName: e.target.value })}
            placeholder="Enter your last name"
            className="h-11"
          />
          {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fatherName" className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          Father's Name *
        </Label>
        <Input
          id="fatherName"
          value={data.fatherName || ""}
          onChange={(e) => onChange({ fatherName: e.target.value })}
          placeholder="Enter father's name"
          className="h-11"
        />
        {errors.fatherName && <p className="text-xs text-destructive">{errors.fatherName}</p>}
      </div>
    </div>
  )
}
