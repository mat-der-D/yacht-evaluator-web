# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Yacht Dice Game Evaluator Web App** — a single-player web application for playing Yacht (a Yahtzee-style dice game) and analyzing game situations with AI-powered move recommendations.

**Key Details:**

- **Tech Stack**: React 19 + TypeScript + Vite + Bun
- **Package Manager**: Bun (not npm)
- **State Management**: React Context API
- **Styling**: Plain CSS with CSS variables
- **Game Logic**: Single player, 13 roles across 2 phases (6 upper roles + 7 lower roles)

## Essential Commands

```bash
# Development server (runs on http://localhost:5173)
bun run dev

# Build for production
bun run build

# Preview production build locally
bun run preview

# Lint TypeScript/JavaScript (flat config, ESLint 9+)
bun run lint

# Format code with Prettier
bun run format

# Type check (already runs during build)
bun run build  # Uses: tsc -b && vite build
```

**Note**: ESLint uses the new flat config format (`eslint.config.js`) with TypeScript support via `@typescript-eslint` and React hooks validation enabled by default.

## Project Structure

The app follows a 7-phase implementation plan (see `docs/implementation_plan.md`). Current status can be determined by checking which components exist in `src/components/`.

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks (useGameState, useEvaluation, etc.) - PLANNED
├── context/            # GameContext for state management - PLANNED
├── types/              # TypeScript type definitions (game.ts, api.ts, ui.ts)
│   └── game.ts         # ✓ CREATED (RollCount, GameMode, GameState, ScoreSheet)
├── utils/              # Utility functions (calculateScore.ts, diceUtils.ts, etc.) - PLANNED
├── styles/             # CSS files (global.css, variables.css, components.css)
│   └── global.css      # ✓ CREATED
├── App.tsx             # ✓ CREATED - Root component with useState
└── main.tsx            # ✓ CREATED - Entry point
```

**Current Status** (as of latest commit): Phase 1-3 partially complete. Core UI components exist (ModeTab, GameHeader, DiceDisplay, DiceItem, DiceActions, Layout). Next: Implement ScoreSheet component and state handlers.

## Critical Architecture Concepts

### GameState & RollCount Type

The `RollCount` type is **NOT "remaining rolls"** but **"rolls completed"**:

- `0`: Initial state (haven't rolled yet)
- `1`: After 1st roll
- `2`: After 2nd roll
- `3`: After 3rd roll

Calculate remaining rolls as: `rollsRemaining = Math.max(0, 3 - rollCount)`

### Game Modes

**Play Mode** (Blue, 🎮 icon):

- User rolls dice and locks/unlocks specific dice between rolls
- Can confirm a role at any time after rolling (rollCount 1-3)
- Evaluation button shows recommendations from backend API

**Analysis Mode** (Orange, 🔍 icon):

- User manually sets dice values and rollCount
- Can enter custom scoresheet values
- Shows evaluations without button actions
- Both modes share rollCount state seamlessly

### ScoreSheet Structure

13 roles total, organized as:

- **Upper (6 roles)**: Ace, Deuce, Trey, Four, Five, Six
- **Upper Total + Bonus**: Auto-calculated (bonus = 35 if upper total ≥ 63)
- **Lower (7 roles)**: Choice, Four of a Kind, Full House, Small Straight, Big Straight, Yacht
- **Final Total**: Sum of all scores including bonus

Each role is either:

- Confirmed: numeric value (greyed background #f3f4f6)
- Unconfirmed: null (white background) with `(+XX)` preview showing what it would score
- Marked as 0: valid strategy choice

### Dice Display & Interaction

**Play Mode**:

- Dice shown with dot notation (⚀⚁⚂⚃⚄⚅)
- Click dice to lock (blue border + 🔒 icon) or unlock (grey border)
- Locked dice stay fixed when "Roll Dice" button clicked

**Analysis Mode**:

- Click dice to cycle through values (1→2→3→4→5→6→1)
- Radio buttons select which roll state (0-3 rolls) to analyze

### Button & UI State Control

- **Evaluate button**: Disabled when `rollCount === 0` (can't evaluate before rolling)
- **Confirm buttons** on scoresheet: Hidden when `rollCount === 0`
- **Roll Dice button**: Disabled when `rollsRemaining === 0`
- Both modes use the same button logic (blue for play, orange for analysis)

## Type Definitions

Key types to understand (defined in `types/game.ts`):

```typescript
type RollCount = 0 | 1 | 2 | 3;
type GameMode = 'play' | 'analysis';

interface GameState {
  mode: GameMode;
  rollCount: RollCount;
  dice: number[]; // 5 values (1-6)
  lockedDice: boolean[]; // Track which dice are locked
  scoreSheet: ScoreSheet;
  // ... other fields
}

