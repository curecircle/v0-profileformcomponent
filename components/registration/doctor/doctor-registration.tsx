"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StepProgress } from "../step-progress"
import type { DoctorData } from "@/lib/types"
import { BasicInfoStep } from "../student/basic-info-step"
import { IdentityInfoStep } from "../student/identity-info-step"
import { LocationStep } from "../student/location-step"
import { EducationRecordForm } from "./education-record-form"
import { DocumentsStep } from "../student/documents-step"
import { ProfilePictureStep } from "../student/profile-picture-step"
import { AccountStep } from "../account-step"
import { ConfirmationStep } from "../student/confirmation-step"
import { ChevronRight, ChevronLeft, Stethoscope } from "lucide-react"

const steps = [
  { title: "Basic Info", description: "Name & details" },
  { title: "Identity", description: "Personal info" },
  { title: "Location", description: "Contact & address" },
  { title: "Education", description: "Academic records" },
  { title: "Documents", description: "Upload files" },
  { title: "Profile Photo", description: "Your picture" },
  { title: "Account", description: "Username & password" },
  { title: "Confirmation", description: "Review & submit" },
]

export function DoctorRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<DoctorData>>({
    educations: [],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateFormData = (data: Partial<DoctorData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    switch (currentStep) {
      case 1: // Basic Info - name only
        if (!formData.firstName) newErrors.firstName = "First name is required"
        if (!formData.lastName) newErrors.lastName = "Last name is required"
        if (!formData.fatherName) newErrors.fatherName = "Father's name is required"
        break
      case 2: // Identity
        if (!formData.nationalId && !formData.fidaCode) {
          newErrors.nationalId = "Either National ID or Passport Number is required"
        }
        if (!formData.birthDate) newErrors.birthDate = "Birth date is required"
        if (!formData.gender) newErrors.gender = "Gender is required"
        break
      case 3: // Location
        if (!formData.mobile) newErrors.mobile = "Mobile number is required"
        if (!formData.country) newErrors.country = "Country is required"
        if (!formData.province) newErrors.province = "Province/State is required"
        if (!formData.city) newErrors.city = "City is required"
        break
      case 4: // Education
        if (!formData.educations || formData.educations.length === 0) {
          newErrors.educations = "At least one education record is required"
        }
        break
      case 5: // Documents
        if (!formData.documents || formData.documents.length === 0) {
          newErrors.documents = "Please upload your educational documents"
        }
        break
      case 6: // Profile Picture
        if (!formData.profileImage) newErrors.profileImage = "Profile photo is required"
        break
      case 7: // Account
        if (!formData.username) newErrors.username = "Username is required"
        if (!formData.password) newErrors.password = "Password is required"
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match"
        }
        break
      case 8: // Confirmation
        if (!formData.acceptedTerms) {
          newErrors.acceptedTerms = "Please read and accept the terms and conditions"
          alert("Please read and accept the terms and conditions")
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleSubmit = () => {
    if (validateStep()) {
      console.log("Form submitted:", formData)
      alert("Registration completed successfully!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <Stethoscope className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Doctor Registration</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Please fill in your information carefully to complete your registration
          </p>
        </div>

        {/* Stepper */}
        <StepProgress steps={steps} currentStep={currentStep} />

        {/* Form Card */}
        <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-xl">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {currentStep === 1 && <BasicInfoStep data={formData} onChange={updateFormData} errors={errors} />}
            {currentStep === 2 && <IdentityInfoStep data={formData} onChange={updateFormData} errors={errors} />}
            {currentStep === 3 && <LocationStep data={formData} onChange={updateFormData} errors={errors} />}
            {currentStep === 4 && <EducationRecordForm data={formData} onChange={updateFormData} errors={errors} />}
            {currentStep === 5 && <DocumentsStep data={formData} onChange={updateFormData} errors={errors} />}
            {currentStep === 6 && <ProfilePictureStep data={formData} onChange={updateFormData} errors={errors} />}
            {currentStep === 7 && <AccountStep data={formData} onChange={updateFormData} errors={errors} />}
            {currentStep === 8 && (
              <ConfirmationStep
                data={formData}
                onAcceptTerms={(accepted) => updateFormData({ acceptedTerms: accepted })}
              />
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="gap-2 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              {currentStep < steps.length ? (
                <Button onClick={handleNext} className="gap-2">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.acceptedTerms}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  Complete Registration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
