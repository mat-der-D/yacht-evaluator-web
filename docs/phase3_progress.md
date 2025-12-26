# Phase 3 進捗メモ

## 完了した項目

### 1. ロック機能の実装（DiceItem.tsx）

- ✅ クリックハンドラを実装
- ✅ Play モード時に `dispatch({ type: 'LOCK_DICE', payload: index })` を実行
- ✅ Analysis モード時に `dispatch({ type: 'INCREMENT_DICE', payload: index })` を実行
- ✅ `isLocked && gameState.mode === 'play'` の条件で CSS クラスを動的に変更
- ✅ `showLockIcon` という中間変数で意図を名前付け

### 2. INCREMENT_DICE アクションの実装（GameContext.tsx）

- ✅ Analysis モード用のアクションを追加
- ✅ ダイスの値をサイクル: `((die % 6) + 1)` で 1→2→...→6→1 の循環を実装

### 3. CSS スタイリング（global.css）

- ✅ `.dice-item` - 共通スタイル（サイズ、フレックスボックス、トランジション）
- ✅ `.dice-item--unlocked` - グレーの枠線、白い背景
- ✅ `.dice-item--locked` - 青い枠線、薄い青い背景
- ✅ `.dice-item--locked::after` - 🔒 アイコンをポジショニング

### 4. Prop Drilling の完全な解決

#### ModeTab の修正
- ✅ GameHeaderProps インターフェース削除
- ✅ `useGame()` で gameState を直接取得
- ✅ onClick で `dispatch({ type: 'CHANGE_MODE', payload: ... })` を実行

#### GameHeader の修正
- ✅ GameHeaderProps インターフェース削除
- ✅ `useGame()` で gameState を直接取得
- ✅ props を削除

#### Layout の簡潔化
- ✅ `handleModeChange` 関数を削除
- ✅ 不要な `useGame` 呼び出しを削除
- ✅ コンポーネント構成に専念

### 5. 全体動作確認

- ✅ ダイスが表示される
- ✅ Play モード: ダイスをクリックするとロック（🔒 表示）
- ✅ Play モード: もう一度クリックするとロック解除（🔒 消える）
- ✅ Play モード: ロック状態のダイスは「ロール」時に値が変わらない
- ✅ Analysis モード: ダイスをクリックで値がサイクル
- ✅ Analysis モード: 🔒 アイコンが表示されない
- ✅ モード切り替え時にアイコン（🎲 vs 🔍）が変わる

## 学習ポイント（重要な概念）

### 条件付きスタイリング
- テンプレートリテラル + 三項演算子で className を動的に生成
- React では同じ HTML 要素でも状態に応じて見た目を変える
- BEM 記法（Block Element Modifier）でスタイルクラスを命名

### 中間変数で意図を名前付けする
- `showLockIcon` という変数で条件判定を分かりやすく
- ロジック（条件判定）と UI（JSX）を分離
- テストしやすく、後の修正が容易

### Context API での責任分離
- 各コンポーネントが必要なデータと操作を自分で管理
- Props を中間層で受け渡す必要がない（Prop Drilling 解決）
- コンポーネント構造の変更に強いアーキテクチャ

### CSS 疑似要素 `::after` の活用
- 要素の後ろに新しい要素を挿入（content プロパティで指定）
- DOM を増やさずに視覚的な装飾を追加
- 特定の条件下でのみ表示（セレクタの組み合わせ）

## ファイル構成（完了）

```
src/
├── types/
│   ├── game.ts ✅
│   ├── api.ts ✅
│   └── ui.ts ✅
├── context/
│   └── GameContext.tsx ✅ (ROLL_DICE, LOCK_DICE, INCREMENT_DICE 実装)
├── components/
│   ├── Layout.tsx ✅ (シンプル化)
│   ├── ModeTab.tsx ✅ (useGame で統一)
│   ├── GameHeader.tsx ✅ (useGame で統一)
│   ├── DiceActions.tsx ✅
│   ├── DiceDisplay.tsx ✅
│   ├── DiceItem.tsx ✅ (ロック機能 + INCREMENT_DICE)
│   └── ...
├── styles/
│   └── global.css ✅ (dice-item スタイル追加)
├── App.tsx ✅
└── main.tsx
```

## 重要な実装パターン

### React における条件付きレンダリング

```typescript
// 方法 1: 中間変数
const showLockIcon = isLocked && gameState.mode === 'play';
className={showLockIcon ? 'dice-item--locked' : 'dice-item--unlocked'}

// 方法 2: 直接
className={isLocked && gameState.mode === 'play' ? 'dice-item--locked' : 'dice-item--unlocked'}

// 方法 3: テンプレートリテラル
className={`dice-item ${isLocked && gameState.mode === 'play' ? '--locked' : '--unlocked'}`}
```

方法 1 が最も読みやすく、テストしやすい。

### GameContext での複雑な状態更新

```typescript
case 'INCREMENT_DICE': {
  const newDice = state.dice.map((die, index) =>
    index === action.payload ? (die % 6) + 1 : die
  );
  return { ...state, dice: newDice };
}
```

配列の特定要素だけを更新しつつ、イミュータビリティを保つ。

## 次のフェーズ

**Phase 4: スコアシート実装** へ進む準備完了

主なタスク：
- スコア計算ロジック（utils/calculateScore.ts）
- ScoreSheet コンポーネント（テーブル構造）
- ScoreRow コンポーネント（各行のUI）
- 確定ボタンのアクション
- 合計・ボーナスの自動計算
