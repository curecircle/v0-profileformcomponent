"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, File, Camera, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { validateFileSize, validateFileType } from "@/lib/validation"

interface MultiFileUploadProps {
  label: string
  accept?: string
  maxSizeMB?: number
  maxFiles?: number
  allowedTypes: string[]
  value?: File[]
  onChange: (files: File[]) => void
  error?: string
  className?: string
  enableCamera?: boolean
}

export function MultiFileUpload({
  label,
  accept = "image/jpeg,image/png,application/pdf",
  maxSizeMB = 10,
  maxFiles = 5,
  allowedTypes,
  value = [],
  onChange,
  error,
  className,
  enableCamera = false,
}: MultiFileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({})
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return

    const errors: Record<string, string> = {}
    const validFiles: File[] = []

    Array.from(newFiles).forEach((file) => {
      if (!validateFileSize(file, maxSizeMB)) {
        errors[file.name] =
          `حجم فایل ${file.name} برابر ${(file.size / (1024 * 1024)).toFixed(2)} مگابایت است. حداکثر حجم مجاز ${maxSizeMB} مگابایت می‌باشد.`
        return
      }

      if (!validateFileType(file, allowedTypes)) {
        errors[file.name] = `فرمت فایل ${file.name} پشتیبانی نمی‌شود. فرمت‌های مجاز: ${allowedTypes.join(", ")}`
        return
      }

      validFiles.push(file)
    })

    setFileErrors(errors)

    if (validFiles.length > 0) {
      const updatedFiles = [...value, ...validFiles].slice(0, maxFiles)
      onChange(updatedFiles)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    handleFiles(e.target.files)
  }

  const handleRemove = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index)
    onChange(newFiles)
  }

  const handleCameraCapture = () => {
    if (inputRef.current) {
      inputRef.current.setAttribute("capture", "environment")
      inputRef.current.click()
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-foreground">{label}</label>

      {value.length > 0 && (
        <div className="space-y-2 mb-4">
          {value.map((file, index) => (
            <div key={index} className="flex items-center justify-between border rounded-lg p-3 bg-card">
              <div className="flex items-center gap-3">
                <File className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={() => handleRemove(index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {Object.entries(fileErrors).map(([fileName, errorMsg]) => (
        <div key={fileName} className="flex items-start gap-2 text-xs text-destructive bg-destructive/10 p-2 rounded">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      ))}

      {value.length < maxFiles && (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer",
            dragActive ? "border-primary bg-accent" : "border-border hover:border-primary hover:bg-accent/50",
            error && "border-destructive",
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input ref={inputRef} type="file" accept={accept} onChange={handleChange} multiple className="hidden" />

          <div className="flex flex-col items-center gap-3 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">فایل را اینجا رها کنید یا کلیک کنید</p>
              {enableCamera && (
                <div className="mt-2 flex justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCameraCapture()
                    }}
                  >
                    <Camera className="w-4 h-4 ml-2" />
                    عکس بگیرید
                  </Button>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                حداکثر {maxFiles} فایل، هر فایل حداکثر {maxSizeMB} مگابایت
              </p>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
