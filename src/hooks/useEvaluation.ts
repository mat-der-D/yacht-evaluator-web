import { useState, useCallback } from 'react';
import { evaluateMove, type Choice, type EvaluationRequest } from '../utils/api';

export function useEvaluation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Choice[]>([]);

  const evaluate = useCallback(async (request: EvaluationRequest) => {
    setLoading(true);
    setError(null);
    try {
      const choices = await evaluateMove(request);
      setData(choices);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, data, evaluate };
}
