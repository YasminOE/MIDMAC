import { cn } from 'src/utilities/cn'
import * as React from 'react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[120px] w-full rounded border border-[#DAD2C2] bg-[#1E1E1E] px-3 py-2 text-sm text-[#DAD2C2]',
          'placeholder:text-[#666666]',
          'focus-visible:outline-none focus-visible:border-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }