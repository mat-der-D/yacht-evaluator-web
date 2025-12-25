# Phase 2 進捗メモ

## 完了した項目

### 1. 型定義の完成
- ✅ `src/types/api.ts` - API リクエスト/レスポンス型を定義
  - `Category` type（13個のロール名）
  - `DiceChoice`, `CategoryChoice` interface
  - `EvaluateRequest`, `EvaluateResponse` interface

- ✅ `src/types/ui.ts` - UI 状態管理の型を定義
  - `EvaluationPanelState` interface
  - `UIState` interface
  - `initialUIState` 初期値

### 2. GameContext の実装
- ✅ `src/context/GameContext.tsx` - 完成
  - `gameReducer` 関数（ROLL_DICE, LOCK_DICE, UPDATE_SCORE_SHEET, CHANGE_MODE, RESET_GAME）
  - `GameContext` の作成
  - `GameProvider` コンポーネント
  - `useGame()` カスタムフック

### 3. App と主要コンポーネントの修正
- ✅ `src/App.tsx` - GameProvider でラップ
- ✅ `src/components/Layout.tsx` - useGame を使用，props 削除
- ✅ `src/components/DiceActions.tsx` - useGame を使用，dispatch で ROLL_DICE 実装
- ✅ `src/components/DiceDisplay.tsx` - useGame を使用
- ✅ `src/components/DiceItem.tsx` - useGame を使用，index を props で受け取り

## 次回のタスク

### すぐやること
1. **DiceItem にロック機能を追加**
   - クリックハンドラを実装
   - `dispatch({ type: 'LOCK_DICE', payload: index })` を実行
   - `isLocked` の状態に応じて CSS class を変更
   - CSS を定義（border 色の変更など）

2. **ModeTab の修正（検討中）**
   - 現在は Layout で `handleModeChange` を定義して props で渡している
   - DiceItem と統一するなら、ModeTab 内で useGame を使う方式に変更

3. **全体動作テスト**
   - `bun run dev` で動作確認
   - React DevTools で Context の値を確認
   - ダイスを振る機能が動くか確認
   - ダイスをロック/アンロックできるか確認

## 学習ポイント（重要な概念）

### Context API の本質
- `useReducer` = React が管理する状態管理の仕組み（ポインタのようなもの）
- `dispatch` = reducer を実行して状態を更新するための通知関数
- `GameContext` = gameState と dispatch を配布する「箱」
- `GameProvider` = その箱を管理するコンポーネント
- `useContext` = 親のツリーを走査して Provider から値を取得

### Prop Drilling の解決
- Before: App → Layout → DiceActions → PlayModeActions と props を下ろしていた
- After: 各コンポーネントが useGame() で直接 gameState と dispatch を取得

## 注意事項

1. **MRO（Method Resolution Order）的なコンテキスト探索**
   - useContext は親のツリーを上に向かって走査する
   - 最も近い Provider が優先される
   - Provider がない場合は undefined で throw

2. **useGame の必要性**
   - GameContext を読む場合は必ず GameProvider でラップ
   - Provider なしで useGame を呼ぶとエラー

## ファイル構成（現在）

```
src/
├── types/
│   ├── game.ts ✅
│   ├── api.ts ✅
│   └── ui.ts ✅
├── context/
│   └── GameContext.tsx ✅
├── components/
│   ├── Layout.tsx ✅
│   ├── ModeTab.tsx (props で使用中)
│   ├── GameHeader.tsx (props で使用中)
│   ├── DiceActions.tsx ✅
│   ├── DiceDisplay.tsx ✅
│   ├── DiceItem.tsx ✅（次回ロック機能追加）
│   └── ...
├── App.tsx ✅
└── main.tsx
```

## 次回開始位置

**ファイル**: `src/components/DiceItem.tsx`

**タスク**: ロック機能の実装
```typescript
// クリックハンドラを追加
// dispatch({ type: 'LOCK_DICE', payload: index })
// isLocked に応じて className を変更
// CSS を定義
```
