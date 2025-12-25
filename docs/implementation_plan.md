# ヨット局面評価Webアプリ 実装計画

フロントエンド経験が浅い開発者向けの段階的実装計画です。各フェーズで学習しながら進めます。

## 📋 プロジェクト概要

- **目標**: React 19 + TypeScript + Bun による単体プレイ対応のヨット評価Webアプリ
- **難易度**: 初心者向け段階的実装
- **総フェーズ数**: 7フェーズ
- **推定工数**: 約40-50時間（個人差あり）

---

## 🎯 フェーズ一覧

| フェーズ | 内容 | 優先度 | 学習ポイント |
|---------|------|--------|------------|
| Phase 1 | プロジェクト初期化・基本レイアウト | ⭐⭐⭐ | React の基本、コンポーネント構成 |
| Phase 2 | 型定義・状態管理基盤 | ⭐⭐⭐ | TypeScript 型定義、Context API |
| Phase 3 | ダイスUI・プレイモード基本 | ⭐⭐⭐ | イベントハンドリング、setState |
| Phase 4 | スコアシート実装 | ⭐⭐⭐ | リスト表示、条件付きレンダリング |
| Phase 5 | 局面解析モード・モード切り替え | ⭐⭐ | Context による状態同期 |
| Phase 6 | API連携・評価機能 | ⭐⭐ | async/await、エラーハンドリング |
| Phase 7 | スタイリング・レスポンシブ対応 | ⭐⭐ | CSS、メディアクエリ |

---

## 📁 プロジェクト構造（最終形）

```
src/
├── components/
│   ├── Layout.tsx              ← 全体レイアウト
│   ├── ModeTab.tsx             ← モード切り替えタブ
│   ├── GameHeader.tsx          ← ゲームヘッダー（アイコン）
│   ├── DiceDisplay.tsx         ← ダイス表示コンポーネント
│   ├── DiceItem.tsx            ← 1つのダイスアイテム
│   ├── DiceActions.tsx         ← ダイス操作エリア
│   ├── ScoreSheet.tsx          ← スコアシート
│   ├── ScoreRow.tsx            ← スコアシートの1行
│   ├── EvaluationButton.tsx    ← 評価ボタン
│   ├── EvaluationPanel.tsx     ← 評価パネル（サイドパネル）
│   └── PlayMode.tsx            ← プレイモード（コンテナ）
├── hooks/
│   ├── useGameState.ts         ← ゲーム状態管理
│   └── useEvaluation.ts        ← 評価API連携
├── context/
│   └── GameContext.tsx         ← Context定義
├── types/
│   ├── game.ts                 ← ゲーム関連型定義
│   ├── api.ts                  ← API関連型定義
│   └── ui.ts                   ← UI関連型定義
├── utils/
│   ├── calculateScore.ts       ← スコア計算ロジック
│   ├── diceUtils.ts            ← ダイス関連ユーティリティ
│   └── validation.ts           ← 入力検証
├── styles/
│   ├── global.css              ← グローバルスタイル
│   ├── components.css          ← コンポーネント共通スタイル
│   └── variables.css           ← CSS変数（色、サイズ）
├── App.tsx                     ← アプリケーションのルート
├── main.tsx                    ← エントリーポイント
└── vite-env.d.ts               ← Vite型定義
```

---

## 🚀 フェーズ詳細

### Phase 1: プロジェクト初期化・基本レイアウト

**目標**: 基本的なレイアウトを構築し、React コンポーネントの基本を理解する

**タスク**:
1. 既存プロジェクトをクリーンアップ
   - Vite テンプレートの不要ファイル削除
   - `src/` ディレクトリ構造を計画に合わせ整備

2. TypeScript 設定確認・調整
   - `tsconfig.json` で strict mode を有効化
   - `tsconfig.app.json` で必要な設定を確認

3. 基本型定義作成（`types/game.ts`）
   ```typescript
   type RollCount = 0 | 1 | 2 | 3;
   type GameMode = 'play' | 'analysis';
   
   interface GameState {
     mode: GameMode;
     rollCount: RollCount;
     dice: number[];
     // ... その他
   }
   ```

