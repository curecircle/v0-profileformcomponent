"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/hooks/useLanguage"
import { Building2, Stethoscope } from "lucide-react"

export type UserRole = "doctor" | "company"

export interface RoleSelectionProps {
  selectedRole: UserRole | null
  onRoleSelect: (role: UserRole) => void
  className?: string
}

export function RoleSelection({ selectedRole, onRoleSelect, className }: RoleSelectionProps) {
  const { isRTL, t } = useLanguage()

  const roles: {
    id: UserRole
    icon: React.ReactNode
    title: string
    description: string
  }[] = [
    {
      id: "doctor",
      icon: <Stethoscope className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9" />,
      title: "پزشک", // TODO: Use translation key
      description: "دانشجو یا فارغ‌التحصیل رشته‌های پزشکی", // TODO: Use translation key
    },
    {
      id: "company",
      icon: <Building2 className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9" />,
      title: t("company"),
      description: t("companyDescription"),
    },
  ]

  return (
    <div className={cn("space-y-6 sm:space-y-8", className)}>
      <div className="text-center mb-4 sm:mb-6 lg:mb-8 animate-in fade-in slide-in-from-top duration-500">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 sm:mb-3 text-balance">
          {t("selectRole")}
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4 text-pretty leading-relaxed">
          {t("selectRoleDescription")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id

          return (
            <Card
              key={role.id}
              className={cn(
                "cursor-pointer transition-all duration-300 border-2 h-full group overflow-hidden",
                "hover:shadow-2xl active:scale-[0.98]",
                isSelected
                  ? "ring-4 ring-blue-500/30 border-blue-500 bg-gradient-to-br from-blue-50 via-blue-50/80 to-purple-50 dark:from-blue-950/40 dark:to-purple-950/40 scale-[1.02] sm:scale-105 shadow-2xl shadow-blue-500/25"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-950/20 dark:hover:to-purple-950/20 shadow-md",
              )}
              onClick={() => onRoleSelect(role.id)}
            >
              <CardContent className="p-6 sm:p-7 lg:p-8">
                <div
                  className={cn(
                    "flex flex-col items-center text-center space-y-4 sm:space-y-5",
                    isRTL && "space-y-reverse",
                  )}
                >
                  <div
                    className={cn(
                      "p-4 sm:p-5 rounded-2xl transition-all duration-500",
                      isSelected
                        ? "bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white scale-110 shadow-xl shadow-blue-500/30 rotate-3"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-gradient-to-br group-hover:from-blue-500/20 group-hover:to-purple-600/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110 group-hover:shadow-lg group-hover:rotate-2",
                    )}
                  >
                    {role.icon}
                  </div>
                  <h3
                    className={cn(
                      "text-lg sm:text-xl lg:text-2xl font-bold transition-colors duration-300 text-balance",
                      isSelected
                        ? "text-slate-900 dark:text-slate-100"
                        : "text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400",
                    )}
                  >
                    {role.title}
                  </h3>
                  <p
                    className={cn(
                      "text-sm sm:text-base leading-relaxed transition-colors duration-300 text-pretty min-h-[3rem] sm:min-h-[4rem]",
                      isSelected
                        ? "text-slate-700 dark:text-slate-300"
                        : "text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300",
                    )}
                  >
                    {role.description}
                  </p>
                  {isSelected && (
                    <div
                      className={cn(
                        "mt-2 flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 animate-in zoom-in duration-300",
                        isRTL && "flex-row-reverse",
                      )}
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                      <span className="text-sm font-bold">Selected</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedRole && (
        <div className="mt-6 sm:mt-8 flex justify-center animate-in slide-in-from-bottom duration-500">
          <button
            onClick={() => {
              const event = new CustomEvent("roleContinue", { detail: selectedRole })
              window.dispatchEvent(event)
            }}
            className={cn(
              "w-full sm:w-auto min-w-[240px] px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 transition-all duration-300 font-bold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 flex items-center justify-center gap-3 text-base sm:text-lg active:scale-95 hover:scale-105",
              isRTL && "flex-row-reverse",
            )}
          >
            {t("continue")}
            <span className="text-xl">{isRTL ? "←" : "→"}</span>
          </button>
        </div>
      )}
    </div>
  )
}
