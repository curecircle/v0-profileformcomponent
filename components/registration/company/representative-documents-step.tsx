"use client"

import { FileUpload } from "../file-upload"
import type { CompanyRepresentativeData } from "@/lib/types"

interface RepresentativeDocumentsStepProps {
  data: Partial<CompanyRepresentativeData>
  onChange: (data: Partial<CompanyRepresentativeData>) => void
  errors: Record<string, string>
}

export function RepresentativeDocumentsStep({ data, onChange, errors }: RepresentativeDocumentsStepProps) {
  return (
    <div className="space-y-6">
      <FileUpload
        label="مدارک شناسایی"
        accept="image/*,.pdf"
        preview={true}
        value={data.identityDocuments?.[0]}
        onChange={(file) => onChange({ identityDocuments: file ? [file] : [] })}
        error={errors.identityDocuments}
      />

      <FileUpload
        label="عکس پروفایل"
        accept="image/*"
        preview={true}
        value={data.profileImage}
        onChange={(file) => onChange({ profileImage: file })}
        error={errors.profileImage}
      />

      <div className="bg-accent/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          مدارک شناسایی می‌تواند شامل کارت ملی، شناسنامه یا گواهینامه باشد. حجم هر فایل نباید بیشتر از ۵ مگابایت باشد.
        </p>
      </div>
    </div>
  )
}
