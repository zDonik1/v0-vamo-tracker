"use client"

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface AutoGrowTextareaProps extends React.ComponentProps<typeof Textarea> {
  value: string
  maxHeight?: string
}

export const AutoGrowTextarea = forwardRef<HTMLTextAreaElement, AutoGrowTextareaProps>(
  ({ value, maxHeight = "40vh", className, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useImperativeHandle(ref, () => textareaRef.current!)

    useEffect(() => {
      const textarea = textareaRef.current
      if (textarea) {
        // Reset height to measure content
        textarea.style.height = "100px"
        // Set height to content height
        textarea.style.height = `${textarea.scrollHeight + 5}px`
      }
    }, [value])

    return (
      <div
        className={cn(
          "rounded-md overflow-hidden border border-input bg-transparent shadow-xs transition-[color,box-shadow]",
          "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50"
        )}
      >
        <Textarea
          ref={textareaRef}
          value={value}
          className={cn(
            "resize-none min-h-[100px] overflow-y-auto border-0 shadow-none",
            "focus-visible:ring-0 focus-visible:border-transparent outline-none",
            className
          )}
          style={{ maxHeight }}
          {...props}
        />
      </div>
    )
  }
)

AutoGrowTextarea.displayName = "AutoGrowTextarea"
