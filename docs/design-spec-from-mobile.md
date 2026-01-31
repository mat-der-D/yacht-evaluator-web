# Yacht Evaluator Web App デザイン仕様書

## 概要

本ドキュメントは、Kotlin で実装された Android アプリ「Yacht Evaluator」を React Web アプリとして再実装するためのデザイン仕様を定義するものです。

### 対象プラットフォーム

- **PC ブラウザ**: Chrome, Firefox, Safari, Edge (最新2バージョン)
- **スマートフォンブラウザ**: iOS Safari, Android Chrome

### 画面構成

- 一画面完結型 (Adaptive Display)
- スクロールなしで全コンテンツを表示
- 画面サイズに応じたコンポーネントサイズの動的調整

---

## カラーシステム

### 遊ぶモード (Play Mode) - Blue Theme

| 用途              | カラーコード | 説明                                      |
| ----------------- | ------------ | ----------------------------------------- |
| Primary           | `#3B82F6`    | メインアクセントカラー (ボタン、ヘッダー) |
| Primary Container | `#DBEAFE`    | Primary の薄い背景                        |
| On Primary        | `#FFFFFF`    | Primary 上のテキスト                      |
| Secondary         | `#60A5FA`    | セカンダリアクセント                      |
| Background        | `#F0F7FF`    | 画面全体の背景 (非常に薄い青)             |

### 分析するモード (Analysis Mode) - Orange Theme

| 用途              | カラーコード | 説明                                      |
| ----------------- | ------------ | ----------------------------------------- |
| Primary           | `#F97316`    | メインアクセントカラー (ボタン、ヘッダー) |
| Primary Container | `#FED7AA`    | Primary の薄い背景                        |
| On Primary        | `#FFFFFF`    | Primary 上のテキスト                      |
| Secondary         | `#FB923C`    | セカンダリアクセント                      |
| Background        | `#FFF4ED`    | 画面全体の背景 (非常に薄いオレンジ)       |

### 共通カラー

| 用途                       | カラーコード | 説明                                  |
| -------------------------- | ------------ | ------------------------------------- |
| Surface                    | `#FFFFFF`    | カード、行の背景                      |
| On Surface                 | `#1F2937`    | メインテキスト                        |
| On Surface Variant         | `#6B7280`    | サブテキスト                          |
| Outline                    | `#E5E7EB`    | ボーダー (薄)                         |
| Outline Variant            | `#D1D5DB`    | ボーダー (濃)                         |
| Confirmed Score Background | `#F3F4F6`    | 確定済みスコア行の背景 (小計・合計行) |
| Predicted Score Color      | `#9CA3AF`    | 予測スコアのテキスト色                |

### ダイスカラー

| 用途               | カラーコード | 説明               |
| ------------------ | ------------ | ------------------ |
| Dice Background    | `#FFFFFF`    | ダイスの背景       |
| Dice Border        | `#D1D5DB`    | 通常時のボーダー   |
| Dice Locked Border | `#3B82F6`    | ロック時のボーダー |
| Dice Dot           | `#1F2937`    | ドット (2〜6)      |
| Dice Dot One       | `#FF0000`    | 1のドット (赤)     |

---

## タイポグラフィ

