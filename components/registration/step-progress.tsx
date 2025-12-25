"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface StepProgressProps {
  steps: { title: string; description?: string }[]
  currentStep: number
  className?: string
}

export function StepProgress({ steps, currentStep, className }: StepProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex items-start justify-between relative">
          {/* Progress Line Background */}
          <div
            className="absolute top-5 left-0 right-0 h-0.5 bg-muted"
            style={{ marginLeft: "2.5rem", marginRight: "2.5rem" }}
          />

          {/* Progress Line Fill */}
          <motion.div
            className="absolute top-5 left-0 h-0.5 bg-primary"
            style={{ marginLeft: "2.5rem" }}
            initial={{ width: 0 }}
            animate={{
              width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 5rem)`,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep
            const isUpcoming = stepNumber > currentStep

            return (
              <div key={index} className="flex flex-col items-center relative z-10" style={{ flex: 1 }}>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isCurrent ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 shadow-sm",
                    isCompleted && "border-primary bg-primary text-primary-foreground shadow-primary/30",
                    isCurrent && "border-primary bg-primary/10 text-primary ring-4 ring-primary/20",
                    isUpcoming && "border-muted bg-background text-muted-foreground",
                  )}
                >
                  {isCompleted ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                      <Check className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </motion.div>

                <div className="mt-3 text-center max-w-[120px]">
                  <p
                    className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      isCurrent && "text-primary",
                      isCompleted && "text-foreground",
                      isUpcoming && "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 hidden lg:block">{step.description}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm font-semibold text-primary">{steps[currentStep - 1]?.title}</span>
        </div>

        {/* Mobile Progress Bar */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {/* Step Dots */}
        <div className="flex justify-between mt-2">
          {steps.map((_, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep

            return (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  isCompleted && "bg-primary",
                  isCurrent && "bg-primary ring-2 ring-primary/30",
                  !isCompleted && !isCurrent && "bg-muted",
                )}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