4. Layout コンポーネント作成
   - 全体の骨組みレイアウト（CSS Grid/Flexbox）
   - モード表示エリア、ダイスエリア、スコアシートエリアの配置

5. ModeTab コンポーネント
   - プレイモード / 局面解析モード の切り替えUI
   - モード切り替え時の色変更

6. グローバルスタイル設定
   - CSS リセット（margin, padding 等）
   - CSS 変数定義（色、サイズ、フォント）
   - レスポンシブ対応基盤

**学習ポイント**:
- React コンポーネントの作成・構成
- JSX の基本構文
- TypeScript による型定義
- Flexbox/Grid の基本
- CSS 変数の活用

**完成物の確認方法**:
```bash
bun run dev
# ブラウザで http://localhost:5173 にアクセス
# レイアウトが表示され、モード切り替えボタンが動作すること
```

---

### Phase 2: 型定義・状態管理基盤

**目標**: TypeScript の型安全性を確保し、Context API で状態管理を構築する

**タスク**:
1. 完全な型定義を整備（`types/`）
   - `types/game.ts`: RollCount, GameState, ScoreSheet, Category 等
   - `types/api.ts`: API リクエスト/レスポンス型
   - `types/ui.ts`: UI 状態関連型（パネル開閉 等）

2. Context と Hook 作成（`context/GameContext.tsx`）
   - GameProvider コンポーネント
   - useGame カスタムフック

3. ゲーム状態の初期値定義
   - scoreSheet の初期値（全て null）
   - dice の初期値（ランダムまたは固定）
   - rollCount の初期値（0）

4. Context に実装する関数
   - `rollDice()`: ダイスを振る
   - `lockDice()`: ダイスをロック
   - `updateScoreSheet()`: スコアを更新
   - `resetGame()`: ゲームをリセット

5. Reducer パターンの理解（useReducer の活用）
   - useReducer で複雑な状態管理を一元化
   - Action type の定義

**学習ポイント**:
- TypeScript の型定義のベストプラクティス
- React Context API の使い方
- useContext, useReducer の理解
- 状態管理の設計思想

**テスト方法**:
```typescript
// App.tsx で Context を使用できることを確認
const { gameState, rollDice } = useGame();
console.log(gameState); // 状態が正しく初期化されていること
```

---

### Phase 3: ダイスUI・プレイモード基本

**目標**: ダイスの表示・操作を実装し、プレイモードの基本フローを完成させる

**タスク**:
1. ダイス表示コンポーネント（`components/DiceDisplay.tsx`）
   - 5つのダイスを横並びで表示
   - ダイス目をドット記号（⚀⚁⚂⚃⚄⚅）で表示

2. DiceItem コンポーネント（`components/DiceItem.tsx`）
   - プレイモード用：ロック/ロック解除の視覚化
     - 通常状態：薄いグレーの枠線
     - ロック状態：太い青枠 + 🔒 アイコン
   - クリックでロック状態を切り替え

3. DiceActions コンポーネント（`components/DiceActions.tsx`）
   - プレイモード
     - [サイコロを振る] ボタン
     - 「あと X 回」表示
     - ボタンが無効な条件（`rollsRemaining === 0`）
   - 局面解析モード
     - ラジオボタン（0投目、1投目、2投目、3投目）

4. イベントハンドリング実装
   - ダイスクリックでロック状態を更新
   - ボタンクリックでダイスを振る（ランダム生成）
   - rollsRemaining の再計算と表示更新

5. ダイス値の計算・管理
   - `calculateRollsRemaining()` ユーティリティ
   - ロック状態の永続化

6. PlayMode コンテナコンポーネント
   - ダイスUI とゲーム状態を接続
   - イベントハンドラーをまとめる

**学習ポイント**:
- イベントハンドリング（onClick, onChange 等）
- useState/useReducer での状態更新
- 条件付きレンダリング
- クラス名による動的スタイル変更

**完成物の確認方法**:
```
- ダイスが表示される
- ダイスをクリックするとロック状態になる（視覚的に変化）
- [サイコロを振る] をクリックするとダイス値が変わる
- 3回振った後、ボタンが無効化される
```

---

### Phase 4: スコアシート実装

**目標**: スコアシートを完全に実装し、スコア計算ロジックを組み込む

