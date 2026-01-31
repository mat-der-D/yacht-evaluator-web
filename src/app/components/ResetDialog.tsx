import { useEffect, useRef } from 'react';

interface ResetDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ResetDialog({ isOpen, onConfirm, onCancel }: ResetDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onCancel]);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      const cancelButton =
        dialogRef.current.querySelector<HTMLButtonElement>('.reset-dialog__cancel');
      cancelButton?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="reset-dialog-overlay" onClick={onCancel} role="presentation">
      <div
        ref={dialogRef}
        className="reset-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="reset-dialog-title" className="reset-dialog__title">
          ゲームをリセット
        </h2>
        <p className="reset-dialog__message">
          本当にリセットしますか？
          <br />
          すべての進行状況が失われます。
        </p>
        <div className="reset-dialog__actions">
          <button className="reset-dialog__cancel" onClick={onCancel} aria-label="キャンセル">
            キャンセル
          </button>
          <button className="reset-dialog__confirm" onClick={onConfirm} aria-label="リセット">
            リセット
          </button>
        </div>
      </div>
    </div>
  );
}
