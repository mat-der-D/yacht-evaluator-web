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

### 5. Analysis モード - ラジオボタン状態管理（DiceActions.tsx）

- ✅ `SET_ROLLCOUNT` アクションを GameContext に追加
- ✅ GameReducer に `SET_ROLLCOUNT` ケースを実装
- ✅ DiceActions の AnalysisModeActions で `useGame()` を使用
- ✅ ラジオボタンの `checked` 属性を `gameState.rollCount` と同期
- ✅ `onChange` ハンドラで `SET_ROLLCOUNT` アクションを dispatch
- ✅ ユーザーがラジオボタンを選択すると gameState が更新される

### 6. DiceActions のスタイリング（global.css）

- ✅ `.dice-actions` - フレックスボックスで横並び、中央寄せ
- ✅ `.dice-actions button` - Play モード用：青いボタン、パディング、ボーダーラウンド
- ✅ `.dice-actions button:hover:not(:disabled)` - ホバー時に濃い青に変更
- ✅ `.dice-actions button:disabled` - 無効時グレーアウト、禁止マーク表示
- ✅ `.dice-actions label` - ラジオボタンとテキストを横並び、中央揃え
- ✅ `.dice-actions input[type="radio"]` - ポインタカーソル表示

### 7. Play モード - ボタン disabled 状態（DiceActions.tsx）

- ✅ `PlayModeActions` の button に `disabled` 属性を追加
- ✅ `disabled={rollsRemaining === 0}` で 3 回振り終わったら自動無効化
- ✅ CSS の disabled スタイルでビジュアルが自動的に変わる

### 8. 全体動作確認

- ✅ ダイスが表示される
- ✅ Play モード: ダイスをクリックするとロック（🔒 表示）
- ✅ Play モード: もう一度クリックするとロック解除（🔒 消える）
- ✅ Play モード: ロック状態のダイスは「ロール」時に値が変わらない
- ✅ Play モード: [サイコロを振る] ボタンが 3 回目後に無効化される（グレーアウト）
- ✅ Analysis モード: ダイスをクリックで値がサイクル（1→2→...→6→1）
- ✅ Analysis モード: 🔒 アイコンが表示されない
- ✅ Analysis モード: ラジオボタンで投数（0/1/2/3 投目）を選択可能
- ✅ Analysis モード: ラジオボタン選択で gameState.rollCount が更新される
- ✅ モード切り替え時にアイコン（🎮 vs 🔍）が変わる、UI が切り替わる

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

### 制御されたコンポーネント（Controlled Component）

- フォーム要素（ラジオボタン、入力欄など）の状態を React state で完全に管理
- `checked` 属性と `onChange` ハンドラで、ユーザー操作と React state を同期
- 「単一の真実の源（Single Source of Truth）」という React の重要設計原則
- ユーザー操作 → dispatch → state 更新 → UI 再レンダリング の流れが重要

**実装例**:

```typescript
<input
  type="radio"
  checked={gameState.rollCount === roll}
  onChange={() => dispatch({ type: 'SET_ROLLCOUNT', payload: roll as RollCount })}
/>
```

### HTML 属性による動的な動作制御

- `disabled` 属性で要素の有効/無効を制御
- CSS セレクタ `:disabled` で無効状態のスタイルを指定
- JavaScript で `disabled={条件}` と指定するだけで、HTML の `disabled` 属性が自動付与される

**実装例**:

```typescript
<button disabled={rollsRemaining === 0}>
  [サイコロを振る]
</button>
```

## ファイル構成（完了）

```
src/
├── types/
│   ├── game.ts ✅
│   ├── api.ts ✅
│   └── ui.ts ✅
├── context/
│   └── GameContext.tsx ✅ (ROLL_DICE, LOCK_DICE, INCREMENT_DICE, SET_ROLLCOUNT 実装)
├── components/
│   ├── Layout.tsx ✅ (シンプル化)
│   ├── ModeTab.tsx ✅ (useGame で統一)
│   ├── GameHeader.tsx ✅ (useGame で統一)
│   ├── DiceActions.tsx ✅ (Play/Analysis モード両対応、disabled 実装)
│   ├── DiceDisplay.tsx ✅
│   ├── DiceItem.tsx ✅ (ロック機能 + INCREMENT_DICE)
│   └── ...
├── styles/
│   └── global.css ✅ (dice-item + dice-actions スタイル追加)
├── App.tsx ✅
└── main.tsx
```

## 重要な実装パターン

### React における条件付きレンダリング

```typescript
// 方法 1: 中間変数（推奨）
const showLockIcon = isLocked && gameState.mode === 'play';
className={showLockIcon ? 'dice-item--locked' : 'dice-item--unlocked'}

// 方法 2: 直接（シンプルな条件向け）
className={isLocked && gameState.mode === 'play' ? 'dice-item--locked' : 'dice-item--unlocked'}

// 方法 3: テンプレートリテラル（複数クラスの場合）
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

### 制御されたラジオボタンの実装

```typescript
function AnalysisModeActions() {
  const { gameState, dispatch } = useGame();

  return (
    <div className="dice-actions">
      {[0, 1, 2, 3].map((roll) => (
        <label key={roll}>
          <input
            type="radio"
            name="rollCount"
            value={roll}
            checked={gameState.rollCount === roll}
            onChange={() => dispatch({ type: 'SET_ROLLCOUNT', payload: roll as RollCount })}
          />
          {roll}投目
        </label>
      ))}
    </div>
  );
}
```

ポイント：

- `checked={gameState.rollCount === roll}` で現在選択状態を表示
- `onChange` で dispatch して状態を更新
- TypeScript の型キャスト `as RollCount` で型安全性を確保

### button の disabled 属性制御

```typescript
const rollsRemaining = Math.max(0, 3 - rollCount);

<button
  onClick={() => dispatch({ type: 'ROLL_DICE' })}
  disabled={rollsRemaining === 0}
>
  [サイコロを振る] あと {rollsRemaining} 回
</button>
```

ポイント：

- `disabled={条件}` で HTML の disabled 属性が自動付与
- CSS の `:disabled` セレクタでスタイルが自動適用
- ユーザーはクリック不可、視覚的に無効状態が表示される

## 次のフェーズ

**Phase 4: スコアシート実装** へ進む準備完了 ✅

主なタスク：

- スコア計算ロジック（utils/calculateScore.ts）
  - 各役のスコア計算関数（ace, deuce, trey 等）
  - 特殊役の判定（Yacht, Full House, Straight 等）
  - ボーナス計算（上段合計 >= 63 で 35 点）
- ScoreSheet コンポーネント（テーブル構造）
  - 13 個の役を表示（上段 6 + 下段 7）
  - 合計・ボーナス行の表示
- ScoreRow コンポーネント（各行の UI）
  - 確定/未確定の視覚的区別
  - 確定ボタンの表示
- スコア確定時の処理
  - scoreSheet を更新
  - ダイスをリセット（rollCount: 0, ロック解除）
  - 次のターンへ移行
