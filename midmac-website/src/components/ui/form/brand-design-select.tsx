import React from 'react'
import { cn } from '@/utilities/cn'

const options = [
  { label: 'YES', value: 'yes' },
  { label: 'NO', value: 'no' },
]

interface BrandDesignSelectProps {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function BrandDesignSelect({ value, onChange, className }: BrandDesignSelectProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <label className="text-sm text-[#D6D0C3] uppercase">Do you have brand design?</label>
      <div className="flex gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange?.(option.value)}
            className={cn(
              'h-9 px-6 rounded text-sm transition-colors',
              value === option.value 
                ? 'bg-[#D6D0C3] text-black hover:bg-[#D6D0C3]/90'
                : 'bg-[#1E1E1E] text-white border border-[#D6D0C3] hover:bg-[#1E1E1E]/90'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
} 