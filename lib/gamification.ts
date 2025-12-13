/**
 * Gamification Constants
 */
const MILESTONE_REWARDS = {
  7: 50,
  30: 100,
  60: 150,
  100: 250,
} as const

const EVIDENCE_CREDITS = {
  0: 10, // First evidence of the day
  1: 5,  // Second evidence of the day
  2: 3,  // Third evidence of the day
  // 3+: 0 (daily cap reached)
} as const

/**
 * Calculate login bonus based on current day (streak + 1)
 */
export function calculateLoginBonus(currentDay: number): number {
  if (currentDay >= 1 && currentDay <= 7) return 5 // Week 1
  if (currentDay >= 8 && currentDay <= 14) return 6 // Week 2
  if (currentDay >= 15 && currentDay <= 21) return 7 // Week 3
  if (currentDay >= 22 && currentDay <= 28) return 8 // Week 4
  return 10 // Week 5+ (capped)
}

/**
 * Get milestone reward for a specific streak day
 */
export function getMilestoneReward(streakDay: number, claimedMilestones: number[]): number {
  if (claimedMilestones.includes(streakDay)) return 0
  return MILESTONE_REWARDS[streakDay as keyof typeof MILESTONE_REWARDS] || 0
}

/**
 * Calculate evidence credits based on daily count
 */
export function calculateEvidenceCredits(evidenceCountToday: number): number {
  return EVIDENCE_CREDITS[evidenceCountToday as keyof typeof EVIDENCE_CREDITS] ?? 0
}
