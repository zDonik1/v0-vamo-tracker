"use client"

import { useAppStore } from "@/lib/store"
import { useEffect, useRef, useState } from "react"

export function EvidenceGrid() {
  const { evidence, startDate } = useAppStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(20)

  // Generate grid for 100 days
  const days = Array.from({ length: 100 }, (_, i) => {
    const date = new Date(startDate + i * 24 * 60 * 60 * 1000)
    const dateString = date.toDateString()
    const count = evidence.filter((e) => new Date(e.date).toDateString() === dateString).length
    return { date: dateString, count }
  })

  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-800"
    if (count === 1) return "bg-emerald-200 dark:bg-emerald-900"
    if (count === 2) return "bg-emerald-400 dark:bg-emerald-700"
    if (count === 3) return "bg-emerald-500 dark:bg-emerald-600"
    return "bg-emerald-600 dark:bg-emerald-500"
  }

  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const cellSize = 12
      const gap = 6

      const width20 = (20 * cellSize) + (19 * gap)
      const width10 = (10 * cellSize) + (9 * gap)

      // Choose columns based on what fits: 20, 10, or 5
      let newColumns = 5
      if (containerWidth >= width20) {
        newColumns = 20
      } else if (containerWidth >= width10) {
        newColumns = 10
      }

      setColumns(newColumns)
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  return (
    <div ref={containerRef} className="w-full">
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${columns}, 12px)` }}
      >
        {days.map((day, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-sm ${getColor(day.count)} transition-colors hover:ring-2 hover:ring-emerald-500`}
            title={`${day.date}: ${day.count} evidence${day.count !== 1 ? "s" : ""}`}
          />
        ))}
      </div>
    </div>
  )
}
