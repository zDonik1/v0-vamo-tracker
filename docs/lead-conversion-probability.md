# Lead Conversion Probability Calculation

## Overview

Each lead has a conversion probability that indicates the likelihood of them becoming a paying customer. This probability is calculated based on two factors:

1. **Stage** - Where they are in the sales process (primary factor)
2. **Relationship** - How well you know them (modifier)

## Calculation Logic

### Formula

```
If stage = "secured" → 100%
If stage = "did-not-close" → 0%
Otherwise → Base Stage % × Relationship Modifier (capped at 100%)
```

### Stage (Primary Factor)

The stage represents the actual progress in the sales funnel and provides the **base conversion probability**:

| Stage | Base Probability | Description | Color |
|-------|-----------------|-------------|-------|
| **Secured** | 100% | Deal is closed, they're a paying customer | Bright green |
| **Pricing Call** | 80% | Discussing money means they're very serious | Yellow-green/Lime |
| **Demo** | 60% | Invested enough time to see a demo, over halfway there | Purple/Medium blue |
| **Discovery Call** | 40% | Made it past first contact, showing interest | Blue |
| **Set Up Call** | 20% | Just starting, most leads drop off here | Light gray/Pale blue |
| **Did Not Close** | 0% | Lost the deal | Red/Gray |

### Relationship (Modifier)

The relationship represents how warm the lead is and **modifies the base probability**:

| Relationship | Multiplier | Effect | Color |
|--------------|-----------|--------|-------|
| **Know them well** | ×1.2 | +20% boost - existing trust increases success | Green/Dark green |
| **Talked once** | ×1.0 | Neutral - medium warmth, no adjustment | Yellow/Orange |
| **Don't know them** | ×0.8 | -20% penalty - cold lead, harder to convert | Red/Light red |

## Examples

### Scenario 1: Hot Prospect
- Stage: Pricing Call (80%)
- Relationship: Know them well (×1.2)
- **Conversion: 96%** (80 × 1.2 = 96%)

### Scenario 2: Warm Lead at Demo
- Stage: Demo (60%)
- Relationship: Know them well (×1.2)
- **Conversion: 72%** (60 × 1.2 = 72%)

### Scenario 3: Cold Lead at Pricing
- Stage: Pricing Call (80%)
- Relationship: Don't know them (×0.8)
- **Conversion: 64%** (80 × 0.8 = 64%)

### Scenario 4: Cold Lead at Demo
- Stage: Demo (60%)
- Relationship: Don't know them (×0.8)
- **Conversion: 48%** (60 × 0.8 = 48%)

### Scenario 5: Warm Lead Early Stage
- Stage: Set Up Call (20%)
- Relationship: Know them well (×1.2)
- **Conversion: 24%** (20 × 1.2 = 24%)

### Scenario 6: Already Secured
- Stage: Secured (100%)
- Relationship: Any
- **Conversion: 100%** (absolute, already converted)

### Scenario 7: Already Lost
- Stage: Did Not Close (0%)
- Relationship: Any
- **Conversion: 0%** (absolute, deal is lost)

## Full Conversion Matrix

| Stage → Relationship ↓ | Know Well (×1.2) | Talked Once (×1.0) | Don't Know (×0.8) |
|------------------------|------------------|-------------------|-------------------|
| **Secured** | 100% | 100% | 100% |
| **Pricing Call** | 96% | 80% | 64% |
| **Demo** | 72% | 60% | 48% |
| **Discovery Call** | 48% | 40% | 32% |
| **Set Up Call** | 24% | 20% | 16% |
| **Did Not Close** | 0% | 0% | 0% |

## Implementation Notes

- Stage is the primary driver because it represents actual sales progress
- Relationship modifies the probability based on existing trust and warmth
- Secured and Did Not Close are absolute states (100% and 0%)
- Final probability is capped at 100%
- Use round numbers for base stage probabilities (20%, 40%, 60%, 80%, 100%)
