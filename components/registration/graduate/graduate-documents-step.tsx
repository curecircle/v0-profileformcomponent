"use client"

import { FileUpload } from "../file-upload"
import type { GraduateData } from "@/lib/types"

interface GraduateDocumentsStepProps {
  data: Partial<GraduateData>
  onChange: (data: Partial<GraduateData>) => void
  errors: Record<string, string>
}

export function GraduateDocumentsStep({ data, onChange, errors }: GraduateDocumentsStepProps) {
  return (
    <div className="space-y-6">
      <FileUpload
        label="مدرک تحصیلی"
        accept="image/*,.pdf"
        preview={true}
        value={data.diplomaFile}
        onChange={(file) => onChange({ diplomaFile: file })}
        error={errors.diplomaFile}
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
          توجه: مدرک تحصیلی باید شامل مهر و امضای دانشگاه باشد. حجم هر فایل نباید بیشتر از ۵ مگابایت باشد.
        </p>
      </div>
    </div>
  )
}
