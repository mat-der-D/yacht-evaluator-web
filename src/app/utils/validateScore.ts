import type { ScoreSheet } from '../types/game';

type CategoryKey = keyof ScoreSheet;

const UPPER_CATEGORIES = {
  ace: { divisor: 1, max: 5 },
  deuce: { divisor: 2, max: 10 },
  trey: { divisor: 3, max: 15 },
  four: { divisor: 4, max: 20 },
  five: { divisor: 5, max: 25 },
  six: { divisor: 6, max: 30 },
} as const;

const FULL_HOUSE_INVALID_VALUES = new Set([1, 2, 3, 4, 6, 29]);

function isInteger(value: number): boolean {
  return Number.isInteger(value);
}

function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

function isValidUpperCategory(value: number, divisor: number, max: number): boolean {
  return isInteger(value) && value % divisor === 0 && isInRange(value, 0, max);
}

function isValidChoice(value: number): boolean {
  return isInteger(value) && isInRange(value, 5, 30);
}

function isValidFourOfAKind(value: number): boolean {
  return isInteger(value) && (value === 0 || isInRange(value, 5, 30));
}

function isValidFullHouse(value: number): boolean {
  return isInteger(value) && isInRange(value, 0, 30) && !FULL_HOUSE_INVALID_VALUES.has(value);
}

function isValidFixedScore(value: number, validScores: readonly number[]): boolean {
  return validScores.includes(value);
}

export function isValidScore(category: CategoryKey, value: number | null): boolean {
  if (value === null) return true;
  if (!isInteger(value) || value < 0) return false;

  if (category in UPPER_CATEGORIES) {
    const { divisor, max } = UPPER_CATEGORIES[category as keyof typeof UPPER_CATEGORIES];
    return isValidUpperCategory(value, divisor, max);
  }

  switch (category) {
    case 'choice':
      return isValidChoice(value);
    case 'fourOfAKind':
      return isValidFourOfAKind(value);
    case 'fullHouse':
      return isValidFullHouse(value);
    case 'smallStraight':
      return isValidFixedScore(value, [0, 15]);
    case 'bigStraight':
      return isValidFixedScore(value, [0, 30]);
    case 'yacht':
      return isValidFixedScore(value, [0, 50]);
    default:
      return false;
  }
}
