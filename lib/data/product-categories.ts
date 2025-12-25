export interface ProductSubCategory {
  id: string
  name: string
}

export interface ProductCategory {
  id: string
  name: string
  subcategories: ProductSubCategory[]
}

export const productCategories: ProductCategory[] = [
  {
    id: "orthopedic",
    name: "Orthopedic Equipment & Bone Implants",
    subcategories: [
      { id: "trauma-implant", name: "Trauma Bone Implants" },
      { id: "maxillofacial-implant", name: "Maxillofacial & Skull Bone Implants" },
      { id: "bio-materials", name: "Bone Bio-materials" },
      { id: "absorbable-implant", name: "Absorbable Bone Implants" },
      { id: "external-fixators", name: "External Bone Fixators" },
      { id: "spine-implant", name: "Spine Implants" },
      { id: "sports-medicine", name: "Sports Medicine Implants" },
      { id: "foot-implant", name: "Foot Implants (Ankle, Heel & Toes)" },
      { id: "hand-elbow-implant", name: "Hand & Elbow Bone Implants" },
      { id: "chest-implant", name: "Chest Bone Implants" },
    ],
  },
  {
    id: "specialty-medical",
    name: "Specialty Medical Equipment & Consumables",
    subcategories: [
      { id: "cardiovascular", name: "Cardiovascular: Devices & Consumables" },
      { id: "urology-nephrology", name: "Urology & Nephrology: Devices & Consumables" },
      { id: "neurology", name: "Neurology: Devices & Consumables" },
      { id: "ophthalmology", name: "Ophthalmology: Devices & Consumables" },
      { id: "ent", name: "ENT (Ear, Nose, Throat): Devices & Consumables" },
      { id: "gynecology", name: "Gynecology & Infertility: Devices & Consumables" },
      { id: "dermatology", name: "Dermatology & Aesthetics: Devices & Consumables" },
      { id: "gastroenterology", name: "Gastroenterology & Endoscopy: Devices & Consumables" },
      { id: "pediatrics", name: "Pediatrics & Neonatal: Devices" },
    ],
  },
  {
    id: "medical-imaging",
    name: "Medical Imaging",
    subcategories: [
      { id: "imaging-devices", name: "Imaging Devices" },
      { id: "imaging-tools", name: "Imaging Tools" },
      { id: "contrast-injector", name: "Contrast Injector & Parts" },
      { id: "nuclear-medicine", name: "Nuclear Medicine: Devices" },
      { id: "radiotherapy", name: "Radiotherapy & Cancer Treatment: Devices, Consumables & Accessories" },
      { id: "imaging-software", name: "Imaging Software" },
    ],
  },
  {
    id: "dental",
    name: "Dentistry",
    subcategories: [
      { id: "orthodontics", name: "Orthodontics: Consumables & Tools" },
      { id: "restorative", name: "Restorative: Devices, Consumables & Tools" },
      { id: "prosthetics", name: "Prosthetics: Devices, Consumables & Tools" },
      { id: "dental-lab", name: "Laboratory: Devices, Consumables & Tools" },
      { id: "oral-surgery", name: "Oral Surgery: Devices, Consumables & Tools" },
      { id: "dental-imaging", name: "Dental Imaging: Devices, Consumables & Tools" },
      { id: "general-dental", name: "General Dentistry: Devices, Consumables & Tools" },
      { id: "dental-laser", name: "Dental Diode Laser" },
    ],
  },
  {
    id: "laboratory-ivd",
    name: "Laboratory & Pathology (IVD)",
    subcategories: [
      { id: "clinical-chemistry", name: "Clinical Chemistry: Instruments & Reagents" },
      { id: "immunology", name: "Immunology: Instruments & Reagents" },
      { id: "microbiology", name: "Microbiology: Instruments & Reagents (Culture, Infectious Immunology)" },
      { id: "molecular-genetic", name: "Molecular Genetic: Instruments & Reagents" },
      { id: "general-lab", name: "General Laboratory Instruments" },
      { id: "hhc", name: "Home Health Care: Instruments & Reagents" },
      { id: "lab-raw-materials", name: "Laboratory Kit Raw Materials" },
    ],
  },
  {
    id: "anesthesia-icu",
    name: "Anesthesia, ICU & Respiratory",
    subcategories: [
      { id: "anesthesia", name: "Anesthesia" },
      { id: "respiratory", name: "Respiratory" },
      { id: "icu-inpatient", name: "ICU & Inpatient Care" },
      { id: "oxygen-tank", name: "Liquid Oxygen Tank & Cylinder" },
      { id: "oxygen-generator", name: "Oxygen Generator & Hospital Medical Air" },
      { id: "gas-valve-box", name: "Medical Gas Valve Box" },
      { id: "gas-alarm", name: "Medical Gas Alarm System" },
    ],
  },
  {
    id: "operating-room",
    name: "Operating Room & Surgery",
    subcategories: [
      { id: "or-equipment", name: "Operating Room Equipment" },
      { id: "general-surgery", name: "General Surgery: Devices & Consumables" },
      { id: "surgical-instruments", name: "Surgical Instruments" },
      { id: "examination-tools", name: "Examination Tools" },
    ],
  },
  {
    id: "physiotherapy",
    name: "Physiotherapy & Rehabilitation",
    subcategories: [
      { id: "physio-devices", name: "Devices" },
      { id: "physio-consumables", name: "Consumables" },
      { id: "physio-tools", name: "Tools" },
      { id: "physio-software", name: "Software" },
    ],
  },
  {
    id: "sterilization-csr",
    name: "Sterilization, Cleaning & Waste Management (CSR)",
    subcategories: [
      { id: "cleaning-sterilization", name: "Cleaning & Sterilization (CSR)" },
      { id: "suction-drainage", name: "Suction & Drainage" },
      { id: "waste-management", name: "Waste Management: Devices & Consumables" },
      { id: "high-level-disinfection", name: "High-Level Disinfection System" },
      { id: "packaging-device", name: "Medical Instrument Packaging Device" },
    ],
  },
  {
    id: "general-hospital",
    name: "General & Hospital Equipment",
    subcategories: [
      { id: "general-consumables", name: "General Consumables" },
      { id: "general-devices", name: "General Devices" },
      { id: "hoteling", name: "Hospital Hoteling" },
      { id: "central-vacuum", name: "Hospital Central Vacuum" },
      { id: "air-purification", name: "Air & Environment Purification & Disinfection" },
      { id: "uv-generator", name: "UV Generator & Germicidal Light" },
    ],
  },
  {
    id: "pharmacy-homecare",
    name: "Pharmacy & Home Care",
    subcategories: [
      { id: "pharmacy-consumables", name: "Pharmacy Consumables" },
      { id: "pharmacy-devices", name: "Pharmacy & Home Care Devices" },
      { id: "remote-monitoring", name: "Remote Health Monitoring" },
    ],
  },
  {
    id: "other",
    name: "Other",
    subcategories: [
      { id: "film-packaging", name: "Film & Packaging Paper" },
      { id: "crepe-paper", name: "Crepe Paper" },
      { id: "pvc-granule", name: "Medical Grade PVC Granule" },
      { id: "research-systems", name: "Research Medical Systems & Devices" },
      { id: "other-custom", name: "Other (Custom Entry)" },
    ],
  },
].sort((a, b) => a.name.localeCompare(b.name))

export function getProductCategories(): ProductCategory[] {
  return productCategories
}

export function getSubCategories(categoryId: string): ProductSubCategory[] {
  const category = productCategories.find((c) => c.id === categoryId)
  return category?.subcategories.sort((a, b) => a.name.localeCompare(b.name)) || []
}

export function getCategoryById(categoryId: string): ProductCategory | undefined {
  return productCategories.find((c) => c.id === categoryId)
}

export function getSubCategoryById(categoryId: string, subCategoryId: string): ProductSubCategory | undefined {
  const category = productCategories.find((c) => c.id === categoryId)
  return category?.subcategories.find((s) => s.id === subCategoryId)
}
