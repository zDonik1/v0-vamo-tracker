"use client"

import { useState, useEffect } from "react"
import { setTimeOffset, now } from "@/lib/time"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wrench } from "lucide-react"
import { useAddEvidence } from "@/hooks/use-gamification"

// Constants
const MS_PER_DAY = 24 * 60 * 60 * 1000
const CHALLENGE_DURATION_DAYS = 100
const STORAGE_KEYS = {
  VAMO: "vamo-storage",
  TIME_OFFSET: "dev-time-offset",
}

export function DevToolsWidget() {
  const { startDate, checkAndUpdateStreak } = useAppStore()
  const addEvidence = useAddEvidence()
  const [isVisible, setIsVisible] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date(now()))
  const [day, setDay] = useState("1")

  // Helpers
  const getCurrentDay = () => {
    if (!startDate) return 1
    const daysSinceStart = Math.floor((now() - startDate) / MS_PER_DAY) + 1
    return Math.max(1, Math.min(CHALLENGE_DURATION_DAYS, daysSinceStart))
  }

  const applyTimeOffset = (offsetMs: number) => {
    setTimeOffset(offsetMs)
    checkAndUpdateStreak()
  }

  // Event handlers
  const handleSetDay = () => {
    if (!startDate) return

    const dayNum = parseInt(day, 10)
    if (isNaN(dayNum) || dayNum < 1 || dayNum > CHALLENGE_DURATION_DAYS) return

    const targetDate = startDate + (dayNum - 1) * MS_PER_DAY
    const offsetMs = targetDate - Date.now()

    applyTimeOffset(offsetMs)
  }

  const handleFastForwardToEnd = () => {
    if (!startDate) return

    const endDate = startDate + CHALLENGE_DURATION_DAYS * MS_PER_DAY - 5000
    const offsetMs = endDate - Date.now()

    applyTimeOffset(offsetMs)
  }

  const handleResetLocalStorage = () => {
    const confirmed = confirm(
      "Are you sure? This will clear ALL app data including your progress, evidence, and leads."
    )

    if (confirmed) {
      localStorage.removeItem(STORAGE_KEYS.VAMO)
      localStorage.removeItem(STORAGE_KEYS.TIME_OFFSET)
      window.location.reload()
    }
  }

  const handleGoToNextDay = () => {
    if (!startDate) return

    const currentDay = getCurrentDay()
    const nextDay = Math.min(currentDay + 1, CHALLENGE_DURATION_DAYS)
    const targetDate = startDate + (nextDay - 1) * MS_PER_DAY
    const offsetMs = targetDate - Date.now()

    applyTimeOffset(offsetMs)
    setDay(nextDay.toString())
  }

  const handleAddEvidence = () => {
    addEvidence("text", "Test evidence added via dev tools")
  }

  // Effects
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date(now()))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (startDate) {
      setDay(getCurrentDay().toString())
    }
  }, [startDate])

  // Only render in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        size="icon"
        className="fixed bottom-24 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform bg-purple-600 hover:bg-purple-700"
        aria-label="Dev Tools"
      >
        <Wrench className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-24 right-6 w-80 shadow-xl z-50 border-purple-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Dev Tools</CardTitle>
          <button
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>
        <CardDescription className="text-xs">Time travel & reset controls</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-xs text-muted-foreground font-mono">
          Current: {currentTime.toLocaleString()}
        </div>
        <div className="flex gap-2">
          <Input
            type="number"
            min="1"
            max="100"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="Day (1-100)"
            className="h-9"
          />
          <Button onClick={handleSetDay} size="sm" className="bg-purple-600 hover:bg-purple-700">
            Go to Day
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleGoToNextDay}
            variant="outline"
            size="sm"
            className="flex-1 h-8 text-xs"
          >
            ⏩ Next Day
          </Button>
          <Button
            onClick={handleAddEvidence}
            size="sm"
            className="flex-1 h-8 text-xs bg-emerald-600 hover:bg-emerald-700"
          >
            ➕ Add Evidence
          </Button>
        </div>
        <Button
          onClick={handleFastForwardToEnd}
          variant="outline"
          size="sm"
          className="w-full h-8 text-xs"
        >
          ⏭️ Jump to End (5s left)
        </Button>
        <div className="pt-2 border-t">
          <Button
            onClick={handleResetLocalStorage}
            variant="destructive"
            size="sm"
            className="w-full h-8 text-xs"
          >
            Clear All Data
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