interface ScoreSheet {
  // Upper (6 roles)
  ace: number | null;
  deuce: number | null;
  trey: number | null;
  four: number | null;
  five: number | null;
  six: number | null;
  // Lower (7 roles)
  choice: number | null;
  fourOfAKind: number | null;
  fullHouse: number | null;
  smallStraight: number | null;
  bigStraight: number | null;
  yacht: number | null;
}
```

**Important**: The `ScoreSheet` interface contains only the 13 playable roles. Upper total, bonus, and final total are **calculated dynamically** during rendering (not stored in state). See `calculateScore.ts` for total calculation logic.

## API Integration

**Endpoint**: `POST /api/v1/evaluate`

**Request**:

```json
{
  "scoreSheet": {
    /* current scoresheet state */
  },
  "dice": [1, 2, 3, 4, 5],
  "rollCount": 2
}
```

**Response**:

```json
{
  "data": [
    {
      "choiceType": "dice",
      "diceToHold": [3, 4],
      "expectedValue": 245.3
    },
    {
      "choiceType": "category",
      "category": "fullHouse",
      "expectedValue": 240.5
    }
  ]
}
```

Results are pre-sorted by expected value (descending). Only call when `rollCount > 0`.

## UI Layout (All Modes)

```
┌─────────────────────────────────────────────────┐
│ [●Play] [○Analysis]                             │ ← Mode tabs
├─────────────────────────────────────────────────┤
│ 🎮 or 🔍  ← Mode icon                          │
│ ⚀  ⚁  ⚂  ⚃  ⚄                                │ ← Dice (5)
│ [Roll Dice] x3 remaining   (Play mode)          │
│ ○0 ○1 ●2 ○3 (Analysis mode)                   │
├─────────────────────────────────────────────────┤
│ [📊 Evaluate]                                    │
├─────────────────────────────────────────────────┤
│ Role | Score | Action                           │
│ Ace  |  3    | [Confirm]                        │
│ ... (13 roles total)                            │
│ Total: 81 points                                │
└─────────────────────────────────────────────────┘

Evaluation Panel (right side, slides in):
┌────────────────────────┐
│ Results        [×]     │
├────────────────────────┤
│ Hold ⚂⚂ - EV: 245.3  │
│          [Apply]       │ ← Play mode only
├────────────────────────┤
│ Full House - EV: 240.5 │
│         [Confirm]      │ ← Play mode only
└────────────────────────┘
```

## Responsive Design

- **Mobile** (<768px): Single column, 85% panel width
- **Tablet** (768-1024px): Single column, 400px panel width
- **Desktop** (1024px+): Single column, 450-500px panel width
- Minimum touch target: 44x44px
- Prevent zoom on input: `font-size: 16px+` in input fields

## Key Implementation Notes

### Fragment Usage

Use React.Fragment to conditionally insert rows in the scoresheet (upper total & bonus rows appear after the "Six" role).

### CSS Variables

Define color palette in `styles/variables.css`:

- Play mode: Blue accent (#3b82f6), white backgrounds
- Analysis mode: Orange accent (#f97316), light yellow backgrounds

### Score Calculation

The `calculateScore.ts` utility calculates all role values. It must:

- Handle all 13 role types
- Return preview calculations for unconfirmed roles
- Calculate bonus correctly (35 points if upper total ≥ 63)

### State Mutation Prevention

Always use immutable state updates:

```typescript
// ❌ Wrong
gameState.dice[0] = 5;

// ✅ Correct
setGameState({ ...gameState, dice: [5, ...gameState.dice.slice(1)] });
```

### State Management Pattern

**Current approach**: Game state lives in `App.tsx` (`useState`) and is passed down via props to `Layout`. This is appropriate for the early phases and keeps the app simple.

**When Context is needed**: As the component tree grows, use React Context (in `context/GameContext.tsx`) for deeply nested consumers (e.g., evaluation panel, scoresheet). Context should wrap `Layout` in `App.tsx`:

```typescript
// App.tsx - Add context provider when needed
<GameProvider gameState={gameState} setGameState={setGameState}>
  <Layout />
</GameProvider>
```

**Rule of thumb**:

- Props are fine for 2-3 levels of nesting
- Use Context when passing through >3 intermediate components
- Keep state as low in the tree as possible (don't put everything in Context)

## Documentation Files

- **`docs/yacht-rules.md`**: Complete Yacht game rules and role descriptions
- **`docs/yacht_evaluation_app_design.md`**: Detailed UI/UX specification
- **`docs/implementation_plan.md`**: 7-phase implementation roadmap with learning points
- **`docs/README_backend.md`**: Backend API and evaluation logic reference

## Development Workflow

1. **Before editing**: Read relevant files in `src/types/` to understand data structures
2. **TypeScript first**: Define types before implementing logic
3. **Component isolation**: Keep components focused on single responsibilities
4. **Test in browser**: Use `bun run dev` and React DevTools to verify state flow
5. **Check linting**: Run `bun run lint` before committing

## Common Debugging

- **State issues**: Check React DevTools for Context values and component tree
- **Type errors**: Run `bun run build` to see full TypeScript errors
- **API calls**: Check Network tab in browser DevTools
- **Styling**: Use browser DevTools Inspector to trace CSS issues
- **CSS resets needed?**: Check `styles/global.css` for base styles

## Common Pitfalls in This Codebase

1. **RollCount confusion**: Remember that `rollCount` represents **rolls completed**, not remaining. Always calculate `remaining = 3 - rollCount` when needed.

2. **ScoreSheet totals**: Don't add `upperTotal`, `bonus`, or `finalTotal` fields to ScoreSheet. These are **calculated on-the-fly** during rendering based on the 13 role values. Use `calculateScore.ts` utilities.

3. **Mode-specific rendering**: Some UI elements behave differently in Play vs Analysis mode:
   - Play mode: "Roll Dice" button, locked dice visualization, Evaluate button applies suggestions
   - Analysis mode: Roll count radio buttons, dice cycle on click, Evaluate is read-only
   - Always check `gameState.mode` before conditional rendering

4. **Dice locking in Play mode**: When rolling dice, only unlock the non-locked dice. The `lockedDice` array must have the same length as `dice` (5 elements).

5. **API call timing**: Only call the evaluate API when `rollCount > 0`. Validate this in the component before making requests.

## Important Constraints

- Use **Bun**, not npm/yarn
- Keep **Plain CSS** (no CSS-in-JS libraries)
- Use **React 19** features (e.g., Form actions if appropriate)
- Maintain **TypeScript strict mode** (already configured)
- No external UI component libraries (all custom)
- Respect the 7-phase plan structure from implementation_plan.md
