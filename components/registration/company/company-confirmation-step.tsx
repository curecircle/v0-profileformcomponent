"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { CompanyManagerData } from "@/lib/types"
import { CheckCircle2 } from "lucide-react"

interface CompanyConfirmationStepProps {
  data: Partial<CompanyManagerData>
}

export function CompanyConfirmationStep({ data }: CompanyConfirmationStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">بررسی و تأیید اطلاعات</h3>
          <p className="text-sm text-muted-foreground">لطفاً اطلاعات شرکت را بررسی کنید</p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-3">اطلاعات شرکت</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">نام شرکت:</span>
                <span className="font-medium">{data.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">نوع شرکت:</span>
                <span className="font-medium">{data.companyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">شماره ثبت:</span>
                <span className="font-medium">{data.registrationNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">سال تأسیس:</span>
                <span className="font-medium">{data.foundingYear}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-foreground mb-3">اطلاعات مدیر</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">نام مدیر:</span>
                <span className="font-medium">
                  {data.managerFirstName} {data.managerLastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">نام کاربری:</span>
                <span className="font-medium">{data.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">شماره موبایل:</span>
                <span className="font-medium">{data.mobile}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-foreground mb-3">خطوط کاری</h4>
            <div className="flex flex-wrap gap-2">
              {data.workLines?.map((line) => (
                <span key={line.id} className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                  {line.name}
                </span>
              ))}
            </div>
          </div>

          {data.representatives && data.representatives.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold text-foreground mb-3">رابطین ({data.representatives.length})</h4>
                <div className="space-y-2">
                  {data.representatives.map((rep) => (
                    <div key={rep.id} className="text-sm bg-accent/30 p-3 rounded">
                      <div className="font-medium text-foreground">{rep.fullName}</div>
                      <div className="text-muted-foreground">{rep.mobile}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="bg-warning/10 border border-warning/30 p-4 rounded-lg">
        <p className="text-sm text-warning-foreground">
          با کلیک بر روی دکمه تأیید، شما تأیید می‌کنید که تمام اطلاعات وارد شده صحیح و معتبر می‌باشد.
        </p>
      </div>
    </div>
  )
}
