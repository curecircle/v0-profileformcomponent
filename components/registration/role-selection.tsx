"use client"

import { GraduationCap, Stethoscope, Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { UserRole } from "@/lib/types"
import { cn } from "@/lib/utils"

interface RoleSelectionProps {
  onSelect: (role: UserRole) => void
  selectedRole?: UserRole | null
}

export function RoleSelection({ onSelect, selectedRole }: RoleSelectionProps) {
  const roles = [
    {
      value: "student" as UserRole,
      title: "دانشجو پزشکی",
      description: "برای دانشجویان در حال تحصیل",
      icon: GraduationCap,
    },
    {
      value: "graduate" as UserRole,
      title: "پزشک فارغ‌التحصیل",
      description: "برای پزشکان و متخصصان",
      icon: Stethoscope,
    },
    {
      value: "company" as UserRole,
      title: "شرکت",
      description: "برای شرکت‌های دارویی و پزشکی",
      icon: Building2,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">نقش خود را انتخاب کنید</h2>
        <p className="text-muted-foreground">لطفاً یکی از گزینه‌های زیر را انتخاب کنید</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {roles.map((role) => {
          const Icon = role.icon
          const isSelected = selectedRole === role.value

          return (
            <Card
              key={role.value}
              className={cn(
                "cursor-pointer transition-all hover:shadow-lg hover:scale-105",
                isSelected && "ring-2 ring-primary shadow-lg",
              )}
              onClick={() => onSelect(role.value)}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedRole && (
        <div className="flex justify-center">
          <Button size="lg" onClick={() => onSelect(selectedRole)}>
            ادامه
          </Button>
        </div>
      )}
    </div>
  )
}
