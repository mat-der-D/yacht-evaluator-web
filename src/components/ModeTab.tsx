import type { GameMode } from '../types/game';

const SELECTED_ICON = '●' as const;
const UNSELECTED_ICON = '○' as const;

interface ModeTabProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

export default function ModeTab({ mode, onModeChange }: ModeTabProps) {
  return (
    <div className="mode-tab">
      <button onClick={() => onModeChange('play')}>
        {mode === 'play' ? SELECTED_ICON : UNSELECTED_ICON} プレイ
      </button>
      <button onClick={() => onModeChange('analysis')}>
        {mode === 'analysis' ? SELECTED_ICON : UNSELECTED_ICON} 局面解析
      </button>
    </div>
  );
}
