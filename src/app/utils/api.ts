import type { RollCount, ScoreSheet } from '../types/game';

const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;

export interface EvaluationRequest {
  scoreSheet: ScoreSheet;
  dice: number[];
  rollCount: RollCount;
}

export interface Choice {
  choiceType: 'dice' | 'category';
  diceToHold?: number[];
  category?: keyof ScoreSheet;
  expectedValue: number;
}

export interface EvaluationResponse {
  data: Choice[];
}

export async function evaluateMove(request: EvaluationRequest): Promise<Choice[]> {
  const response = await fetch(`${API_BASE_URL}/api/v1/evaluate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: EvaluationResponse = await response.json();
  return data.data;
}
