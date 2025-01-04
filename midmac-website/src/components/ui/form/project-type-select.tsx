import React from 'react'
import { cn } from '@/utilities/cn'

const projectTypes = [
  { label: 'COFFEE', value: 'coffee' },
  { label: 'RESTAURANT', value: 'restaurant' },
  { label: 'OFFICE', value: 'office' },
  { label: 'SPA', value: 'spa' },
  { label: 'OTHER..', value: 'other' },
]

interface ProjectTypeSelectProps {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function ProjectTypeSelect({ value, onChange, className }: ProjectTypeSelectProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <label className="text-sm text-[#D6D0C3] uppercase">Project Type</label>
      <div className="flex flex-wrap gap-3">
        {projectTypes.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => onChange?.(type.value)}
            className={cn(
              'h-9 px-4 rounded text-sm transition-colors',
              value === type.value 
                ? 'bg-[#1E1E1E] text-white border border-[#D6D0C3]'
                : type.value === 'other'
                  ? 'bg-[#1E1E1E] text-white border border-[#D6D0C3] hover:bg-[#1E1E1E]/90'
                  : 'bg-[#D6D0C3] text-black hover:bg-[#D6D0C3]/90'
            )}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  )
} 