**タスク**:
1. スコア計算ロジック（`utils/calculateScore.ts`）
   - 各役のスコア計算関数（ace, deuce, trey, four, five, six 等）
   - ボーナス計算（上段合計が 63 以上で 35 点）
   - 役が未確定の場合の「プレビュー」計算（`(+XX)` 表示）

2. ScoreSheet コンポーネント（`components/ScoreSheet.tsx`）
   - テーブル構造：役名、得点、操作 の3カラム
   - 上段6役 + 上段合計 + ボーナス + 下段7役 + 合計

3. ScoreRow コンポーネント（`components/ScoreRow.tsx`）
   - 各行を独立したコンポーネントに分割
   - 確定状態による背景色の変更（#f3f4f6 or 白）
   - [確定] ボタンの表示・非表示（`rollCount === 0` で非表示）

4. スコアシート状態管理
   - scoreSheet オブジェクトで全役の状態を保持
   - 数値、null（未確定）、0（埋め）を区別

5. [確定] ボタンのアクション
   - 現在のダイス目で役のスコアを計算
   - scoreSheet を更新
   - ダイスをリセット（rollCount: 0, 全ダイスのロックを解除）
   - 次のターンへ

6. Fragment の活用
   - シックスの直下に「上段合計」「ボーナス」行を条件付きで挿入

7. スコア集計表示
   - 上段合計の自動計算
   - ボーナスの自動判定・計算
   - 全体合計の自動計算

**学習ポイント**:
- 複雑な状態管理パターン
- 配列・オブジェクト操作
- 条件付きレンダリング（Fragment）
- テーブルレイアウトの実装

**テスト方法**:
```
- ダイスを振って各役をクリック
- [確定] をクリックして得点が記録される
- 上段合計・ボーナス・合計が自動計算される
- 確定した役の背景色が変わる
```

---

### Phase 5: 局面解析モード・モード切り替え

**目標**: 局面解析モードを実装し、モード間で状態を同期させる

**タスク**:
1. 局面解析モード専用コンポーネント
   - DiceItem の局面解析版（クリックで値を 1→2→3→4→5→6→1 と循環）
   - ラジオボタンで投数（0/1/2/3投目）を選択

2. モード切り替え機能
   - ModeTab コンポーネントにクリックハンドラーを実装
   - mode 状態の更新
   - 配色の変更（青系 ⇄ オレンジ系）

3. モード間の状態同期
   - rollCount は両モード間で共有
   - プレイモード ⇒ 局面解析モード：現在の局面を確認
   - 局面解析モード ⇒ プレイモード：設定した局面から再開

4. scoreSheet の手動編集（局面解析モード）
   - 得点欄をクリック可能にする
   - 数値入力できるようにする
   - [確定] ボタンで自動計算

5. AnalysisMode コンポーネント
   - 局面解析モード専用のコンテナ
   - PlayMode と並ぶメインコンテナ

6. モード切り替え時の UI 更新
   - DiceActions のUI 変更（ボタン ⇄ ラジオボタン）
   - スコアシートの操作UI 変更
   - 背景色・アイコンの変更

**学習ポイント**:
- 条件分岐による大規模 UI 制御
- Context の複数値の管理・更新
- モード間の状態同期

**テスト方法**:
```
- プレイモード / 局面解析モード を切り替える
- 両モードで同じ rollCount が共有されている
- 局面解析モードでダイスを編集できる
- 局面解析モードでスコアを入力できる
```

---

### Phase 6: API連携・評価機能

**目標**: バックエンド API と連携し、評価機能を完成させる

**タスク**:
1. API ユーティリティ（`utils/api.ts`）
   - fetch を使用した API 呼び出し
   - リクエストボディの構築
   - エラーハンドリング
   - リトライロジック（オプション）

2. useEvaluation カスタムフック（`hooks/useEvaluation.ts`）
   - API 呼び出しの状態管理（loading, error, data）
   - 評価リクエストの実行関数
   - キャッシング（同じ局面の重複呼び出し防止）

3. EvaluationButton コンポーネント（`components/EvaluationButton.tsx`）
   - `rollCount === 0` で非活性化
   - クリックで API 呼び出し
   - ローディング状態の表示

