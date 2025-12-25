"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StepProgress } from "../step-progress"
import type { CompanyManagerData } from "@/lib/types"
import { CompanyInfoStep } from "./company-info-step"
import { ManagerInfoStep } from "./manager-info-step"
import { ManagerLocationStep } from "./manager-location-step"
import { ProductCategoriesStep } from "./product-categories-step"
import { WorkLinesStep } from "./work-lines-step"
import { RepresentativesStep } from "./representatives-step"
import { CompanyDocumentsStep } from "./company-documents-step"
import { CompanyConfirmationStep } from "./company-confirmation-step"
import { ChevronRight, ChevronLeft, Building2 } from "lucide-react"

const steps = [
  "Company Info",
  "Manager Info",
  "Location",
  "Product Categories",
  "Business Lines",
  "Representatives",
  "Documents",
  "Confirmation",
]

export function CompanyManagerRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<CompanyManagerData>>({
    productCategories: [],
    workLines: [],
    representatives: [],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateFormData = (data: Partial<CompanyManagerData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    switch (currentStep) {
      case 1:
        if (!formData.companyName) newErrors.companyName = "Company name is required"
        if (!formData.companyType) newErrors.companyType = "Company type is required"
        if (!formData.foundingYear) newErrors.foundingYear = "Founding year is required"
        if (!formData.registrationNumber) newErrors.registrationNumber = "Registration number is required"
        break
      case 2:
        if (!formData.managerFirstName) newErrors.managerFirstName = "Manager first name is required"
        if (!formData.managerLastName) newErrors.managerLastName = "Manager last name is required"
        if (!formData.username) newErrors.username = "Username is required"
        if (!formData.password) newErrors.password = "Password is required"
        if (!formData.managerNationalId) newErrors.managerNationalId = "Manager national ID is required"
        break
      case 3:
        if (!formData.mobile) newErrors.mobile = "Mobile number is required"
        if (!formData.country) newErrors.country = "Country is required"
        if (!formData.province) newErrors.province = "Province is required"
        if (!formData.city) newErrors.city = "City is required"
        break
      case 4:
        if (!formData.productCategories || formData.productCategories.length === 0) {
          newErrors.productCategories = "Please select at least one product category"
        }
        break
      case 5:
        if (!formData.workLines || formData.workLines.length === 0) {
          newErrors.workLines = "Please define at least one business line"
        }
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
    console.log("[v0] Submitting company manager registration:", formData)
    alert("Company registration completed successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Company Manager Registration</h1>
          <p className="text-muted-foreground">Please enter the company and manager information carefully</p>
        </div>

        <StepProgress steps={steps} currentStep={currentStep} />

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-primary">{currentStep}.</span> {steps[currentStep - 1]}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && <CompanyInfoStep data={formData} onChange={updateFormData} errors={errors} />}
            {currentStep === 2 && <ManagerInfoStep data={formData} onChange={updateFormData} errors={errors} />}
            {currentStep === 3 && <ManagerLocationStep data={formData} onChange={updateFormData} errors={errors} />}
            {currentStep === 4 && <ProductCategoriesStep data={formData} onChange={updateFormData} errors={errors} />}
            {currentStep === 5 && <WorkLinesStep data={formData} onChange={updateFormData} errors={errors} />}
            {currentStep === 6 && (
              <RepresentativesStep data={formData} onChange={updateFormData} workLines={formData.workLines || []} />
            )}
            {currentStep === 7 && <CompanyDocumentsStep data={formData} onChange={updateFormData} errors={errors} />}
            {currentStep === 8 && <CompanyConfirmationStep data={formData} />}

            <div className="flex justify-between pt-6 border-t">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              {currentStep < steps.length ? (
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  Confirm & Register
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
