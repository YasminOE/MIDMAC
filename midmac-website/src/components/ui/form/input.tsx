import { cn } from 'src/utilities/cn'
import * as React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, ...props }, ref) => {
    return (
      <input
        className={cn(
          'flex h-10 w-full text-sm bg-[#1E1E1E] px-3 py-2',
          'border border-[0.5px] border-[#333333] rounded',
          'text-[#DAD2C2] placeholder:text-[#666666]',
          'focus:outline-none focus:ring-0',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        type={type}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }