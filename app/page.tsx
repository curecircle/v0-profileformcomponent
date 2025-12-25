"use client"

import { RoleSelection, type UserRole } from "@/components/auth/RoleSelection"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const router = useRouter()

  useEffect(() => {
    const handleContinue = (e: CustomEvent<UserRole>) => {
      if (e.detail === "doctor") {
        router.push("/register/doctor")
      } else if (e.detail === "company") {
        router.push("/register/company")
      }
    }

    window.addEventListener("roleContinue", handleContinue as EventListener)
    return () => window.removeEventListener("roleContinue", handleContinue as EventListener)
  }, [router])

  return (
    <main className="min-h-screen p-4 sm:p-8 md:p-12 lg:p-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        <div className="text-center space-y-4 animate-in fade-in zoom-in duration-500">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-2">
            پلتفرم جامع پزشکی
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            سامانه یکپارچه ثبت‌نام و مدیریت اعضای جامعه پزشکی و شرکت‌های وابسته
          </p>
        </div>

        <RoleSelection selectedRole={selectedRole} onRoleSelect={setSelectedRole} />
      </div>
    </main>
  )
}
