"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Briefcase } from "lucide-react"
import type { CompanyManagerData, WorkLine } from "@/lib/types"

interface WorkLinesStepProps {
  data: Partial<CompanyManagerData>
  onChange: (data: Partial<CompanyManagerData>) => void
  errors: Record<string, string>
}

export function WorkLinesStep({ data, onChange, errors }: WorkLinesStepProps) {
  const [newLine, setNewLine] = useState("")

  const addWorkLine = () => {
    if (!newLine.trim()) return

    const workLine: WorkLine = {
      id: Date.now().toString(),
      name: newLine.trim(),
    }

    onChange({
      workLines: [...(data.workLines || []), workLine],
    })
    setNewLine("")
  }

  const removeWorkLine = (id: string) => {
    onChange({
      workLines: (data.workLines || []).filter((line) => line.id !== id),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Briefcase className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Business Lines</h3>
          <p className="text-sm text-muted-foreground">Define the specific business lines your company operates in</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="newLine">Add New Business Line</Label>
        <div className="flex gap-2">
          <Input
            id="newLine"
            value={newLine}
            onChange={(e) => setNewLine(e.target.value)}
            placeholder="e.g., Diabetes, Cardiology, Oncology"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addWorkLine()
              }
            }}
          />
          <Button type="button" onClick={addWorkLine} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {errors.workLines && <p className="text-xs text-destructive">{errors.workLines}</p>}
      </div>

      {data.workLines && data.workLines.length > 0 && (
        <div className="space-y-2">
          <Label>Defined Business Lines ({data.workLines.length})</Label>
          <div className="flex flex-wrap gap-2">
            {data.workLines.map((line) => (
              <Badge key={line.id} variant="secondary" className="text-sm gap-2 py-2 px-3">
                {line.name}
                <button type="button" onClick={() => removeWorkLine(line.id)} className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="bg-accent/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Business lines represent your company's areas of activity. These lines will later be assigned to
          representatives.
        </p>
      </div>
    </div>
  )
}
