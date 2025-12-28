import { useState, useCallback } from 'react';
import { evaluateMove, type EvaluationRequest } from '../utils/api';

export function useEvaluation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const evaluate = useCallback(async (request: EvaluationRequest) => {
    setLoading(true);
    setError(null);
    try {
      return await evaluateMove(request);
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

  return { loading, error, evaluate };
}
