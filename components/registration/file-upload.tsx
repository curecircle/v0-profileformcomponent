"use client"

import type React from "react"

import { useState, useRef, type ChangeEvent } from "react"
import { Upload, X, File, ImageIcon, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  label: string
  accept?: string
  maxSizeMB?: number
  preview?: boolean
  value?: File
  onChange: (file: File | undefined) => void
  error?: string
  className?: string
}

export function FileUpload({
  label,
  accept = "image/*,.pdf",
  maxSizeMB = 5,
  preview = false,
  value,
  onChange,
  error,
  className,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(
        `خطا: حجم فایل انتخاب شده ${(file.size / (1024 * 1024)).toFixed(2)} مگابایت است. حداکثر حجم مجاز ${maxSizeMB} مگابایت می‌باشد.`,
      )
      return
    }

    onChange(file)

    if (preview && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = () => {
    if (inputRef.current) {
      inputRef.current.click()
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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleRemove = () => {
    onChange(undefined)
    setPreviewUrl("")
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-foreground">{label}</label>

      {value ? (
        <div className="relative border-2 border-border rounded-lg p-4 bg-card">
          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <File className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{value.name}</p>
                  <p className="text-xs text-muted-foreground">{(value.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={handleRemove}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ) : (
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
          <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />

          <div className="flex flex-col items-center gap-3 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              {preview ? <ImageIcon className="h-8 w-8 text-primary" /> : <Upload className="h-8 w-8 text-primary" />}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">فایل را اینجا رها کنید یا کلیک کنید</p>
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
                  استفاده از دوربین
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">حداکثر حجم: {maxSizeMB} مگابایت</p>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
