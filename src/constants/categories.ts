import type { ScoreSheet } from '../types/game';

export type CategoryKey = keyof ScoreSheet | 'upperTotal' | 'bonus' | 'total';

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  ace: 'Ace',
  deuce: 'Deuce',
  trey: 'Trey',
  four: 'Four',
  five: 'Five',
  six: 'Six',
  choice: 'Choice',
  fourOfAKind: 'Four of a Kind',
  fullHouse: 'Full House',
  smallStraight: 'SmallStraight',
  bigStraight: 'Big Straight',
  yacht: 'Yacht',
  upperTotal: 'Upper Total',
  bonus: 'Bonus',
  total: 'Total',
};
