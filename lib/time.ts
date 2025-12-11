/**
 * Centralized time utilities for the app
 * Allows for time shifting in development via the dev tools widget
 */

const DEV_TIME_OFFSET_KEY = "dev-time-offset"

let timeOffset = 0

// Load offset from localStorage in development only
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const stored = localStorage.getItem(DEV_TIME_OFFSET_KEY)
  if (stored) {
    timeOffset = parseInt(stored, 10)
    console.log(`⏰ Loaded time offset: ${timeOffset}ms (${Math.round(timeOffset / (24 * 60 * 60 * 1000))} days)`)
  }
}

/**
 * Get current timestamp (with offset applied in development)
 */
export function now(): number {
  if (process.env.NODE_ENV === "development") {
    return Date.now() + timeOffset
  }
  return Date.now()
}

/**
 * Get current Date object (with offset applied in development)
 */
export function currentDate(): Date {
  return new Date(now())
}

/**
 * Set time offset (used by dev widget)
 * @internal Only for development use
 */
export function setTimeOffset(offsetMs: number): void {
  if (process.env.NODE_ENV !== "development") return

  timeOffset = offsetMs
  localStorage.setItem(DEV_TIME_OFFSET_KEY, offsetMs.toString())
  console.log(`⏰ Time offset set to ${offsetMs}ms (${Math.round(offsetMs / (24 * 60 * 60 * 1000))} days)`)
}

/**
 * Get current time offset
 * @internal Only for development use
 */
export function getTimeOffset(): number {
  return timeOffset
}

/**
 * Reset time offset to 0
 * @internal Only for development use
 */
export function resetTimeOffset(): void {
  if (process.env.NODE_ENV !== "development") return

  timeOffset = 0
  localStorage.removeItem(DEV_TIME_OFFSET_KEY)
  console.log("⏰ Time offset reset to 0")
}
