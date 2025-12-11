import type { Lead } from "@/lib/store"

const relationshipLabels = {
  "know-well": "Know them well",
  "talked-once": "Talked once",
  "dont-know": "Don't know them",
}

const relationshipColors = {
  "know-well": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
  "talked-once": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
  "dont-know": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
}

const stageLabels = {
  "setup-call": "Set up call",
  discovery: "Discovery call",
  demo: "Demo",
  pricing: "Pricing call",
  secured: "Secured",
  "did-not-close": "Did not close",
}

const stageColors = {
  secured: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
  pricing: "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-400 border-lime-200 dark:border-lime-800",
  demo: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  discovery: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  "setup-call": "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800",
  "did-not-close": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
}

interface RelationshipBadgeProps {
  relationship: Lead["relationship"]
}

export function RelationshipBadge({ relationship }: RelationshipBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${relationshipColors[relationship]}`}>
      {relationshipLabels[relationship]}
    </span>
  )
}

interface StageBadgeProps {
  stage: Lead["stage"]
}

export function StageBadge({ stage }: StageBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${stageColors[stage]}`}>
      {stageLabels[stage]}
    </span>
  )
}

export { relationshipLabels, stageLabels }
