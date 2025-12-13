import { useCallback } from "react"
import { useAppStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { currentDate } from "@/lib/time"
import { calculateEvidenceCredits, getMilestoneReward } from "@/lib/gamification"

/**
 * Hook to process daily login bonus with toast notification
 * Called on app mount and dev tools time changes
 */
export function useProcessLoginBonus() {
  const { checkDailyLogin } = useAppStore()
  const { toast } = useToast()

  return useCallback(() => {
    const loginBonus = checkDailyLogin()
    if (loginBonus > 0) {
      toast({
        title: "Daily Login Bonus!",
        description: `You earned ${loginBonus} pineapple credits for logging in today! 🍍`,
        duration: 4000,
      })
    }
  }, [checkDailyLogin, toast])
}

/**
 * Hook to add evidence with proper toast notifications
 * Handles all gamification logic and UI feedback
 */
export function useAddEvidence() {
  const { addEvidence, evidenceCountToday, dailyTaskCompleted, streak, claimedMilestones } = useAppStore()
  const { toast } = useToast()

  return useCallback((type: "text" | "image" | "link" | "note", content: string) => {
    const previousEvidenceCount = evidenceCountToday
    const wasAlreadyCompleted = dailyTaskCompleted
    const currentStreak = streak
    const currentClaimedMilestones = claimedMilestones

    // Add evidence (this updates the store)
    addEvidence({
      type,
      content,
      date: currentDate().toISOString(),
    })

    // Calculate what was earned
    const evidenceCredits = calculateEvidenceCredits(previousEvidenceCount)

    // Check if milestone bonus was earned
    const newStreak = wasAlreadyCompleted ? currentStreak : currentStreak + 1
    const milestoneBonus = getMilestoneReward(newStreak, currentClaimedMilestones)

    // Build toast message
    if (evidenceCredits > 0) {
      let message = `You earned ${evidenceCredits} 🍍 pineapple credits!`

      if (milestoneBonus > 0) {
        message += ` 🎉 MILESTONE BONUS: +${milestoneBonus} 🍍 for reaching ${newStreak} day streak!`
      }

      toast({
        title: "Evidence Added!",
        description: message,
        duration: milestoneBonus > 0 ? 6000 : 4000,
      })
    } else {
      // Daily cap reached (4th+ evidence)
      toast({
        title: "Evidence Added!",
        description: "Evidence saved to your library!",
        duration: 3000,
      })
    }
  }, [addEvidence, evidenceCountToday, dailyTaskCompleted, streak, claimedMilestones, toast])
}
