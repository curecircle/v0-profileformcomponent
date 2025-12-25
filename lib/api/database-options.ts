// API functions to fetch options from database
// In real app, these would be server actions or API routes

export interface Province {
  id: string
  name: string
  name_en: string
}

export interface City {
  id: string
  name: string
  name_en: string
  province_id: string
}

export interface University {
  id: string
  name: string
  name_en: string
  type: 'public' | 'private' | 'payam_nur' | 'azad' | 'applied_science' | 'other'
  city_id: string
}

export interface Degree {
  id: string
  name: string
  name_en: string
  level: number
}

export interface Specialty {
  id: string
  name: string
  name_en: string
  faculty_id: string
}

export interface Faculty {
  id: string
  name: string
  name_en: string
}

// Mock data - در پروژه واقعی باید از Supabase fetch شود
export async function getProvinces(): Promise<Province[]> {
  // TODO: Fetch from Supabase
  // const { data } = await supabase.from('provinces').select('*')
  return [
    { id: '1', name: 'تهران', name_en: 'Tehran' },
    { id: '2', name: 'اصفهان', name_en: 'Isfahan' },
    { id: '3', name: 'فارس', name_en: 'Fars' },
    { id: '4', name: 'خراسان رضوی', name_en: 'Khorasan Razavi' },
  ]
}

export async function getCities(provinceId?: string): Promise<City[]> {
  // TODO: Fetch from Supabase with filter
  // const { data } = await supabase.from('cities').select('*').eq('province_id', provinceId)
  return [
    { id: '1', name: 'تهران', name_en: 'Tehran', province_id: '1' },
    { id: '2', name: 'کرج', name_en: 'Karaj', province_id: '1' },
    { id: '3', name: 'اصفهان', name_en: 'Isfahan', province_id: '2' },
    { id: '4', name: 'شیراز', name_en: 'Shiraz', province_id: '3' },
  ]
}

export async function getUniversities(cityId?: string): Promise<University[]> {
  // TODO: Fetch from Supabase
  return [
    { id: '1', name: 'دانشگاه تهران', name_en: 'University of Tehran', type: 'public', city_id: '1' },
    { id: '2', name: 'دانشگاه صنعتی شریف', name_en: 'Sharif University of Technology', type: 'public', city_id: '1' },
    { id: '3', name: 'دانشگاه اصفهان', name_en: 'University of Isfahan', type: 'public', city_id: '3' },
  ]
}

export async function getDegrees(): Promise<Degree[]> {
  // TODO: Fetch from Supabase
  return [
    { id: '1', name: 'کاردانی', name_en: 'Associate', level: 1 },
    { id: '2', name: 'کارشناسی', name_en: 'Bachelor', level: 2 },
    { id: '3', name: 'کارشناسی ارشد', name_en: 'Master', level: 3 },
    { id: '4', name: 'دکتری', name_en: 'PhD', level: 4 },
  ]
}

export async function getFaculties(): Promise<Faculty[]> {
  // TODO: Fetch from Supabase
  return [
    { id: '1', name: 'فنی و مهندسی', name_en: 'Engineering' },
    { id: '2', name: 'علوم پایه', name_en: 'Basic Sciences' },
    { id: '3', name: 'علوم انسانی', name_en: 'Humanities' },
    { id: '4', name: 'هنر و معماری', name_en: 'Art and Architecture' },
  ]
}

export async function getSpecialties(facultyId?: string): Promise<Specialty[]> {
  // TODO: Fetch from Supabase
  return [
    { id: '1', name: 'مهندسی کامپیوتر', name_en: 'Computer Engineering', faculty_id: '1' },
    { id: '2', name: 'مهندسی برق', name_en: 'Electrical Engineering', faculty_id: '1' },
    { id: '3', name: 'ریاضی', name_en: 'Mathematics', faculty_id: '2' },
    { id: '4', name: 'فیزیک', name_en: 'Physics', faculty_id: '2' },
  ]
}
