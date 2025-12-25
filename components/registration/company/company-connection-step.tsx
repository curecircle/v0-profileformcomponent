"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Building2, CheckCircle } from "lucide-react"
import type { CompanyRepresentativeData } from "@/lib/types"
import { cn } from "@/lib/utils"

interface CompanyConnectionStepProps {
  data: Partial<CompanyRepresentativeData>
  onChange: (data: Partial<CompanyRepresentativeData>) => void
  errors: Record<string, string>
}

// Mock company data - in production, this would come from an API
const mockCompanies = [
  { id: "1", name: "شرکت داروسازی البرز", registrationNumber: "12345" },
  { id: "2", name: "شرکت تجهیزات پزشکی پارس", registrationNumber: "23456" },
  { id: "3", name: "شرکت داروپخش سپهر", registrationNumber: "34567" },
]

export function CompanyConnectionStep({ data, onChange, errors }: CompanyConnectionStepProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState(mockCompanies)
  const [selectedCompany, setSelectedCompany] = useState<(typeof mockCompanies)[0] | null>(
    data.companyId ? mockCompanies.find((c) => c.id === data.companyId) || null : null,
  )

  const handleSearch = () => {
    // Simulate search
    const results = mockCompanies.filter(
      (company) => company.name.includes(searchQuery) || company.registrationNumber.includes(searchQuery),
    )
    setSearchResults(results)
  }

  const handleSelectCompany = (company: (typeof mockCompanies)[0]) => {
    setSelectedCompany(company)
    onChange({
      companyId: company.id,
      companyName: company.name,
    })
  }

  return (
    <div className="space-y-6">
      {!selectedCompany ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="search">جستجوی شرکت</Label>
            <div className="flex gap-2">
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="نام شرکت یا شماره ثبت"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleSearch()
                  }
                }}
                className={cn(errors.companyId && "border-destructive")}
              />
              <Button type="button" onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
            {errors.companyId && <p className="text-xs text-destructive">{errors.companyId}</p>}
          </div>

          <div className="space-y-3">
            <Label>نتایج جستجو</Label>
            {searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((company) => (
                  <Card
                    key={company.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleSelectCompany(company)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{company.name}</h4>
                          <p className="text-sm text-muted-foreground">شماره ثبت: {company.registrationNumber}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                شرکتی یافت نشد. لطفاً جستجوی دیگری انجام دهید.
              </div>
            )}
          </div>
        </>
      ) : (
        <Card className="border-2 border-success bg-success/5">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">شرکت انتخاب شده</h4>
                  <p className="text-sm text-muted-foreground">{selectedCompany.name}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSelectedCompany(null)
                  onChange({ companyId: "", companyName: "" })
                }}
                className="w-full"
              >
                تغییر شرکت
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-accent/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          پس از انتخاب شرکت، درخواست شما به مدیر شرکت ارسال می‌شود. ثبت‌نام شما پس از تأیید مدیر کامل خواهد شد.
        </p>
      </div>
    </div>
  )
}
