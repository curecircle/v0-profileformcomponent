export type UserRole = "doctor" | "company"
export type CompanyRole = "manager" | "representative"
export type EducationStatus = "studying" | "graduated" | "dropout" | "leave" | "expelled"

export interface BaseFormData {
  firstName: string
  lastName: string
  username: string
  password: string
  confirmPassword?: string
}

export interface IdentityData {
  nationalId?: string
  fidaCode?: string
  birthDate: string | Date
  gender: "male" | "female" | "other"
  fatherName?: string
  nationality?: string
  mrzRawData?: string
  firstName?: string
  lastName?: string
  scanSource?: "barcode" | "mrz" | "full-passport"
}

export interface LocationData {
  mobile: string
  country: string
  province: string
  city: string
}

export interface EducationRecord {
  id: string
  universityId: string
  degreeId: string
  specialtyId?: string
  major: string
  startYear: string
  startMonth?: string
  endYear?: string
  endMonth?: string
  status: EducationStatus
}

export interface DoctorData extends BaseFormData, IdentityData, LocationData {
  educations: EducationRecord[]
  documents?: File[]
  profileImage?: File
  acceptedTerms?: boolean
}

export interface SelectedProductCategory {
  categoryId: string
  categoryName: string
  subcategoryId: string
  subcategoryName: string
  customName?: string
}

export interface CompanyManagerData extends LocationData {
  companyName: string
  companyType: string
  foundingYear: string
  registrationNumber: string
  managerFirstName: string
  managerLastName: string
  username: string
  password: string
  managerNationalId: string
  productCategories: SelectedProductCategory[]
  workLines: WorkLine[]
  representatives: Representative[]
  companyDocuments?: File[]
}

export interface CompanyRepresentativeData extends BaseFormData, IdentityData, LocationData {
  companyId: string
  companyName: string
  identityDocuments?: File[]
  profileImage?: File
}

export interface WorkLine {
  id: string
  name: string
}

export interface Representative {
  id: string
  fullName: string
  mobile: string
  assignedLines: string[]
}

export interface RegistrationState {
  role: UserRole | null
  companyRole?: CompanyRole
  currentStep: number
  formData: Partial<DoctorData | CompanyManagerData | CompanyRepresentativeData>
}
