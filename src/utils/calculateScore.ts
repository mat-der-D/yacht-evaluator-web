import type { ScoreSheet } from '../types/game';

/**
 * 上段の数字役（Ace～Six）の計算関数群
 * 各目の個数を数えて、その目の値を掛ける
 */

export function calculateAce(dice: number[]): number {
  return dice.filter((d) => d === 1).length * 1;
}

export function calculateDeuce(dice: number[]): number {
  return dice.filter((d) => d === 2).length * 2;
}

export function calculateTrey(dice: number[]): number {
  return dice.filter((d) => d === 3).length * 3;
}

export function calculateFour(dice: number[]): number {
  return dice.filter((d) => d === 4).length * 4;
}

export function calculateFive(dice: number[]): number {
  return dice.filter((d) => d === 5).length * 5;
}

export function calculateSix(dice: number[]): number {
  return dice.filter((d) => d === 6).length * 6;
}

/**
 * 下段の特殊役の計算関数群
 */

/**
 * Choice - どんな出目でもOK、5つのサイコロの合計
 */
export function calculateChoice(dice: number[]): number {
  return dice.reduce((sum, d) => sum + d, 0);
}

/**
 * Four of a Kind - 同じ目が4つ以上ある場合、5つのサイコロの合計。条件を満たさない場合は0
 */
export function calculateFourOfAKind(dice: number[]): number {
  // 各目の出現回数を数える
  const counts = new Map<number, number>();
  for (const d of dice) {
    counts.set(d, (counts.get(d) || 0) + 1);
  }

  // 4つ以上同じ目があるか確認
  const hasQuad = Array.from(counts.values()).some((count) => count >= 4);

  if (hasQuad) {
    return calculateChoice(dice); // 合計を返す
  }
  return 0;
}

/**
 * Full House - 3つ同じ + 2つ同じの場合、5つのサイコロの合計。条件を満たさない場合は0
 * 注意: 5つすべて同じ場合も Full House として有効
 */
export function calculateFullHouse(dice: number[]): number {
  // 各目の出現回数を数える
  const counts = new Map<number, number>();
  for (const d of dice) {
    counts.set(d, (counts.get(d) || 0) + 1);
  }

  const countValues = Array.from(counts.values()).sort((a, b) => b - a);

  // Full House の条件: [3, 2] または [5, 0] のパターン
  // つまり、最も多い目が3つ以上で、残りが2つ以上、または5つすべて同じ
  if (
    countValues[0] === 5 || // 5つすべて同じ
    (countValues[0] === 3 && countValues[1] === 2) // 3つ + 2つ
  ) {
    return calculateChoice(dice);
  }
  return 0;
}

/**
 * Small Straight - 4つ連続した目がある場合15点（固定）
 * パターン: [1,2,3,4], [2,3,4,5], [3,4,5,6]
 */
export function calculateSmallStraight(dice: number[]): number {
  const uniqueDice = new Set(dice);

  // 3つのパターンをチェック
  const patterns = [
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
  ];

  for (const pattern of patterns) {
    if (pattern.every((n) => uniqueDice.has(n))) {
      return 15;
    }
  }
  return 0;
}

/**
 * Big Straight - 5つすべてが連続した目の場合30点（固定）
 * パターン: [1,2,3,4,5], [2,3,4,5,6]
 */
export function calculateBigStraight(dice: number[]): number {
  const uniqueDice = new Set(dice);

  // 2つのパターンをチェック
  const patterns = [
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
  ];

  for (const pattern of patterns) {
    if (pattern.every((n) => uniqueDice.has(n))) {
      return 30;
    }
  }
  return 0;
}

/**
 * Yacht - 5つすべてが同じ目の場合50点（固定）
 */
export function calculateYacht(dice: number[]): number {
  return dice.every((d) => d === dice[0]) ? 50 : 0;
}

/**
 * スコアシート全体の計算関数群
 */

/**
 * 上段の合計（Ace～Six の合計）
 */
export function calculateUpperTotal(scoreSheet: ScoreSheet): number {
  const upperRoles = [
    scoreSheet.ace,
    scoreSheet.deuce,
    scoreSheet.trey,
    scoreSheet.four,
    scoreSheet.five,
    scoreSheet.six,
  ];

  return upperRoles.reduce((sum, score) => sum + (score ?? 0), 0);
}

/**
 * ボーナス計算（上段合計が63以上で35点）
 */
export function calculateBonus(scoreSheet: ScoreSheet): number {
  const upperTotal = calculateUpperTotal(scoreSheet);
  return upperTotal >= 63 ? 35 : 0;
}

/**
 * 下段の合計（Choice～Yacht の合計）
 */
export function calculateLowerTotal(scoreSheet: ScoreSheet): number {
  const lowerRoles = [
    scoreSheet.choice,
    scoreSheet.fourOfAKind,
    scoreSheet.fullHouse,
    scoreSheet.smallStraight,
    scoreSheet.bigStraight,
    scoreSheet.yacht,
  ];

  return lowerRoles.reduce((sum, score) => sum + (score ?? 0), 0);
}

/**
 * 最終合計（上段 + ボーナス + 下段）
 */
export function calculateFinalTotal(scoreSheet: ScoreSheet): number {
  const upperTotal = calculateUpperTotal(scoreSheet);
  const bonus = calculateBonus(scoreSheet);
  const lowerTotal = calculateLowerTotal(scoreSheet);

  return upperTotal + bonus + lowerTotal;
}

/**
 * 指定した役のスコアを計算するヘルパー関数
 * dice の値とスコアシートの役名から、そのスコアを計算して返す
 */
export function calculateRoleScore(roleKey: keyof ScoreSheet, dice: number[]): number {
  switch (roleKey) {
    case 'ace':
      return calculateAce(dice);
    case 'deuce':
      return calculateDeuce(dice);
    case 'trey':
      return calculateTrey(dice);
    case 'four':
      return calculateFour(dice);
    case 'five':
      return calculateFive(dice);
    case 'six':
      return calculateSix(dice);
    case 'choice':
      return calculateChoice(dice);
    case 'fourOfAKind':
      return calculateFourOfAKind(dice);
    case 'fullHouse':
      return calculateFullHouse(dice);
    case 'smallStraight':
      return calculateSmallStraight(dice);
    case 'bigStraight':
      return calculateBigStraight(dice);
    case 'yacht':
      return calculateYacht(dice);
    default:
      return 0;
  }
}
