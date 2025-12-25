"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { DoctorData } from "@/lib/types"
import { Camera, Upload, Info, X, RefreshCw } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ProfilePictureStepProps {
  data: Partial<DoctorData>
  onChange: (data: Partial<DoctorData>) => void
  errors: Record<string, string>
}

export function ProfilePictureStep({ data, onChange, errors }: ProfilePictureStepProps) {
  const [showCamera, setShowCamera] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      })
      setStream(mediaStream)
      setShowCamera(true)

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
          videoRef.current.play()
        }
      }, 100)
    } catch (error) {
      console.error("Camera error:", error)
      alert("Could not access camera. Please check permissions.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setShowCamera(false)
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0)

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], "selfie.jpg", { type: "image/jpeg" })
          onChange({ profileImage: file })
          stopCamera()
        }
      },
      "image/jpeg",
      0.9,
    )
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }
      onChange({ profileImage: file })
    }
  }

  const removeImage = () => {
    onChange({ profileImage: undefined })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const previewUrl = data.profileImage ? URL.createObjectURL(data.profileImage) : null

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <Camera className="h-5 w-5" />
        <span className="text-sm font-medium">Profile Picture</span>
      </div>

      {previewUrl ? (
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={previewUrl || "/placeholder.svg"}
              alt="Profile preview"
              className="w-48 h-48 rounded-full object-cover border-4 border-primary/20"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" onClick={removeImage} className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Change Photo
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:border-primary transition-colors" onClick={startCamera}>
            <CardContent className="flex flex-col items-center justify-center p-8 gap-3">
              <div className="p-4 rounded-full bg-primary/10">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <span className="font-medium">Take a Selfie</span>
              <span className="text-xs text-muted-foreground text-center">Use your camera to take a photo</span>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <CardContent className="flex flex-col items-center justify-center p-8 gap-3">
              <div className="p-4 rounded-full bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <span className="font-medium">Upload Photo</span>
              <span className="text-xs text-muted-foreground text-center">Select an image from your device</span>
            </CardContent>
          </Card>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      <canvas ref={canvasRef} className="hidden" />

      <Dialog open={showCamera} onOpenChange={(open) => !open && stopCamera()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Take a Selfie</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full aspect-[4/3] bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ transform: "scaleX(-1)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 border-4 border-white/50 rounded-full" />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={stopCamera}>
                Cancel
              </Button>
              <Button onClick={capturePhoto} className="gap-2">
                <Camera className="h-4 w-4" />
                Capture
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="bg-muted/50 p-4 rounded-lg flex gap-3">
        <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          Your profile picture should be in JPEG, PNG, or WebP format. Maximum size: 5MB. Please use a photo where your
          face is clearly visible.
        </p>
      </div>

      {errors.profileImage && <p className="text-xs text-destructive">{errors.profileImage}</p>}
    </div>
  )
}
