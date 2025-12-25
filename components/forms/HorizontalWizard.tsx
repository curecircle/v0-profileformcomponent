'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  component: React.ReactNode;
}

export interface HorizontalWizardProps {
  steps: WizardStep[];
  currentStep: number;
  onStepChange: (step: number) => void;
  className?: string;
}

export function HorizontalWizard({
  steps,
  currentStep,
  onStepChange,
  className,
}: HorizontalWizardProps) {
  return (
    <div className={cn('space-y-6 sm:space-y-8 lg:space-y-10', className)}>
      <div className="relative px-2 sm:px-0">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 sm:h-1 bg-slate-200 dark:bg-slate-800 rounded-full mx-4 sm:mx-0">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-full transition-all duration-700 ease-out shadow-sm"
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        <div className="relative grid gap-1 sm:gap-2" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isUpcoming = index > currentStep;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => index <= currentStep && onStepChange(index)}
              >
                <div
                  className={cn(
                    'relative z-10 flex items-center justify-center rounded-full border-2 transition-all duration-500 font-bold mb-2 sm:mb-3',
                    'w-10 h-10 text-sm',
                    'sm:w-12 sm:h-12 sm:text-base',
                    'active:scale-95',
                    isCompleted &&
                      'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 border-transparent text-white shadow-lg shadow-blue-500/30',
                    isCurrent &&
                      'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 border-transparent text-white ring-4 ring-blue-500/20 shadow-2xl shadow-blue-500/40 scale-110',
                    isUpcoming &&
                      'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 shadow-sm'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 animate-in zoom-in duration-300" />
                  ) : (
                    <span className="animate-in fade-in duration-300">{index + 1}</span>
                  )}
                </div>

                <p
                  className={cn(
                    'text-[10px] leading-tight sm:text-xs lg:text-sm font-semibold text-center transition-all duration-300 px-1 w-full',
                    'whitespace-normal break-words min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center',
                    isCurrent || isCompleted
                      ? 'text-slate-900 dark:text-slate-100 scale-105'
                      : 'text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-400'
                  )}
                >
                  {step.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-4">
        {steps[currentStep]?.component}
      </div>
    </div>
  );
}
