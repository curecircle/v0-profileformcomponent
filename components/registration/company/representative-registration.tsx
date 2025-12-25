"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StepProgress } from "../step-progress"
import type { CompanyRepresentativeData } from "@/lib/types"
import { BasicInfoStep } from "../student/basic-info-step"
import { IdentityInfoStep } from "../student/identity-info-step"
import { LocationStep } from "../student/location-step"
import { CompanyConnectionStep } from "./company-connection-step"
import { RepresentativeDocumentsStep } from "./representative-documents-step"
import { RepresentativeConfirmationStep } from "./representative-confirmation-step"
import { ChevronRight, ChevronLeft } from "lucide-react"

const steps = ["اطلاعات پایه", "اطلاعات هویتی", "موقعیت", "اتصال به شرکت", "مدارک", "تأیید نهایی"]

export function RepresentativeRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<CompanyRepresentativeData>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateFormData = (data: Partial<CompanyRepresentativeData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    switch (currentStep) {
      case 1:
        if (!formData.firstName) newErrors.firstName = "نام الزامی است"
        if (!formData.lastName) newErrors.lastName = "نام خانوادگی الزامی است"
        if (!formData.username) newErrors.username = "نام کاربری الزامی است"
        if (!formData.password) newErrors.password = "رمز عبور الزامی است"
        break
      case 2:
        if (!formData.nationalId) newErrors.nationalId = "کد ملی الزامی است"
        if (!formData.birthDate) newErrors.birthDate = "تاریخ تولد الزامی است"
        if (!formData.gender) newErrors.gender = "جنسیت الزامی است"
        break
      case 3:
        if (!formData.mobile) newErrors.mobile = "شماره موبایل الزامی است"
        if (!formData.country) newErrors.country = "انتخاب کشور الزامی است"
        if (!formData.province) newErrors.province = "انتخاب استان الزامی است"
        if (!formData.city) newErrors.city = "انتخاب شهر الزامی است"
        break
      case 4:
        if (!formData.companyId) newErrors.companyId = "انتخاب شرکت الزامی است"
        break
      case 5:
        if (!formData.identityDocuments) newErrors.identityDocuments = "مدارک شناسایی الزامی است"
        if (!formData.profileImage) newErrors.profileImage = "عکس پروفایل الزامی است"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    console.log("[v0] Submitting representative registration:", formData)
    alert("ثبت‌نام رابط با موفقیت انجام شد! منتظر تأیید شرکت باشید.")
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">ثبت‌نام رابط شرکت</h1>
          <p className="text-muted-foreground">لطفاً اطلاعات خود را با دقت وارد کنید</p>
        </div>

        <StepProgress steps={steps} currentStep={currentStep} />

        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1]}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && <BasicInfoStep data={formData} onChange={updateFormData} errors={errors} />}
            {currentStep === 2 && <IdentityInfoStep data={formData} onChange={updateFormData} errors={errors} />}
            {currentStep === 3 && <LocationStep data={formData} onChange={updateFormData} errors={errors} />}
            {currentStep === 4 && <CompanyConnectionStep data={formData} onChange={updateFormData} errors={errors} />}
            {currentStep === 5 && (
              <RepresentativeDocumentsStep data={formData} onChange={updateFormData} errors={errors} />
            )}
            {currentStep === 6 && <RepresentativeConfirmationStep data={formData} />}

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                <ChevronRight className="h-4 w-4 ml-2" />
                قبلی
              </Button>
              {currentStep < steps.length ? (
                <Button onClick={handleNext}>
                  بعدی
                  <ChevronLeft className="h-4 w-4 mr-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>تأیید و ثبت‌نام</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
