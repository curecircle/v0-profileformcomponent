export interface FieldOfStudy {
  id: string
  name_en: string
  category: string
}

export const fieldsOfStudy: FieldOfStudy[] = [
  // Medical Sciences
  { id: "fos-medicine", name_en: "Medicine", category: "Medical Sciences" },
  { id: "fos-nursing", name_en: "Nursing", category: "Medical Sciences" },
  { id: "fos-pharmacy", name_en: "Pharmacy", category: "Medical Sciences" },
  { id: "fos-dentistry", name_en: "Dentistry", category: "Medical Sciences" },
  { id: "fos-medical-lab", name_en: "Medical Laboratory Sciences", category: "Medical Sciences" },
  { id: "fos-radiology", name_en: "Radiology", category: "Medical Sciences" },
  { id: "fos-physiotherapy", name_en: "Physiotherapy", category: "Medical Sciences" },
  { id: "fos-nutrition", name_en: "Nutrition Sciences", category: "Medical Sciences" },
  { id: "fos-public-health", name_en: "Public Health", category: "Medical Sciences" },
  { id: "fos-midwifery", name_en: "Midwifery", category: "Medical Sciences" },
  { id: "fos-optometry", name_en: "Optometry", category: "Medical Sciences" },
  { id: "fos-audiology", name_en: "Audiology", category: "Medical Sciences" },
  { id: "fos-occupational-therapy", name_en: "Occupational Therapy", category: "Medical Sciences" },
  { id: "fos-speech-therapy", name_en: "Speech Therapy", category: "Medical Sciences" },
  { id: "fos-anesthesiology", name_en: "Anesthesiology", category: "Medical Sciences" },
  { id: "fos-emergency-medicine", name_en: "Emergency Medicine", category: "Medical Sciences" },
  // Basic Sciences
  { id: "fos-anatomy", name_en: "Anatomy", category: "Basic Sciences" },
  { id: "fos-physiology", name_en: "Physiology", category: "Basic Sciences" },
  { id: "fos-biochemistry", name_en: "Biochemistry", category: "Basic Sciences" },
  { id: "fos-microbiology", name_en: "Microbiology", category: "Basic Sciences" },
  { id: "fos-immunology", name_en: "Immunology", category: "Basic Sciences" },
  { id: "fos-pharmacology", name_en: "Pharmacology", category: "Basic Sciences" },
  { id: "fos-pathology", name_en: "Pathology", category: "Basic Sciences" },
  { id: "fos-genetics", name_en: "Genetics", category: "Basic Sciences" },
  { id: "fos-virology", name_en: "Virology", category: "Basic Sciences" },
  { id: "fos-parasitology", name_en: "Parasitology", category: "Basic Sciences" },
  // Clinical Sciences
  { id: "fos-internal-medicine", name_en: "Internal Medicine", category: "Clinical Sciences" },
  { id: "fos-surgery", name_en: "Surgery", category: "Clinical Sciences" },
  { id: "fos-pediatrics", name_en: "Pediatrics", category: "Clinical Sciences" },
  { id: "fos-obstetrics-gynecology", name_en: "Obstetrics & Gynecology", category: "Clinical Sciences" },
  { id: "fos-psychiatry", name_en: "Psychiatry", category: "Clinical Sciences" },
  { id: "fos-neurology", name_en: "Neurology", category: "Clinical Sciences" },
  { id: "fos-cardiology", name_en: "Cardiology", category: "Clinical Sciences" },
  { id: "fos-dermatology", name_en: "Dermatology", category: "Clinical Sciences" },
  { id: "fos-orthopedics", name_en: "Orthopedics", category: "Clinical Sciences" },
  { id: "fos-ophthalmology", name_en: "Ophthalmology", category: "Clinical Sciences" },
  { id: "fos-ent", name_en: "ENT (Otolaryngology)", category: "Clinical Sciences" },
  { id: "fos-urology", name_en: "Urology", category: "Clinical Sciences" },
  // Health Management
  { id: "fos-health-management", name_en: "Health Services Management", category: "Health Management" },
  { id: "fos-health-economics", name_en: "Health Economics", category: "Health Management" },
  { id: "fos-medical-informatics", name_en: "Medical Informatics", category: "Health Management" },
  { id: "fos-epidemiology", name_en: "Epidemiology", category: "Health Management" },
  { id: "fos-biostatistics", name_en: "Biostatistics", category: "Health Management" },
]

export function getFieldOfStudyById(id: string) {
  return fieldsOfStudy.find((f) => f.id === id)
}