4. EvaluationPanel コンポーネント（`components/EvaluationPanel.tsx`）
   - 右からスライドイン（CSS Transition 0.3s）
   - 半透明背景オーバーレイ
   - 評価結果一覧表示（期待値の降順）
   - [×] ボタン・パネル外クリックで閉じる

5. 評価結果の表示
   - ダイス保持案：[⚂][⚂]残す - 期待値: 245.3
   - 役確定案：フルハウス(確定) - 期待値: 240.5
   - プレイモードのみ [適用]/[確定] ボタン表示

6. [適用] / [確定] ボタンのアクション
   - [適用]：提案のダイスをロック状態にしてパネル閉じる
   - [確定]：役を確定して次のターンへ

7. エラーハンドリング
   - API エラー時のユーザー通知
   - ネットワークエラー対応
   - タイムアウト対応

**学習ポイント**:
- async/await での非同期処理
- Fetch API と HTTP 通信
- ローディング・エラー状態の管理
- API レスポンスの型安全な処理

**テスト方法**:
```
- ダイスを振って「評価を見る」をクリック
- API が呼び出される（ブラウザの DevTools で確認）
- 評価結果パネルがスライドインする
- パネル外をクリック / [×] で閉じる
- [適用]/[確定] でゲーム状態が更新される
```

---

### Phase 7: スタイリング・レスポンシブ対応

**目標**: UI を完全にスタイリングし、全デバイスで快適に使用できるようにする

**タスク**:
1. グローバルスタイル（`styles/global.css`）
   - CSS リセット
   - フォント設定（16px 以上でズーム防止）
   - 色定義（青系・オレンジ系カラーパレット）

2. CSS 変数の定義（`styles/variables.css`）
   ```css
   :root {
     --color-primary-blue: #3b82f6;
     --color-primary-orange: #f97316;
     --color-bg-light: #f3f4f6;
     --color-border-gray: #d1d5db;
     /* ... */
   }
   ```

3. コンポーネントスタイル（`styles/components.css`）
   - ボタンスタイル（ホバー、アクティブ、無効状態）
   - インプット・フォーム要素
   - テーブルスタイル
   - パネルスタイル

4. ダイス UI のスタイリング
   - ダイス枠線（通常：グレー、ロック：青）
   - ロック状態の🔒 アイコン表示
   - ホバー効果

5. スコアシートのスタイリング
   - テーブルレイアウト（役名 40% / 得点 30% / 操作 30%）
   - 確定・未確定での背景色分け
   - スクロール対応

6. 評価パネルのアニメーション
   - スライドイン/アウト（CSS Transition）
   - オーバーレイフェード
   - スマホ・タブレット・PC での幅調整

7. レスポンシブデザイン
   - スマホ（〜768px）
     - 1カラムレイアウト
     - ボタンサイズ 44x44px 以上
   - タブレット（768px〜1024px）
     - パネル幅 400px
   - PC（1024px〜）
     - パネル幅 450-500px

8. アクセシビリティ対応
   - ARIA 属性の追加（role, aria-label 等）
   - キーボード操作対応（Tab キー navigation）
   - カラーコントラスト確保（WCAG AA 準拠）

9. 細部調整
   - アイコンの表示確認・サイズ調整
   - フォントウェイト・サイズの統一
   - スペーシング・パディングの調整

**学習ポイント**:
- CSS の実践的な使い方
- メディアクエリによるレスポンシブ対応
- CSS Transition/Animation
- ARIA による アクセシビリティ

**テスト方法**:
```
- Chrome DevTools で各ブレークポイント確認
- スマホ・タブレット・PC での表示確認
- キーボード操作（Tab キー）で全機能が操作できる
- スクリーンリーダーで読み込める
- 色覚異常者向けのコントラスト確認
```

---

## 📚 各フェーズ共通の進め方

### 実装時のチェックリスト

各フェーズを実装する際、以下の順序で進めてください：

1. **型定義から始める**
   - 何を扱うのかを型で明確にする
   - TypeScript のサポートを最大限活用

2. **コンポーネント設計を明確にする**
   - props の型を定義
   - コンポーネント間の責任分離

