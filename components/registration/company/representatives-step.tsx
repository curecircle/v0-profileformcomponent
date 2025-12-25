"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, Users } from "lucide-react"
import type { CompanyManagerData, Representative, WorkLine } from "@/lib/types"

interface RepresentativesStepProps {
  data: Partial<CompanyManagerData>
  onChange: (data: Partial<CompanyManagerData>) => void
  workLines: WorkLine[]
}

export function RepresentativesStep({ data, onChange, workLines }: RepresentativesStepProps) {
  const [newRep, setNewRep] = useState({
    fullName: "",
    mobile: "",
    assignedLines: [] as string[],
  })

  const addRepresentative = () => {
    if (!newRep.fullName.trim() || !newRep.mobile.trim()) {
      alert("Please enter name and mobile number")
      return
    }

    const representative: Representative = {
      id: Date.now().toString(),
      fullName: newRep.fullName.trim(),
      mobile: newRep.mobile.trim(),
      assignedLines: newRep.assignedLines,
    }

    onChange({
      representatives: [...(data.representatives || []), representative],
    })

    setNewRep({
      fullName: "",
      mobile: "",
      assignedLines: [],
    })
  }

  const removeRepresentative = (id: string) => {
    onChange({
      representatives: (data.representatives || []).filter((rep) => rep.id !== id),
    })
  }

  const toggleLine = (lineId: string) => {
    const assigned = newRep.assignedLines.includes(lineId)
      ? newRep.assignedLines.filter((id) => id !== lineId)
      : [...newRep.assignedLines, lineId]

    setNewRep({ ...newRep, assignedLines: assigned })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Company Representatives</h3>
          <p className="text-sm text-muted-foreground">Add representatives and assign business lines to them</p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h4 className="font-semibold text-foreground">Add New Representative</h4>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="repName">Full Name</Label>
              <Input
                id="repName"
                value={newRep.fullName}
                onChange={(e) => setNewRep({ ...newRep, fullName: e.target.value })}
                placeholder="Representative full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repMobile">Mobile Number</Label>
              <Input
                id="repMobile"
                value={newRep.mobile}
                onChange={(e) => setNewRep({ ...newRep, mobile: e.target.value })}
                placeholder="+1234567890"
              />
            </div>
          </div>

          {workLines.length > 0 && (
            <div className="space-y-2">
              <Label>Assign Business Lines</Label>
              <div className="grid gap-3">
                {workLines.map((line) => (
                  <div key={line.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`line-${line.id}`}
                      checked={newRep.assignedLines.includes(line.id)}
                      onCheckedChange={() => toggleLine(line.id)}
                    />
                    <Label htmlFor={`line-${line.id}`} className="cursor-pointer font-normal">
                      {line.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button type="button" onClick={addRepresentative} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Representative
          </Button>
        </CardContent>
      </Card>

      {data.representatives && data.representatives.length > 0 && (
        <div className="space-y-3">
          <Label>Registered Representatives ({data.representatives.length})</Label>
          {data.representatives.map((rep) => (
            <Card key={rep.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{rep.fullName}</span>
                      <span className="text-sm text-muted-foreground">{rep.mobile}</span>
                    </div>
                    {rep.assignedLines.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {rep.assignedLines.map((lineId) => {
                          const line = workLines.find((l) => l.id === lineId)
                          return line ? (
                            <span key={lineId} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {line.name}
                            </span>
                          ) : null
                        })}
                      </div>
                    )}
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeRepresentative(rep.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="bg-accent/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Note: Adding representatives at this stage is optional. You can add representatives later from the management
          panel.
        </p>
      </div>
    </div>
  )
}
