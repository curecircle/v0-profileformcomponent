"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, X, Package } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CompanyManagerData } from "@/lib/types"
import { productCategories, type ProductCategory, type ProductSubCategory } from "@/lib/data/product-categories"

interface ProductCategoriesStepProps {
  data: Partial<CompanyManagerData>
  onChange: (data: Partial<CompanyManagerData>) => void
  errors: Record<string, string>
}

interface SelectedCategory {
  categoryId: string
  categoryName: string
  subcategoryId: string
  subcategoryName: string
  customName?: string
}

export function ProductCategoriesStep({ data, onChange, errors }: ProductCategoriesStepProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [customOtherInput, setCustomOtherInput] = useState("")

  const selectedCategories: SelectedCategory[] = data.productCategories || []

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const isSubcategorySelected = (categoryId: string, subcategoryId: string) => {
    return selectedCategories.some((s) => s.categoryId === categoryId && s.subcategoryId === subcategoryId)
  }

  const toggleSubcategory = (category: ProductCategory, subcategory: ProductSubCategory) => {
    const isSelected = isSubcategorySelected(category.id, subcategory.id)

    if (isSelected) {
      onChange({
        productCategories: selectedCategories.filter(
          (s) => !(s.categoryId === category.id && s.subcategoryId === subcategory.id),
        ),
      })
    } else {
      const newSelection: SelectedCategory = {
        categoryId: category.id,
        categoryName: category.name,
        subcategoryId: subcategory.id,
        subcategoryName: subcategory.name,
      }
      onChange({
        productCategories: [...selectedCategories, newSelection],
      })
    }
  }

  const addCustomOther = () => {
    if (!customOtherInput.trim()) return

    const newSelection: SelectedCategory = {
      categoryId: "other",
      categoryName: "Other",
      subcategoryId: `custom-${Date.now()}`,
      subcategoryName: customOtherInput.trim(),
      customName: customOtherInput.trim(),
    }

    onChange({
      productCategories: [...selectedCategories, newSelection],
    })
    setCustomOtherInput("")
  }

  const removeSelection = (categoryId: string, subcategoryId: string) => {
    onChange({
      productCategories: selectedCategories.filter(
        (s) => !(s.categoryId === categoryId && s.subcategoryId === subcategoryId),
      ),
    })
  }

  const getCategorySelectionCount = (categoryId: string) => {
    return selectedCategories.filter((s) => s.categoryId === categoryId).length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Package className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Specialized Product Categories</h3>
          <p className="text-sm text-muted-foreground">Select the product categories your company specializes in</p>
        </div>
      </div>

      {errors.productCategories && (
        <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{errors.productCategories}</p>
      )}

      {/* Selected Categories Summary */}
      {selectedCategories.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-4">
            <Label className="text-sm font-medium mb-3 block">Selected Categories ({selectedCategories.length})</Label>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((selection) => (
                <Badge
                  key={`${selection.categoryId}-${selection.subcategoryId}`}
                  variant="secondary"
                  className="gap-2 py-1.5 px-3 bg-background"
                >
                  <span className="max-w-[200px] truncate">{selection.customName || selection.subcategoryName}</span>
                  <button
                    type="button"
                    onClick={() => removeSelection(selection.categoryId, selection.subcategoryId)}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category List */}
      <div className="space-y-2">
        {productCategories.map((category) => {
          const isExpanded = expandedCategories.includes(category.id)
          const selectionCount = getCategorySelectionCount(category.id)

          return (
            <Card key={category.id} className={cn("transition-all", isExpanded && "ring-1 ring-primary/30")}>
              <button
                type="button"
                onClick={() => toggleCategory(category.id)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-accent/50 transition-colors rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-foreground">{category.name}</span>
                  {selectionCount > 0 && (
                    <Badge variant="default" className="text-xs">
                      {selectionCount}
                    </Badge>
                  )}
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>

              {isExpanded && (
                <CardContent className="pt-0 pb-4">
                  <div className="grid gap-2 md:grid-cols-2 border-t pt-4">
                    {category.subcategories
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((subcategory) => {
                        const isSelected = isSubcategorySelected(category.id, subcategory.id)
                        const isCustomOther = subcategory.id === "other-custom"

                        if (isCustomOther) {
                          return (
                            <div key={subcategory.id} className="col-span-full space-y-2 pt-2 border-t mt-2">
                              <Label className="text-sm text-muted-foreground">Add Custom Category</Label>
                              <div className="flex gap-2">
                                <Input
                                  value={customOtherInput}
                                  onChange={(e) => setCustomOtherInput(e.target.value)}
                                  placeholder="Enter custom category name"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault()
                                      addCustomOther()
                                    }
                                  }}
                                />
                                <Button type="button" onClick={addCustomOther} size="sm">
                                  Add
                                </Button>
                              </div>
                            </div>
                          )
                        }

                        return (
                          <div
                            key={subcategory.id}
                            className={cn(
                              "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors",
                              isSelected ? "bg-primary/10" : "hover:bg-accent/50",
                            )}
                            onClick={() => toggleSubcategory(category, subcategory)}
                          >
                            <Checkbox checked={isSelected} onChange={() => {}} className="pointer-events-none" />
                            <span className={cn("text-sm", isSelected && "font-medium text-primary")}>
                              {subcategory.name}
                            </span>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      <div className="bg-accent/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Select one or more specialized product categories that your company works with. These categories will help
          match your company with relevant opportunities and partners.
        </p>
      </div>
    </div>
  )
}
