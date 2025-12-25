"use client"

import { FileUpload } from "../file-upload"
import type { CompanyManagerData } from "@/lib/types"

interface CompanyDocumentsStepProps {
  data: Partial<CompanyManagerData>
  onChange: (data: Partial<CompanyManagerData>) => void
  errors: Record<string, string>
}

export function CompanyDocumentsStep({ data, onChange, errors }: CompanyDocumentsStepProps) {
  return (
    <div className="space-y-6">
      <FileUpload
        label="مدارک ثبت شرکت"
        accept="image/*,.pdf"
        preview={false}
        value={data.companyDocuments?.[0]}
        onChange={(file) => onChange({ companyDocuments: file ? [file] : [] })}
        error={errors.companyDocuments}
      />

      <div className="bg-accent/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          مدارک مورد نیاز: روزنامه رسمی، اساسنامه، آگهی تأسیس یا هر مدرک معتبر دیگری که نشان‌دهنده ثبت رسمی شرکت باشد.
        </p>
      </div>
    </div>
  )
}
