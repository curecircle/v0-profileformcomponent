"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CompanyManagerData } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Building } from "lucide-react"

interface CompanyInfoStepProps {
  data: Partial<CompanyManagerData>
  onChange: (data: Partial<CompanyManagerData>) => void
  errors: Record<string, string>
}

const companyTypes = [
  "Pharmaceutical Company",
  "Medical Equipment Company",
  "Supplements & Biotechnology Company",
  "Drug Distribution Company",
  "Medical Consulting Company",
  "Other",
]

export function CompanyInfoStep({ data, onChange, errors }: CompanyInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Building className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Company Information</h3>
          <p className="text-sm text-muted-foreground">Enter your company's basic information</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={data.companyName || ""}
            onChange={(e) => onChange({ companyName: e.target.value })}
            placeholder="Full company name"
            className={cn(errors.companyName && "border-destructive")}
          />
          {errors.companyName && <p className="text-xs text-destructive">{errors.companyName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyType">Company Type</Label>
          <Select value={data.companyType} onValueChange={(value) => onChange({ companyType: value })}>
            <SelectTrigger id="companyType" className={cn(errors.companyType && "border-destructive")}>
              <SelectValue placeholder="Select company type" />
            </SelectTrigger>
            <SelectContent>
              {companyTypes.sort().map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.companyType && <p className="text-xs text-destructive">{errors.companyType}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="foundingYear">Founding Year</Label>
          <Input
            id="foundingYear"
            type="number"
            value={data.foundingYear || ""}
            onChange={(e) => onChange({ foundingYear: e.target.value })}
            placeholder="2020"
            min="1900"
            max={new Date().getFullYear()}
            className={cn(errors.foundingYear && "border-destructive")}
          />
          {errors.foundingYear && <p className="text-xs text-destructive">{errors.foundingYear}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="registrationNumber">Company Registration Number</Label>
          <Input
            id="registrationNumber"
            value={data.registrationNumber || ""}
            onChange={(e) => onChange({ registrationNumber: e.target.value })}
            placeholder="Official registration number"
            className={cn(errors.registrationNumber && "border-destructive")}
          />
          {errors.registrationNumber && <p className="text-xs text-destructive">{errors.registrationNumber}</p>}
        </div>
      </div>
    </div>
  )
}