3. **state と hooks を整理する**
   - useState/useContext/useReducer をどう使い分けるか
   - 状態の流れを図にして整理

4. **テスト・確認する**
   - ブラウザで実際に動作確認
   - DevTools で state の変化を監視
   - コンソールでエラーを確認

5. **スタイリング（Phase 7 までは最小限）**
   - 機能が優先
   - Phase 7 で集中的にスタイリング

### 開発中の便利なコマンド

```bash
# 開発サーバー起動
bun run dev

# ビルド（本番環境用）
bun run build

# ビルド後のプレビュー
bun run preview

# TypeScript の型チェック
bun run type-check  # package.json に追加必要

# Lint / Format （オプション）
bun add -D eslint prettier
```

### デバッグテクニック

```typescript
// console.log でstate を確認
const gameState = useGame();
console.log('Current state:', gameState);

// React DevTools で component tree を確認
// Chrome Web Store から "React Developer Tools" をインストール

// ブラウザの DevTools
// - Network タブ：API 呼び出し確認
// - Console タブ：エラー・警告確認
// - Elements/Inspector：DOM 構造確認
```

---

## ⚠️ 初心者向け注意点

### よくある間違い

1. **State の直接変更**
   ```typescript
   // ❌ 間違い
   gameState.dice[0] = 5;
   
   // ✅ 正解
   setGameState({ ...gameState, dice: [5, ...gameState.dice.slice(1)] });
   ```

2. **無限ループの useEffect**
   ```typescript
   // ❌ 間違い：依存配列なしで毎回実行
   useEffect(() => {
     fetchData();
   });
   
   // ✅ 正解：初回のみ実行
   useEffect(() => {
     fetchData();
   }, []);
   ```

3. **型定義なしの props**
   ```typescript
   // ❌ 間違い：any や型定義なし
   const DiceItem = (props) => { ... };
   
   // ✅ 正解：interface で型定義
   interface DiceItemProps {
     value: number;
     locked: boolean;
     onClick: () => void;
   }
   const DiceItem: React.FC<DiceItemProps> = ({ value, locked, onClick }) => { ... };
   ```

### 学習リソース

- [React 公式ドキュメント（日本語）](https://ja.react.dev/)
- [TypeScript ハンドブック](https://www.typescriptlang.org/docs/)
- [Vite ドキュメント](https://ja.vitejs.dev/)
- [MDN Web Docs - CSS](https://developer.mozilla.org/ja/docs/Web/CSS)

---

## 🔄 進捗管理

### チェックリスト形式で進める

```markdown
## Phase 1 進捗

- [ ] プロジェクト構造の整備
- [ ] 型定義（types/game.ts）
- [ ] Layout コンポーネント
- [ ] ModeTab コンポーネント
- [ ] グローバルスタイル基盤
- [ ] 動作確認・ブラウザテスト

## Phase 2 進捗

- [ ] 完全な型定義（types/）
- [ ] GameContext の作成
- [ ] useGame フック
- [ ] 状態初期化・テスト

...
```

---

## 📞 困ったときは

### デバッグのフロー

1. **エラーメッセージを読む**
   - コンソール / ブラウザの警告をチェック

2. **TypeScript の型エラーを確認**
   - IDE の赤波線をチェック
   - 型チェック：`bun run type-check`

3. **state の値を確認**
   - `console.log()` で変数の値を追跡
   - React DevTools で state を確認

4. **Vite の再起動**
   ```bash
   # 開発サーバーを Ctrl+C で停止
   # 再度起動
   bun run dev
   ```

5. **node_modules をリセット**
   ```bash
   rm -rf node_modules
   bun install
   ```

---

## ✅ 最後に

このアプリケーション実装を通じて、以下のスキルが身につきます：

- ✅ React による UI コンポーネント設計
- ✅ TypeScript による型安全なコード
- ✅ Context API による状態管理
- ✅ Async/Await による API 連携
- ✅ レスポンシブ CSS デザイン
- ✅ 初心者向けプロジェクトの実装フロー

各フェーズを確実に完了することで、次のステップアップへの基礎ができます！

---

**最終更新**: 2025-12-25
**計画作成者**: Claude
**対象レベル**: フロントエンド初心者
