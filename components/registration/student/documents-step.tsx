"use client"

import { MultiFileUpload } from "../multi-file-upload"
import type { DoctorData } from "@/lib/types"
import { FileText, Info } from "lucide-react"

interface DocumentsStepProps {
  data: Partial<DoctorData>
  onChange: (data: Partial<DoctorData>) => void
  errors: Record<string, string>
}

export function DocumentsStep({ data, onChange, errors }: DocumentsStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <FileText className="h-5 w-5" />
        <span className="text-sm font-medium">Upload Educational Documents</span>
      </div>

      <MultiFileUpload
        label="Educational Documents (Multiple Files)"
        accept="image/jpeg,image/png,application/pdf"
        maxSizeMB={10}
        maxFiles={5}
        allowedTypes={["image/jpeg", "image/png", "application/pdf"]}
        value={data.documents}
        onChange={(files) => onChange({ documents: files })}
        error={errors.documents}
        enableCamera={true}
      />

      <div className="bg-muted/50 p-4 rounded-lg flex gap-3">
        <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          Your documents must be clear and readable. Accepted formats: JPEG, PNG, PDF. Maximum file size: 10MB. Maximum
          5 files.
        </p>
      </div>
    </div>
  )
}
