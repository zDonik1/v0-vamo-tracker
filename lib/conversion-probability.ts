import type { Lead } from "./store"

/**
 * Calculate conversion probability for a lead based on stage and relationship
 * See docs/lead-conversion-probability.md for full documentation
 */

const STAGE_BASE_PROBABILITY: Record<Lead["stage"], number> = {
  "setup-call": 20,
  discovery: 40,
  demo: 60,
  pricing: 80,
  secured: 100,
  "did-not-close": 0,
}

const RELATIONSHIP_MULTIPLIER: Record<Lead["relationship"], number> = {
  "know-well": 1.2, // +20% boost
  "talked-once": 1.0, // neutral
  "dont-know": 0.8, // -20% penalty
}

export function calculateConversionProbability(lead: Lead): number {
  // Absolute states
  if (lead.stage === "secured") return 100
  if (lead.stage === "did-not-close") return 0

  // Calculate: base stage probability × relationship modifier
  const baseProb = STAGE_BASE_PROBABILITY[lead.stage]
  const multiplier = RELATIONSHIP_MULTIPLIER[lead.relationship]
  const probability = baseProb * multiplier

  // Cap at 100%
  return Math.min(Math.round(probability), 100)
}
