export interface EvaluationPanelState {
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UIState {
  evaluationPanel: EvaluationPanelState;
}

export const initialUIState: UIState = {
  evaluationPanel: {
    isOpen: false,
    isLoading: false,
    error: null,
  },
};
