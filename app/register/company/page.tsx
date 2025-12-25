"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CompanyManagerRegistration } from "@/components/registration/company/company-manager-registration"
import { RepresentativeRegistration } from "@/components/registration/company/representative-registration"
import { UserCog, Users } from "lucide-react"
import type { CompanyRole } from "@/lib/types"

export default function CompanyRegisterPage() {
  const [companyRole, setCompanyRole] = useState<CompanyRole | null>(null)

  if (companyRole === "manager") {
    return <CompanyManagerRegistration />
  }

  if (companyRole === "representative") {
    return <RepresentativeRegistration />
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">نوع کاربر شرکت</h1>
          <p className="text-muted-foreground">لطفاً نوع کاربری خود را انتخاب کنید</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card
            className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all"
            onClick={() => setCompanyRole("manager")}
          >
            <CardContent className="p-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCog className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">مدیر شرکت</h3>
                <p className="text-sm text-muted-foreground">برای ثبت اطلاعات شرکت و مدیریت رابطین</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all"
            onClick={() => setCompanyRole("representative")}
          >
            <CardContent className="p-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">رابط شرکت</h3>
                <p className="text-sm text-muted-foreground">برای اتصال به شرکت موجود</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
