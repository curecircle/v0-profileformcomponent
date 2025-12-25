export function validateNationalId(id: string): boolean {
  if (!/^\d{10}$/.test(id)) return false

  const check = Number.parseInt(id[9])
  const sum = id
    .split("")
    .slice(0, 9)
    .reduce((acc, digit, index) => {
      return acc + Number.parseInt(digit) * (10 - index)
    }, 0)

  const remainder = sum % 11
  return (remainder < 2 && check === remainder) || (remainder >= 2 && check === 11 - remainder)
}

export function validateMobile(mobile: string): boolean {
  return /^[\d\s+\-$$$$]+$/.test(mobile) && mobile.replace(/\D/g, "").length >= 10
}

export function validateUsername(username: string): { valid: boolean; message?: string } {
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
    return { valid: false, message: "نام کاربری باید فقط شامل حروف لاتین، اعداد و _ باشد (۳ تا ۲۰ کاراکتر)" }
  }
  return { valid: true }
}

export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: "رمز عبور باید حداقل ۸ کاراکتر باشد" }
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "رمز عبور باید شامل حداقل یک حرف بزرگ باشد" }
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "رمز عبور باید شامل حداقل یک حرف کوچک باشد" }
  }
  if (!/\d/.test(password)) {
    return { valid: false, message: "رمز عبور باید شامل حداقل یک عدد باشد" }
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { valid: false, message: "رمز عبور باید شامل حداقل یک کاراکتر خاص باشد" }
  }
  return { valid: true }
}

export function validateFileSize(file: File, maxSizeMB = 5): boolean {
  return file.size <= maxSizeMB * 1024 * 1024
}

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.some((type) => {
    if (type.endsWith("/*")) {
      const baseType = type.split("/")[0]
      return file.type.startsWith(baseType + "/")
    }
    return file.type === type
  })
}

export function validateNumericInput(value: string): boolean {
  return /^\d+$/.test(value)
}

export function validateFidaCode(code: string): boolean {
  // FIDA code format: typically alphanumeric, 6-12 characters
  // This is a basic validation - adjust based on actual FIDA code rules
  if (!code || code.length < 6 || code.length > 12) return false
  return /^[A-Z0-9]+$/.test(code.toUpperCase())
}
