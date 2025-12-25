'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';

export interface SmartDatePickerProps {
  label?: string;
  value?: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

export function SmartDatePicker({
  label,
  value,
  onChange,
  error,
  required,
  disabled,
  placeholder,
  className,
  minDate,
  maxDate,
}: SmartDatePickerProps) {
  const formatDateForInput = (date: Date | null | undefined): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const date = new Date(dateValue);
      onChange(date);
    } else {
      onChange(null);
    }
  };

  const minDateStr = minDate ? formatDateForInput(minDate) : undefined;
  const maxDateStr = maxDate ? formatDateForInput(maxDate) : undefined;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          value={formatDateForInput(value)}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          min={minDateStr}
          max={maxDateStr}
          placeholder={placeholder || 'Select date'}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pr-10',
            error && 'border-red-500 focus-visible:ring-red-500'
          )}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
          <Calendar className="w-4 h-4" />
        </div>
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
