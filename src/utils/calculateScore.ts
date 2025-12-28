import type { ScoreSheet } from '../types/game';

/**
 * サイコロの目の出現回数を数える
 * @param dice - サイコロの配列 [1-6 の値が 5 個]
 * @returns counts - counts[0] = 1 の個数, counts[1] = 2 の個数, ...
 */
function getCounts(dice: number[]): number[] {
  const counts = [0, 0, 0, 0, 0, 0];
  for (const face of dice) {
    counts[face - 1]++;
  }
  return counts;
}

/**
 * 最長連続数を計算
 * @param counts - 各目の出現回数
 * @returns 最も長い連続した目の個数
 */
function getMaxConsecutive(counts: number[]): number {
  let maxConsec = 0;
  let currentConsec = 0;

  for (const count of counts) {
    if (count > 0) {
      currentConsec++;
      maxConsec = Math.max(maxConsec, currentConsec);
    } else {
      currentConsec = 0;
    }
  }

  return maxConsec;
}

/**
 * サイコロの合計を計算
 */
function diceSum(dice: number[]): number {
  return dice.reduce((sum, d) => sum + d, 0);
}

/**
 * 上段の数字役（Ace～Six）
 * 指定された目の個数 × その目の値
 */

export function calculateAce(dice: number[]): number {
  const counts = getCounts(dice);
  return counts[0] * 1;
}

export function calculateDeuce(dice: number[]): number {
  const counts = getCounts(dice);
  return counts[1] * 2;
}

export function calculateTrey(dice: number[]): number {
  const counts = getCounts(dice);
  return counts[2] * 3;
}

export function calculateFour(dice: number[]): number {
  const counts = getCounts(dice);
  return counts[3] * 4;
}

export function calculateFive(dice: number[]): number {
  const counts = getCounts(dice);
  return counts[4] * 5;
}

export function calculateSix(dice: number[]): number {
  const counts = getCounts(dice);
  return counts[5] * 6;
}

/**
 * 下段の特殊役
 */

export function calculateChoice(dice: number[]): number {
  return diceSum(dice);
}

export function calculateFourOfAKind(dice: number[]): number {
  const counts = getCounts(dice);
  return counts.some((c) => c >= 4) ? diceSum(dice) : 0;
}

export function calculateFullHouse(dice: number[]): number {
  const counts = getCounts(dice);
  // 個数が 1 個だけのものがない⇔フルハウスが成立
  const noSingleDice = counts.every((c) => c !== 1);
  return noSingleDice ? diceSum(dice) : 0;
}

export function calculateSmallStraight(dice: number[]): number {
  const maxConsec = getMaxConsecutive(getCounts(dice));
  return maxConsec >= 4 ? 15 : 0;
}

export function calculateBigStraight(dice: number[]): number {
  const maxConsec = getMaxConsecutive(getCounts(dice));
  return maxConsec === 5 ? 30 : 0;
}

export function calculateYacht(dice: number[]): number {
  const counts = getCounts(dice);
  return counts.some((c) => c === 5) ? 50 : 0;
}

/**
 * スコアシート全体の計算関数群
 */

export function calculateUpperTotal(scoreSheet: ScoreSheet): number {
  const upperScores: number[] = [
    scoreSheet.ace ?? 0,
    scoreSheet.deuce ?? 0,
    scoreSheet.trey ?? 0,
    scoreSheet.four ?? 0,
    scoreSheet.five ?? 0,
    scoreSheet.six ?? 0,
  ];

  return upperScores.reduce((sum, score) => sum + score, 0);
}

export function calculateBonus(scoreSheet: ScoreSheet): number {
  const upperTotal = calculateUpperTotal(scoreSheet);
  return upperTotal >= 63 ? 35 : 0;
}

export function calculateLowerTotal(scoreSheet: ScoreSheet): number {
  const lowerScores: number[] = [
    scoreSheet.choice ?? 0,
    scoreSheet.fourOfAKind ?? 0,
    scoreSheet.fullHouse ?? 0,
    scoreSheet.smallStraight ?? 0,
    scoreSheet.bigStraight ?? 0,
    scoreSheet.yacht ?? 0,
  ];

  return lowerScores.reduce((sum, score) => sum + score, 0);
}

export function calculateFinalTotal(scoreSheet: ScoreSheet): number {
  const upperTotal = calculateUpperTotal(scoreSheet);
  const bonus = calculateBonus(scoreSheet);
  const lowerTotal = calculateLowerTotal(scoreSheet);

  return upperTotal + bonus + lowerTotal;
}

/**
 * 指定した役のスコアを計算するヘルパー関数
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
