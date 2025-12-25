"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { SearchableSelect, type SelectOption } from "@/components/ui/searchable-select"
import { MonthYearPicker } from "../month-year-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, GraduationCap, Edit2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DoctorData, EducationRecord, EducationStatus } from "@/lib/types"
import { universities } from "@/lib/data/universities"
import { degrees } from "@/lib/data/degrees"
import { specialties } from "@/lib/data/specialties"
import { fieldsOfStudy } from "@/lib/data/fields-of-study"

interface EducationRecordFormProps {
  data: Partial<DoctorData>
  onChange: (data: Partial<DoctorData>) => void
  errors: Record<string, string>
}

const statusOptions: { value: EducationStatus; label: string }[] = [
  { value: "studying", label: "Currently Studying" },
  { value: "graduated", label: "Graduated" },
  { value: "dropout", label: "Dropped Out" },
  { value: "leave", label: "On Leave" },
  { value: "expelled", label: "Expelled" },
]

const specialtyRequiredDegrees = ["residency", "subspecialty", "fellowship", "research_assistant"]

export function EducationRecordForm({ data, onChange, errors }: EducationRecordFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [currentRecord, setCurrentRecord] = useState<Partial<EducationRecord>>({
    id: crypto.randomUUID(),
    status: "studying",
  })

  const educations = data.educations || []

  const universityOptions: SelectOption[] = universities.map((u) => ({
    value: u.id,
    label: u.name_en,
  }))

  const degreeOptions: SelectOption[] = degrees.map((d) => ({
    value: d.id,
    label: d.name_en,
  }))

  const fieldOfStudyOptions: SelectOption[] = fieldsOfStudy.map((f) => ({
    value: f.id,
    label: f.name_en,
  }))

  const getFilteredSpecialtyOptions = (): SelectOption[] => {
    if (!currentRecord.degreeId) return []

    const selectedDegree = degrees.find((d) => d.id === currentRecord.degreeId)
    if (!selectedDegree) return []

    return specialties.map((s) => ({
      value: s.id,
      label: s.name, // Using English name
    }))
  }

  const isSpecialtyRequired = () => {
    if (!currentRecord.degreeId) return false
    const selectedDegree = degrees.find((d) => d.id === currentRecord.degreeId)
    return selectedDegree ? specialtyRequiredDegrees.includes(selectedDegree.code) : false
  }

  const handleAddOrUpdate = () => {
    if (
      !currentRecord.universityId ||
      !currentRecord.degreeId ||
      !currentRecord.major ||
      !currentRecord.startYear ||
      !currentRecord.startMonth ||
      !currentRecord.status
    ) {
      alert("Please fill in all required fields")
      return
    }

    if (isSpecialtyRequired() && !currentRecord.specialtyId) {
      alert("Please select a specialty")
      return
    }

    if (currentRecord.status === "studying") {
      const hasOtherStudying = educations.some((edu, idx) => edu.status === "studying" && idx !== editingIndex)
      if (hasOtherStudying) {
        alert("You can only have one education record with 'Currently Studying' status")
        return
      }
    }

    if (editingIndex !== null) {
      const updatedEducations = [...educations]
      updatedEducations[editingIndex] = currentRecord as EducationRecord
      onChange({ educations: updatedEducations })
      setEditingIndex(null)
    } else {
      onChange({ educations: [...educations, currentRecord as EducationRecord] })
    }

    setCurrentRecord({
      id: crypto.randomUUID(),
      status: "studying",
    })
  }

  const handleEdit = (index: number) => {
    setCurrentRecord(educations[index])
    setEditingIndex(index)
  }

  const handleDelete = (index: number) => {
    const updatedEducations = educations.filter((_, i) => i !== index)
    onChange({ educations: updatedEducations })
  }

  const handleCancel = () => {
    setCurrentRecord({
      id: crypto.randomUUID(),
      status: "studying",
    })
    setEditingIndex(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <GraduationCap className="h-5 w-5" />
        <span className="text-sm font-medium">Education History</span>
      </div>

      {educations.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Saved Education Records:</h3>
          {educations.map((edu, index) => {
            const university = universities.find((u) => u.id === edu.universityId)
            const degree = degrees.find((d) => d.id === edu.degreeId)
            const specialty = specialties.find((s) => s.id === edu.specialtyId)
            const field = fieldsOfStudy.find((f) => f.id === edu.major)
            const status = statusOptions.find((s) => s.value === edu.status)

            return (
              <Card key={edu.id} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>
                      {degree?.name_en} - {university?.name_en}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(index)} className="gap-1">
                        <Edit2 className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(index)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-1">
                  <p>Field of Study: {field?.name_en || edu.major}</p>
                  {specialty && <p>Specialty: {specialty.name}</p>}
                  <p>
                    Start: {edu.startMonth}/{edu.startYear}
                    {edu.endYear && edu.endMonth && ` - End: ${edu.endMonth}/${edu.endYear}`}
                  </p>
                  <p>Status: {status?.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {editingIndex !== null ? "Edit Education Record" : "Add New Education Record"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>University *</Label>
            <SearchableSelect
              options={universityOptions}
              value={currentRecord.universityId}
              onValueChange={(value) => setCurrentRecord({ ...currentRecord, universityId: value })}
              placeholder="Select university"
              searchPlaceholder="Search university..."
              emptyText="No university found"
            />
          </div>

          <div className="space-y-2">
            <Label>Degree Level *</Label>
            <SearchableSelect
              options={degreeOptions}
              value={currentRecord.degreeId}
              onValueChange={(value) => {
                setCurrentRecord({ ...currentRecord, degreeId: value, specialtyId: undefined })
              }}
              placeholder="Select degree"
              searchPlaceholder="Search degree..."
              emptyText="No degree found"
            />
          </div>

          <div className="space-y-2">
            <Label>Field of Study *</Label>
            <SearchableSelect
              options={fieldOfStudyOptions}
              value={currentRecord.major}
              onValueChange={(value) => setCurrentRecord({ ...currentRecord, major: value })}
              placeholder="Select field of study"
              searchPlaceholder="Search field..."
              emptyText="No field found"
            />
          </div>

          {isSpecialtyRequired() && (
            <div className="space-y-2">
              <Label>Specialty *</Label>
              <SearchableSelect
                options={getFilteredSpecialtyOptions()}
                value={currentRecord.specialtyId}
                onValueChange={(value) => setCurrentRecord({ ...currentRecord, specialtyId: value })}
                placeholder="Select specialty"
                searchPlaceholder="Search specialty..."
                emptyText="No specialty found"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <MonthYearPicker
                year={currentRecord.startYear}
                month={currentRecord.startMonth}
                setYear={(year) => setCurrentRecord({ ...currentRecord, startYear: year })}
                setMonth={(month) => setCurrentRecord({ ...currentRecord, startMonth: month })}
                placeholder="Select start date"
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <MonthYearPicker
                year={currentRecord.endYear}
                month={currentRecord.endMonth}
                setYear={(year) => setCurrentRecord({ ...currentRecord, endYear: year })}
                setMonth={(month) => setCurrentRecord({ ...currentRecord, endMonth: month })}
                placeholder="Select end date"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Education Status *</Label>
            <Select
              value={currentRecord.status}
              onValueChange={(value) => setCurrentRecord({ ...currentRecord, status: value as EducationStatus })}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={handleAddOrUpdate} className="flex-1 gap-2">
              <Plus className="h-4 w-4" />
              {editingIndex !== null ? "Save Changes" : "Add Record"}
            </Button>
            {editingIndex !== null && (
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {errors.educations && <p className="text-xs text-destructive">{errors.educations}</p>}
    </div>
  )
}
