import { useEffect } from 'react';

/**
 * ビューポート高さを管理するカスタムフック
 *
 * Android PWAでスワイプ更新後にレイアウトが崩れる問題を修正するため、
 * JavaScriptで実際のビューポート高さを検出し、CSS変数として設定する。
 *
 * - visualViewport API を優先（より正確な値）
 * - resize イベントで画面回転やPull-to-refresh後の変化を検出
 */
export function useViewportHeight() {
  useEffect(() => {
    const updateViewportHeight = () => {
      // visualViewport API を優先（より正確な値）
      const vh = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty('--viewport-height', `${vh}px`);
    };

    // 初期化
    updateViewportHeight();

    // イベントリスナー設定
    window.addEventListener('resize', updateViewportHeight);

    // visualViewport API がある場合はそちらも監視
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewportHeight);
    }

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateViewportHeight);
      }
    };
  }, []);
}
