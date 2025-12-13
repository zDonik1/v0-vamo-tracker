import { useCallback } from "react"
import { useAppStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { currentDate } from "@/lib/time"

/**
 * Hook to add evidence with proper toast notifications
 * Handles all gamification logic and UI feedback
 */
export function useAddEvidence() {
  const { addEvidence, evidenceCountToday, dailyTaskCompleted, streak, claimedMilestones } = useAppStore()
  const { toast } = useToast()

  return useCallback((type: "text" | "image" | "link" | "note", content: string) => {
    const wasAlreadyCompleted = dailyTaskCompleted
    const streakBeforeAdd = streak

    addEvidence({
      type,
      content,
      date: currentDate().toISOString(),
    })

    if (!wasAlreadyCompleted) {
      // Check if we had a streak before adding (the new one is already incremented in the store)
      const message = streakBeforeAdd >= 1
        ? "You earned 10 🍍 pineapples for today's evidence + 2 🍍 for your streak!"
        : "You earned 10 🍍 pineapples for today's evidence!"

      toast({
        title: "Daily Task Complete!",
        description: message,
      })
    } else {
      toast({
        title: "Evidence Added",
        description: "Additional evidence saved to your library!",
      })
    }
  }, [addEvidence, evidenceCountToday, dailyTaskCompleted, streak, claimedMilestones, toast])
}

