"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, Send, KeyRound, AlertCircle, CheckCircle } from "lucide-react"

type LoginMode = "otp" | "credentials"

export function OTPLogin() {
  const [mode, setMode] = useState<LoginMode>("otp")
  const [mobile, setMobile] = useState("")
  const [messengers, setMessengers] = useState<string[]>([])
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [attempts, setAttempts] = useState(0)
  const maxAttempts = 3

  const toggleMessenger = (messenger: string) => {
    setMessengers((prev) => (prev.includes(messenger) ? prev.filter((m) => m !== messenger) : [...prev, messenger]))
  }

  const handleRequestOTP = async () => {
    setError("")
    setSuccess("")

    if (!mobile.trim()) {
      setError("لطفاً شماره موبایل را وارد کنید")
      return
    }

    if (messengers.length === 0) {
      setError("لطفاً حداقل یک پیام‌رسان را انتخاب کنید")
      return
    }

    if (attempts >= maxAttempts) {
      setError("تعداد درخواست‌های شما به حد مجاز رسیده است. لطفاً یک ساعت بعد تلاش کنید.")
      return
    }

    // Simulate OTP request
    console.log("[v0] Requesting OTP for:", mobile, "via", messengers)
    setAttempts((prev) => prev + 1)
    setOtpSent(true)
    setSuccess("کد تأیید ۶ رقمی به پیام‌رسان‌های انتخابی ارسال شد")
  }

  const handleVerifyOTP = async () => {
    setError("")
    setSuccess("")

    if (otp.length !== 6) {
      setError("لطفاً کد ۶ رقمی را کامل وارد کنید")
      return
    }

    // Simulate OTP verification
    console.log("[v0] Verifying OTP:", otp)
    alert("ورود با موفقیت انجام شد!")
  }

  const handleCredentialsLogin = async () => {
    setError("")
    setSuccess("")

    if (!username.trim() || !password.trim()) {
      setError("لطفاً نام کاربری و رمز عبور را وارد کنید")
      return
    }

    // Simulate credentials login
    console.log("[v0] Login with credentials:", username)
    alert("ورود با موفقیت انجام شد!")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">ورود رابطین شرکت</h1>
          <p className="text-muted-foreground">به پلتفرم پزشکی خوش آمدید</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>ورود به حساب کاربری</CardTitle>
            <CardDescription>
              {mode === "otp" ? "رمز یکبار مصرف به شماره موبایل شما ارسال می‌شود" : "با نام کاربری و رمز عبور وارد شوید"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {mode === "otp" ? (
              <>
                {!otpSent ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile">شماره موبایل</Label>
                      <Input
                        id="mobile"
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        dir="ltr"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>انتخاب پیام‌رسان</Label>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="ita"
                            checked={messengers.includes("ita")}
                            onCheckedChange={() => toggleMessenger("ita")}
                          />
                          <Label htmlFor="ita" className="cursor-pointer font-normal">
                            ایتا
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="telegram"
                            checked={messengers.includes("telegram")}
                            onCheckedChange={() => toggleMessenger("telegram")}
                          />
                          <Label htmlFor="telegram" className="cursor-pointer font-normal">
                            تلگرام
                          </Label>
                        </div>
                      </div>
                    </div>

                    {attempts > 0 && (
                      <Alert>
                        <MessageSquare className="h-4 w-4" />
                        <AlertDescription>
                          تعداد درخواست: {attempts} از {maxAttempts}
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button onClick={handleRequestOTP} className="w-full" size="lg">
                      <Send className="h-4 w-4 ml-2" />
                      دریافت رمز یکبار مصرف
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert className="border-success bg-success/5">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <AlertDescription className="text-success-foreground">{success}</AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <Label htmlFor="otp">کد تأیید ۶ رقمی</Label>
                      <div className="flex justify-center" dir="ltr">
                        <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <p className="text-xs text-center text-muted-foreground">کد تأیید تا ۳ دقیقه اعتبار دارد</p>
                    </div>

                    <Button onClick={handleVerifyOTP} className="w-full" size="lg">
                      <KeyRound className="h-4 w-4 ml-2" />
                      تأیید و ورود
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        setOtpSent(false)
                        setOtp("")
                      }}
                      className="w-full"
                    >
                      ارسال مجدد کد
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">نام کاربری</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="نام کاربری خود را وارد کنید"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">رمز عبور</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="رمز عبور خود را وارد کنید"
                  />
                </div>

                <Button onClick={handleCredentialsLogin} className="w-full" size="lg">
                  ورود
                </Button>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="relative">
              <Separator />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                یا
              </span>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setMode(mode === "otp" ? "credentials" : "otp")
                setError("")
                setSuccess("")
              }}
              className="w-full"
            >
              {mode === "otp" ? "ورود با نام کاربری و رمز عبور" : "ورود با رمز یکبار مصرف"}
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>حساب کاربری ندارید؟</p>
          <Button variant="link" className="p-0 h-auto">
            ثبت‌نام کنید
          </Button>
        </div>
      </div>
    </div>
  )
}
