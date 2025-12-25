"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { CompanyManagerData } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ManagerInfoStepProps {
  data: Partial<CompanyManagerData>
  onChange: (data: Partial<CompanyManagerData>) => void
  errors: Record<string, string>
}

export function ManagerInfoStep({ data, onChange, errors }: ManagerInfoStepProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="managerFirstName">نام مدیر</Label>
        <Input
          id="managerFirstName"
          value={data.managerFirstName || ""}
          onChange={(e) => onChange({ managerFirstName: e.target.value })}
          placeholder="نام"
          className={cn(errors.managerFirstName && "border-destructive")}
        />
        {errors.managerFirstName && <p className="text-xs text-destructive">{errors.managerFirstName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="managerLastName">نام خانوادگی مدیر</Label>
        <Input
          id="managerLastName"
          value={data.managerLastName || ""}
          onChange={(e) => onChange({ managerLastName: e.target.value })}
          placeholder="نام خانوادگی"
          className={cn(errors.managerLastName && "border-destructive")}
        />
        {errors.managerLastName && <p className="text-xs text-destructive">{errors.managerLastName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">نام کاربری</Label>
        <Input
          id="username"
          value={data.username || ""}
          onChange={(e) => onChange({ username: e.target.value })}
          placeholder="نام کاربری دلخواه"
          className={cn(errors.username && "border-destructive")}
        />
        {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="managerNationalId">کد ملی مدیر</Label>
        <Input
          id="managerNationalId"
          value={data.managerNationalId || ""}
          onChange={(e) => onChange({ managerNationalId: e.target.value })}
          placeholder="۱۲۳۴۵۶۷۸۹۰"
          maxLength={10}
          className={cn(errors.managerNationalId && "border-destructive")}
        />
        {errors.managerNationalId && <p className="text-xs text-destructive">{errors.managerNationalId}</p>}
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="password">رمز عبور</Label>
        <Input
          id="password"
          type="password"
          value={data.password || ""}
          onChange={(e) => onChange({ password: e.target.value })}
          placeholder="حداقل ۸ کاراکتر"
          className={cn(errors.password && "border-destructive")}
        />
        {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
      </div>
    </div>
  )
}