フォントファミリー: システムフォント (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`)

### テキストスタイル

| スタイル名      | サイズ | 行高 | ウェイト | 用途                                 |
| --------------- | ------ | ---- | -------- | ------------------------------------ |
| Display Large   | 32px   | 40px | Bold     | -                                    |
| Display Medium  | 28px   | 36px | Bold     | -                                    |
| Headline Large  | 24px   | 32px | SemiBold | -                                    |
| Headline Medium | 20px   | 28px | SemiBold | 評価パネルタイトル                   |
| Title Large     | 18px   | 26px | Medium   | ヘッダータイトル、モードタブアイコン |
| Title Medium    | 16px   | 24px | Medium   | ヘッダースコア、ボタンテキスト       |
| Body Large      | 16px   | 24px | Normal   | 設定項目テキスト                     |
| Body Medium     | 14px   | 20px | Normal   | スコア行テキスト、評価注記           |
| Body Small      | 12px   | 16px | Normal   | 評価パネル期待値                     |
| Label Large     | 14px   | 20px | Medium   | ボタンラベル                         |
| Label Medium    | 12px   | 16px | Medium   | モードタブラベル                     |
| Label Small     | 10px   | 14px | Medium   | エラーメッセージ                     |

---

## レイアウト構造

### 全体構成

```
+------------------------------------------+
|              ヘッダー                      |
+------------------------------------------+
|                                          |
|              スコアテーブル                 |
|                                          |
+------------------------------------------+
|              区切り線                      |
+------------------------------------------+
|         アクションボタン                    |
|   [評価を見る] [リセット]                   |
+------------------------------------------+
|         ロールボタン / ロール回数選択        |
+------------------------------------------+
|              ダイス行                      |
|    [D1] [D2] [D3] [D4] [D5]              |
+------------------------------------------+
|           ボトムナビゲーション              |
|    [遊ぶ]      [分析する]                  |
+------------------------------------------+
```

### レスポンシブブレークポイント

| ブレークポイント | 幅            | 説明                                  |
| ---------------- | ------------- | ------------------------------------- |
| Mobile           | < 480px       | スマートフォン縦向き                  |
| Tablet           | 480px - 768px | スマートフォン横向き / 小型タブレット |
| Desktop          | > 768px       | PC / 大型タブレット                   |

### PC レイアウト (Desktop)

- 最大幅: `600px` (中央配置)
- 左右マージン: `auto`
- スコアテーブル行高: 固定または画面高さに応じて計算

### スマートフォンレイアウト (Mobile)

- 幅: `100%`
- 左右パディング: `16px`
- スコアテーブル行高: 画面高さから動的に計算

---

## コンポーネント仕様

### 1. ヘッダー (GameHeader)

**構造:**

```
+------------------------------------------+
| ヨット局面評価               スコア: 0     |
+------------------------------------------+
```

**スタイル:**

- 背景色: `Primary` (モードに応じて変化)
- テキスト色: `On Primary` (白)
- パディング: 上下 `12px`、左右 `16px`
- 影: `box-shadow: 0 4px 6px rgba(0,0,0,0.1)`
- 左: タイトル (Title Large)
- 右: スコア表示 (Title Medium)

---

### 2. スコアテーブル (ScoreTable)

**カテゴリ一覧:**

#### 上段 (Upper Section)

| 表示名 (JA) | 表示名 (EN) | API名 |
| ----------- | ----------- | ----- |
| エース      | Aces        | ace   |
| デュース    | Deuces      | deuce |
| トレイ      | Threes      | trey  |
| フォー      | Fours       | four  |
| ファイブ    | Fives       | five  |
| シックス    | Sixes       | six   |

#### 集計行

| 表示名 (JA) | 表示名 (EN) | 説明            |
| ----------- | ----------- | --------------- |
| 小計        | Subtotal    | 上段合計        |
| ボーナス    | Bonus       | 63点以上で+35点 |

#### 下段 (Lower Section)

| 表示名 (JA)  | 表示名 (EN) | API名         |
| ------------ | ----------- | ------------- |
| チョイス     | Choice      | choice        |
| フォーダイス | 4 of a Kind | fourOfAKind   |
| フルハウス   | Full House  | fullHouse     |
| S.ストレート | S. Straight | smallStraight |
| B.ストレート | L. Straight | bigStraight   |
| ヨット       | Yacht       | yacht         |

#### 最終行

| 表示名 (JA) | 表示名 (EN) | 説明   |
| ----------- | ----------- | ------ |
| 合計        | Total       | 総合計 |

**スコア行 (ScoreRow) - 遊ぶモード:**

```
+------------------------------------------+
| カテゴリ名      (+予測スコア)      [✓]    |
+------------------------------------------+
```

- 行高: 動的 (Adaptive Display 時は画面サイズから計算、デフォルト `38px`)
- パディング: 左右 `16px`
- 背景: `Surface` (白)

**3列構成:**

1. カテゴリ名 (左揃え、`flex: 1`)
2. スコア表示 (中央揃え、`flex: 1`)
   - 未確定: `(+予測値)` グレー表示
   - 確定済み: 数値のみ黒表示
3. 確定ボタン (右揃え、`flex: 1`)
   - ロール回数が 1 以上の場合のみ表示
   - テキスト: "✓"
   - 高さ: `28px`
   - 背景: `Primary`

**スコア行 (ScoreRow) - 分析するモード:**

```
+------------------------------------------+
| カテゴリ名   [ テキスト入力 ]        [✓]  |
+------------------------------------------+
```

- 中央カラムにテキスト入力フィールド
- ボーダー: `1px solid #808080`
- 不正な値の場合: ボーダーが赤に変化、エラーメッセージ表示

**集計行 (TotalRow):**

```
+------------------------------------------+
| 小計                 0                    |
+------------------------------------------+
```

- 背景: `Confirmed Score Background` (#F3F4F6)
- フォント: Title Medium (小計・合計) / Body Medium (ボーナス)

---

### 3. アクションボタン

**構成:**

```
[📊 評価を見る]  [リセット]
```

**評価ボタン:**

- タイプ: Primary (塗りつぶし)
- 背景: `Primary`
- テキスト: `On Primary`
- 有効条件: ロール回数 >= 1 かつ ゲーム未完了
- 無効時: グレーアウト

**リセットボタン:**

- タイプ: Outlined
- ボーダー: `1px solid Primary`
- テキスト: `Primary`
- クリック時: 確認ダイアログ表示

---

### 4. ロールボタン (遊ぶモード)

**構造:**

```
[🎲を振る (残3回)]
```

**スタイル:**

- 背景: `Primary`
- テキスト: `On Primary`
- パディング: 上下 `12px`、左右 `24px`
- 角丸: `24px` (pill shape)
- 残り回数 0 で無効化

---

### 5. ロール回数セレクター (分析するモード)

**構造:**

```
(○) 0投目  (●) 1投目  (○) 2投目  (○) 3投目
```

**スタイル:**

- ラジオボタン形式
- 選択時: `Primary` カラー
- 非選択時: グレー
- 横並び、等間隔配置

---

### 6. ダイス行 (DiceRow)

**構造:**

```
+------+ +------+ +------+ +------+ +------+
|  ⚀   | |  ⚁   | |  ⚂   | |  ⚃   | |  ⚄   |
+------+ +------+ +------+ +------+ +------+
```

**ダイス (DieView):**

- アスペクト比: `1:1` (正方形)
- 背景: `Dice Background` (白)
- ボーダー: `2px solid Dice Border`
- 角丸: `8px`
- ギャップ: `8px`

**ドットパターン:**

| 値  | パターン           | 中央ドット色   |
| --- | ------------------ | -------------- |
| 1   | 中央に1ドット      | 赤 (`#FF0000`) |
| 2   | 対角線に2ドット    | 黒             |
| 3   | 対角線に3ドット    | 黒             |
| 4   | 四隅に4ドット      | 黒             |
| 5   | 四隅+中央に5ドット | 黒             |
| 6   | 左右3列に6ドット   | 黒             |

**ドットサイズ:**

- 値 1: `12px`
- 値 2〜6: `9.5px`

**ロック状態 (遊ぶモードのみ):**

- ボーダー: `3px solid #3B82F6` (青)
- 右上に🔒アイコン表示

**インタラクション:**

- 遊ぶモード: クリックでロック/アンロック切り替え
- 分析するモード: クリックで値を 1→2→3→4→5→6→1 とサイクル

---

### 7. ボトムナビゲーション (ModeTabs)

**構造:**

```
+------------------------------------------+
|    🎲        |        🔍                 |
|   遊ぶ       |      分析する              |
+------------------------------------------+
```

**スタイル:**

- 高さ: `64px`
- 背景: `Surface` (白)
- 各タブ: `flex: 1`
- アイコン: Title Large (18px)
- ラベル: Label Medium (12px)

**選択状態:**

- 遊ぶ: `#3B82F6` (青)
- 分析する: `#F97316` (オレンジ)
- インジケーター背景: `Primary` の 12% 透明度

**非選択状態:**

- アイコン・テキスト: `On Surface Variant` (グレー)

---

### 8. 評価パネル (EvaluationPanel)

**オーバーレイ構造:**

```
+------------------------------------------+
|                                          |
|         (半透明の背景オーバーレイ)         |
|                                          |
+------------------------------------------+
|    ━━━━━ (ドラッグハンドル)               |
|                                          |
| 評価値                            [×]    |
|                                          |
| ※ 期待値は最終スコアの見込みです          |
|                                          |
| ─────────────────────────────────────── |
| ⚀⚁⚂ を残す                        [🔒] |
| 期待値 191.79 点 (Best)                  |
| ─────────────────────────────────────── |
| ⚀⚁⚂⚃ を残す                       [🔒] |
| 期待値 190.72 点 (Best - 1.07)           |
| ...                                      |
+------------------------------------------+
```

**バックドロップ:**

- 背景: `rgba(0, 0, 0, 0.5)`
- クリックでパネルを閉じる

**パネル:**

- 位置: 画面下部からスライドイン
- 初期高さ: 画面の 48%
- 最小高さ: 画面の 25%
- 最大高さ: 画面の 85%
- 背景: `Surface` (白)
- 角丸: 上部のみ `16px`

**ドラッグハンドル:**

- 幅: `40px`
- 高さ: `4px`
- 色: `On Surface Variant` の 40% 透明度
- 角丸: `2px`
- 上下ドラッグでパネル高さを変更可能

**ヘッダー:**

- タイトル: "評価値" (Headline Medium)
- 閉じるボタン: × アイコン (右端)

**コンテンツ:**

- 注釈: "※ 期待値は最終スコアの見込みです"
- 推奨アクションリスト (スクロール可能)

**推奨アクション項目:**

- 区切り線: `1.5px solid Outline`
- アクション説明 (Title Medium)
  - ダイスキープ: "⚀⚁⚂ を残す" (ダイス絵文字は1.5倍サイズ)
  - カテゴリ確定: "チョイス確定"
- 期待値 (Body Small, グレー)
  - Best: "(Best)"
  - 差分あり: "(Best - X.XX)"
- 適用ボタン
  - ダイスキープ: "🔒"
  - カテゴリ確定: "✓"

**ローディング状態:**

- 中央にスピナー表示 (Primary カラー)

**エラー状態:**

- タイトル: "エラー"
- エラーメッセージを中央に表示 (赤テキスト)

---

### 9. リセット確認ダイアログ

**構造:**

```
+------------------------------------------+
| ゲームをリセット                          |
|                                          |
| 本当にリセットしますか？                   |
| すべての進行状況が失われます。              |
|                                          |
|              [キャンセル]  [リセット]      |
+------------------------------------------+
```

**スタイル:**

- タイトル: Headline Small
- 本文: Body Medium
- キャンセル: テキストボタン
- リセット: テキストボタン (赤テキスト)

---

## アニメーション

### パネルスライドイン

- 方向: 下から上
- 所要時間: `300ms`
- イージング: `ease-out`

### パネルスライドアウト

- 方向: 上から下
- 所要時間: `250ms`
- イージング: `ease-in`

### パネル高さ変更

- アニメーション: Spring
- DampingRatio: NoBouncy
- Stiffness: Medium

---

## 国際化 (i18n)

### 日本語 (ja)

```json
{
  "app_name": "ヨット評価",
  "header_title": "ヨット局面評価",
  "mode_play": "遊ぶ",
  "mode_analysis": "分析する",
  "roll_dice": "🎲を振る",
  "rolls_left": "(残{count}回)",
  "evaluate": "評価を見る",
  "reset": "リセット",
  "confirm": "確定",
  "close": "閉じる",
  "category_ace": "エース",
  "category_deuce": "デュース",
  "category_trey": "トレイ",
  "category_four": "フォー",
  "category_five": "ファイブ",
  "category_six": "シックス",
  "category_choice": "チョイス",
  "category_four_of_a_kind": "フォーダイス",
  "category_full_house": "フルハウス",
  "category_small_straight": "S.ストレート",
  "category_big_straight": "B.ストレート",
  "category_yacht": "ヨット",
  "upper_total": "小計",
  "bonus": "ボーナス",
  "total": "合計",
  "score_format": "スコア: {score}",
  "evaluation_title": "評価値",
  "error_title": "エラー",
  "expected_value_note": "※ 期待値は最終スコアの見込みです",
  "reroll_all": "すべて振り直す",
  "hold_dice_format": "{dice} を残す",
  "confirm_category_format": "{category}確定",
  "expected_value_format": "期待値 {value} 点",
  "best": "(Best)",
  "best_minus_format": "(Best - {diff})",
  "roll_count_0": "0投目",
  "roll_count_1": "1投目",
  "roll_count_2": "2投目",
  "roll_count_3": "3投目",
  "reset_confirmation_title": "ゲームをリセット",
  "reset_confirmation_message": "本当にリセットしますか？すべての進行状況が失われます。",
  "cancel": "キャンセル",
  "error_network": "ネットワークエラー。接続を確認してください。",
  "error_server": "サーバーでエラーが発生しました。しばらく待ってから再度お試しください。",
  "error_timeout": "通信がタイムアウトしました。もう一度お試しください。",
  "error_unknown": "予期しないエラーが発生しました。"
}
```

### 英語 (en)

```json
{
  "app_name": "Yacht Evaluator",
  "header_title": "Yacht Evaluator",
  "mode_play": "Play",
  "mode_analysis": "Analysis",
  "roll_dice": "Roll 🎲s",
  "rolls_left": "({count} Left)",
  "evaluate": "Evaluate",
  "reset": "Reset",
  "confirm": "Confirm",
  "close": "Close",
  "category_ace": "Aces",
  "category_deuce": "Deuces",
  "category_trey": "Threes",
  "category_four": "Fours",
  "category_five": "Fives",
  "category_six": "Sixes",
  "category_choice": "Choice",
  "category_four_of_a_kind": "4 of a Kind",
  "category_full_house": "Full House",
  "category_small_straight": "S. Straight",
  "category_big_straight": "L. Straight",
  "category_yacht": "Yacht",
  "upper_total": "Subtotal",
  "bonus": "Bonus",
  "total": "Total",
  "score_format": "Score: {score}",
  "evaluation_title": "Evaluation",
  "error_title": "Error",
  "expected_value_note": "※ Expected value is the final score estimate",
  "reroll_all": "Reroll all",
  "hold_dice_format": "Hold {dice}",
  "confirm_category_format": "Confirm {category}",
  "expected_value_format": "Expected value {value}",
  "best": "(Best)",
  "best_minus_format": "(Best - {diff})",
  "roll_count_0": "0th",
  "roll_count_1": "1st",
  "roll_count_2": "2nd",
  "roll_count_3": "3rd",
  "reset_confirmation_title": "Reset Game",
  "reset_confirmation_message": "Are you sure you want to reset the game? All progress will be lost.",
  "cancel": "Cancel",
  "error_network": "Network error. Check your connection.",
  "error_server": "Server error occurred. Please try again later.",
  "error_timeout": "Request timed out. Please try again.",
  "error_unknown": "An unexpected error occurred."
}
```

---

## API 連携

### エンドポイント

```
POST https://yacht-evaluator-api-1092304578340.asia-northeast1.run.app/api/v1/evaluate
```

### リクエスト形式

```json
{
  "scoreSheet": {
    "ace": null,
    "deuce": null,
    "trey": 9,
    "four": null,
    "five": null,
    "six": null,
    "choice": null,
    "fourOfAKind": null,
    "fullHouse": null,
    "smallStraight": null,
    "bigStraight": null,
    "yacht": null
  },
  "dice": [1, 2, 3, 4, 5],
  "rollCount": 2
}
```

**重要:** 未入力のカテゴリは `null` として明示的に送信する必要があります。

### レスポンス形式

```json
{
  "recommendations": [
    {
      "type": "dice",
      "diceToHold": [1, 2, 3],
      "expectedValue": 191.79
    },
    {
      "type": "category",
      "category": "choice",
      "expectedValue": 185.0
    }
  ]
}
```

---

## 状態管理

### GameState

```typescript
interface GameState {
  dice: number[]; // [1-6, 1-6, 1-6, 1-6, 1-6]
  lockedDice: boolean[]; // 5要素の配列
  scoreSheet: ScoreSheet;
  rollCount: RollCount; // ZERO, ONE, TWO, THREE
  mode: GameMode; // PLAY, ANALYSIS
}

interface ScoreSheet {
  ace: number | null;
  deuce: number | null;
  trey: number | null;
  four: number | null;
  five: number | null;
  six: number | null;
  choice: number | null;
  fourOfAKind: number | null;
  fullHouse: number | null;
  smallStraight: number | null;
  bigStraight: number | null;
  yacht: number | null;
}

type RollCount = 'ZERO' | 'ONE' | 'TWO' | 'THREE';
type GameMode = 'PLAY' | 'ANALYSIS';
```

### EvaluationUiState

```typescript
type EvaluationUiState =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'success'; recommendations: Recommendation[] }
  | { type: 'error'; message: string };

type Recommendation =
  | { type: 'dice'; diceToHold: number[]; expectedValue: number }
  | { type: 'category'; category: string; expectedValue: number };
```

---

## アクセシビリティ

### キーボードナビゲーション

- Tab キーで全てのインタラクティブ要素にフォーカス可能
- Enter/Space キーでボタン押下
- Escape キーでモーダル/パネルを閉じる

### スクリーンリーダー対応

- 全てのボタンに適切な `aria-label`
- ダイスには "Dice showing X, locked/unlocked" の説明
- 評価パネルには `role="dialog"` と `aria-modal="true"`

### カラーコントラスト

- テキストと背景のコントラスト比: WCAG AA 基準 (4.5:1) 以上を維持

---

## 実装上の注意点

1. **Adaptive Display の計算:**
   - 画面高さからヘッダー、ボトムナビ、アクションエリア、ダイス行の高さを引いた残りをスコアテーブルに割り当てる
   - スコアテーブルは 15 行 (12カテゴリ + 小計 + ボーナス + 合計)
   - 行高 = (利用可能高さ) / 15

2. **ダイスのランダム生成:**
   - 遊ぶモードでのロール時、`Math.random()` で 1-6 を生成
   - ロックされたダイスは値を保持

3. **スコアバリデーション:**
   - 分析するモードでは、各カテゴリに対して有効なスコアかどうかを検証
   - 無効な値の場合はエラー表示し、API 呼び出しを防ぐ

4. **API タイムアウト:**
   - 30秒のタイムアウトを設定
   - タイムアウト時は適切なエラーメッセージを表示
