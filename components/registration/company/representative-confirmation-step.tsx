"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { CompanyRepresentativeData } from "@/lib/types"
import { CheckCircle2, AlertCircle } from "lucide-react"

interface RepresentativeConfirmationStepProps {
  data: Partial<CompanyRepresentativeData>
}

export function RepresentativeConfirmationStep({ data }: RepresentativeConfirmationStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">بررسی و تأیید اطلاعات</h3>
          <p className="text-sm text-muted-foreground">لطفاً اطلاعات خود را بررسی کنید</p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-3">اطلاعات شخصی</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">نام و نام خانوادگی:</span>
                <span className="font-medium">
                  {data.firstName} {data.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">نام کاربری:</span>
                <span className="font-medium">{data.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">کد ملی:</span>
                <span className="font-medium">{data.nationalId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">شماره موبایل:</span>
                <span className="font-medium">{data.mobile}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-foreground mb-3">شرکت متصل</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">نام شرکت:</span>
                <span className="font-medium">{data.companyName}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          ثبت‌نام شما در انتظار تأیید مدیر شرکت است. پس از تأیید، به شماره موبایل شما اطلاع‌رسانی خواهد شد.
        </AlertDescription>
      </Alert>

      <div className="bg-warning/10 border border-warning/30 p-4 rounded-lg">
        <p className="text-sm text-warning-foreground">
          با کلیک بر روی دکمه تأیید، شما تأیید می‌کنید که تمام اطلاعات وارد شده صحیح و معتبر می‌باشد.
        </p>
      </div>
    </div>
  )
}
