"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { DoctorData } from "@/lib/types"
import { CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react"
import { universities } from "@/lib/data/universities"
import { degrees } from "@/lib/data/degrees"
import { specialties } from "@/lib/data/specialties"

interface ConfirmationStepProps {
  data: Partial<DoctorData>
  onAcceptTerms?: (accepted: boolean) => void
}

const TERMS_TEXT = `Terms of Service and Privacy Policy - SIQAL

Welcome to the SIQAL Medical Professional Platform. Please read the following carefully:

1. Acceptance of Terms:
By completing the registration form and using the SIQAL platform, you confirm that you have read and agree to these terms and conditions. Failure to agree with any of these conditions will result in inability to use our services.

2. User Information:
You are required to provide accurate and complete information including your name, email, and mobile phone number. You are responsible for any activity conducted through your account. Any changes to your information must be updated immediately in your account settings.

3. Security and Confidentiality:
Protecting your data is our top priority. Personal and medical information is kept strictly confidential and will not be shared with third parties without user consent, except as required by law or judicial order.

4. Permitted Use:
The SIQAL platform is designed exclusively for scientific, research, and professional communications. Using it for advertising purposes without prior coordination, spreading false information, harassment, or behavior outside the framework of medical professional ethics is prohibited.

5. Intellectual Property Rights:
Users are obligated to respect intellectual property rights including copyright regarding content published on the platform.

6. Content Responsibility:
Responsibility for any religious, political, or controversial content published by users rests entirely with the individual(s) who created or republished that content. Please exercise care in publishing your materials. The SIQAL platform bears no legal responsibility for such content.

7. Right to Change Terms:
SIQAL reserves the right to make necessary changes to the terms and privacy policy at any time. Important changes will be communicated to users via email or notification on the site.

8. Termination of Access:
In case of violation of the stated rules and regulations, SIQAL reserves the right to limit or block user access to the platform without prior notice.

By registering and using SIQAL services, you declare your complete agreement with our terms and privacy policies.`

export function ConfirmationStep({ data, onAcceptTerms }: ConfirmationStepProps) {
  const statusLabels: Record<string, string> = {
    studying: "Currently Studying",
    graduated: "Graduated",
    dropout: "Dropped Out",
    leave: "On Leave",
    expelled: "Expelled",
  }

  const isTermsAccepted = data.acceptedTerms || false

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Review Your Information</h3>
          <p className="text-sm text-muted-foreground">Please review your details carefully before submitting</p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-3">Basic Information</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Full Name:</span>
                <span className="font-medium">
                  {data.firstName} {data.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Username:</span>
                <span className="font-medium">@{data.username}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-foreground mb-3">Identity Information</h4>
            <div className="grid gap-2 text-sm">
              {data.nationalId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">National ID:</span>
                  <span className="font-medium">{data.nationalId}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Birth Date:</span>
                <span className="font-medium">{data.birthDate?.toString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gender:</span>
                <span className="font-medium">
                  {data.gender === "male" ? "Male" : data.gender === "female" ? "Female" : "Other"}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-foreground mb-3">Location</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mobile:</span>
                <span className="font-medium">{data.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Country:</span>
                <span className="font-medium">{data.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Province/State:</span>
                <span className="font-medium">{data.province}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">City:</span>
                <span className="font-medium">{data.city}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-foreground mb-3">Education History</h4>
            {data.educations && data.educations.length > 0 ? (
              <div className="space-y-3">
                {data.educations.map((edu, index) => {
                  const university = universities.find((u) => u.id === edu.universityId)
                  const degree = degrees.find((d) => d.id === edu.degreeId)
                  const specialty = specialties.find((s) => s.id === edu.specialtyId)

                  return (
                    <div key={edu.id} className="bg-muted/30 p-3 rounded-lg text-sm space-y-1">
                      <p className="font-medium">
                        Record {index + 1}: {degree?.name_en || degree?.name_fa} -{" "}
                        {university?.name_en || university?.name_fa}
                      </p>
                      <p className="text-muted-foreground">Major: {edu.major}</p>
                      {specialty && (
                        <p className="text-muted-foreground">Specialty: {specialty.name_en || specialty.name_fa}</p>
                      )}
                      <p className="text-muted-foreground">
                        Start: {edu.startMonth}/{edu.startYear}
                        {edu.endYear && edu.endMonth && ` - End: ${edu.endMonth}/${edu.endYear}`}
                      </p>
                      <p className="text-muted-foreground">Status: {statusLabels[edu.status]}</p>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No education records added</p>
            )}
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-foreground mb-3">Documents</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Educational Documents:</span>
                <span className="font-medium">{data.documents?.length || 0} file(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Profile Picture:</span>
                <span className="font-medium">{data.profileImage ? "Uploaded" : "Not uploaded"}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-foreground mb-3">Terms & Privacy Policy</h4>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4 text-sm leading-relaxed">
            <div className="whitespace-pre-line">{TERMS_TEXT}</div>
          </ScrollArea>

          <div
            className={cn(
              "flex items-start gap-3 mt-4 p-4 rounded-lg border-2 transition-all",
              isTermsAccepted
                ? "bg-green-50 dark:bg-green-950/30 border-green-500"
                : "bg-amber-50 dark:bg-amber-950/30 border-amber-500 animate-pulse",
            )}
          >
            <Checkbox
              id="terms"
              checked={isTermsAccepted}
              onCheckedChange={(checked) => onAcceptTerms?.(checked as boolean)}
              className={cn(
                "mt-0.5 h-5 w-5",
                isTermsAccepted ? "border-green-600 data-[state=checked]:bg-green-600" : "border-amber-600",
              )}
            />
            <div className="space-y-1">
              <Label
                htmlFor="terms"
                className={cn(
                  "text-sm font-semibold leading-relaxed cursor-pointer",
                  isTermsAccepted ? "text-green-700 dark:text-green-400" : "text-amber-700 dark:text-amber-400",
                )}
              >
                I have read and agree to the Terms of Service and Privacy Policy
              </Label>
              {!isTermsAccepted && (
                <p className="text-xs text-amber-600 dark:text-amber-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  You must accept the terms to complete registration
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-lg flex gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800 dark:text-amber-200">
          By clicking "Complete Registration", you confirm that all information provided is accurate and valid.
        </p>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
