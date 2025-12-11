# Dev Tools Widget

The Dev Tools Widget is a development-only utility that provides time travel and data management capabilities for testing the Vamo application.

## Overview

The widget appears as a purple wrench icon (🔧) in the bottom-right corner of the screen, positioned just above the help button. It is **only visible in development mode** and automatically hidden in production builds.

## Features

### 1. Time Travel

The widget allows you to manipulate the application's internal clock to test time-dependent features without waiting for real time to pass.

#### Current Time Display
- Shows the current simulated time in your local format
- Updates every second
- Reflects any applied time offset

#### Go to Specific Day
- **Input Field:** Enter a day number (1-100)
- **Default Value:** Automatically calculates and displays the current day of the challenge
- **Button:** "Go to Day"
- **Behavior:**
  - Calculates the time offset needed to reach the specified day
  - Updates all time-dependent components immediately
  - Triggers `checkAndUpdateStreak()` to recalculate streak and daily task status

#### Jump to End
- **Button:** "⏭️ Jump to End (5s left)"
- **Behavior:**
  - Fast-forwards to 5 seconds before the end of the 100-day challenge
  - Useful for testing end-of-challenge behavior
  - Countdown timer will show approximately 0d : 0h : 0m : 5s

### 2. Data Management

#### Clear All Data
- **Button:** "Clear All Data" (red/destructive styling)
- **Confirmation:** Requires user confirmation before proceeding
- **Behavior:**
  - Removes `vamo-storage` from localStorage (all app data)
  - Removes `dev-time-offset` from localStorage (time travel data)
  - Reloads the page to reset the application state

## ⚠️ Important: Forward-Only Time Travel

**The time travel system is designed to move forward in time only.**

- ✅ **Safe:** Jumping from Day 1 → Day 5 → Day 10 → Day 50
- ❌ **Undefined Behavior:** Jumping backwards (e.g., Day 10 → Day 5)

### Why Forward Only?

The application tracks state based on dates and timestamps that assume time moves forward:
- Evidence uploads are timestamped and cannot be "un-uploaded"
- Streak calculations compare "today" with "yesterday"
- Daily task completion is based on the most recent date
- Going backwards may cause inconsistencies between stored timestamps and the current simulated time

### If You Need to Test an Earlier Day

1. Use "Clear All Data" to reset the application
2. Jump to the desired day from Day 1
3. Build up the state you need for testing

**Recommendation:** Always move forward in time. If you need to reset, clear all data and start fresh.

