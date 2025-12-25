"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, AtSign, Lock } from "lucide-react"
import { useState } from "react"
import type { DoctorData } from "@/lib/types"
import { validatePassword } from "@/lib/validation"

interface AccountStepProps {
  data: Partial<DoctorData>
  onChange: (data: Partial<DoctorData>) => void
  errors: Record<string, string>
}

export function AccountStep({ data, onChange, errors }: AccountStepProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<string>("")

  const handlePasswordChange = (password: string) => {
    onChange({ password })
    const validation = validatePassword(password)
    if (!validation.isValid) {
      setPasswordStrength(validation.errors[0])
    } else {
      setPasswordStrength("Strong password")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username" className="flex items-center gap-2">
          <AtSign className="h-4 w-4 text-muted-foreground" />
          Username *
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
          <Input
            id="username"
            value={data.username || ""}
            onChange={(e) => {
              const value = e.target.value
              onChange({ username: value })
            }}
            className={`pl-8 h-11 ${errors.username ? "border-destructive" : ""}`}
            placeholder="username"
            dir="ltr"
          />
        </div>
        {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
        <p className="text-xs text-muted-foreground">Only letters, numbers, and underscore (_) allowed</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-muted-foreground" />
          Password *
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={data.password || ""}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className={`pr-10 h-11 ${errors.password ? "border-destructive" : ""}`}
            placeholder="Minimum 8 characters"
            dir="ltr"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
        {passwordStrength && (
          <p className={`text-xs ${passwordStrength.includes("Strong") ? "text-green-600" : "text-orange-600"}`}>
            {passwordStrength}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-muted-foreground" />
          Confirm Password *
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={data.confirmPassword || ""}
            onChange={(e) => onChange({ confirmPassword: e.target.value })}
            className={`pr-10 h-11 ${errors.confirmPassword ? "border-destructive" : ""}`}
            placeholder="Re-enter your password"
            dir="ltr"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
        {data.password && data.confirmPassword && data.password !== data.confirmPassword && (
          <p className="text-xs text-destructive">Passwords do not match</p>
        )}
      </div>

      <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
        <p className="font-medium">Password Requirements:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>At least 8 characters</li>
          <li>Contains uppercase and lowercase letters</li>
          <li>Contains numbers</li>
          <li>Contains special characters (@#$%...)</li>
        </ul>
      </div>
    </div>
  )
}
