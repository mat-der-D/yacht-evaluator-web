import type { ScoreSheet } from '../types/game';

export type CategoryKey = keyof ScoreSheet | 'upperTotal' | 'bonus' | 'total';

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  ace: 'エース',
  deuce: 'デュース',
  trey: 'トレイ',
  four: 'フォー',
  five: 'ファイブ',
  six: 'シックス',
  choice: 'チョイス',
  fourOfAKind: 'フォーダイス',
  fullHouse: 'フルハウス',
  smallStraight: 'S.ストレート',
  bigStraight: 'B.ストレート',
  yacht: 'ヨット',
  upperTotal: '小計',
  bonus: 'ボーナス',
  total: '合計',
};
