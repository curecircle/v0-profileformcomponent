export interface Country {
  id: string
  name: string
  nameEn: string
  code: string
}

export interface Province {
  id: string
  name: string
  nameEn: string
  countryId: string
}

export interface City {
  id: string
  name: string
  nameEn: string
  provinceId: string
}

// Sample data - in production, this would come from an API
export const countries: Country[] = [
  { id: "1", name: "ایران", nameEn: "Iran", code: "+98" },
  { id: "2", name: "عراق", nameEn: "Iraq", code: "+964" },
  { id: "3", name: "ترکیه", nameEn: "Turkey", code: "+90" },
  { id: "4", name: "افغانستان", nameEn: "Afghanistan", code: "+93" },
]

export const provinces: Province[] = [
  { id: "1", name: "تهران", nameEn: "Tehran", countryId: "1" },
  { id: "2", name: "اصفهان", nameEn: "Isfahan", countryId: "1" },
  { id: "3", name: "شیراز", nameEn: "Shiraz", countryId: "1" },
  { id: "4", name: "مشهد", nameEn: "Mashhad", countryId: "1" },
  { id: "5", name: "تبریز", nameEn: "Tabriz", countryId: "1" },
  { id: "6", name: "بغداد", nameEn: "Baghdad", countryId: "2" },
  { id: "7", name: "استانبول", nameEn: "Istanbul", countryId: "3" },
  { id: "8", name: "کابل", nameEn: "Kabul", countryId: "4" },
]

export const cities: City[] = [
  { id: "1", name: "تهران", nameEn: "Tehran", provinceId: "1" },
  { id: "2", name: "کرج", nameEn: "Karaj", provinceId: "1" },
  { id: "3", name: "اصفهان", nameEn: "Isfahan", provinceId: "2" },
  { id: "4", name: "کاشان", nameEn: "Kashan", provinceId: "2" },
  { id: "5", name: "شیراز", nameEn: "Shiraz", provinceId: "3" },
  { id: "6", name: "مشهد", nameEn: "Mashhad", provinceId: "4" },
  { id: "7", name: "تبریز", nameEn: "Tabriz", provinceId: "5" },
  { id: "8", name: "بغداد", nameEn: "Baghdad", provinceId: "6" },
  { id: "9", name: "استانبول", nameEn: "Istanbul", provinceId: "7" },
  { id: "10", name: "کابل", nameEn: "Kabul", provinceId: "8" },
]

export function getProvincesByCountry(countryId: string): Province[] {
  return provinces.filter((p) => p.countryId === countryId)
}

export function getCitiesByProvince(provinceId: string): City[] {
  return cities.filter((c) => c.provinceId === provinceId)
}
