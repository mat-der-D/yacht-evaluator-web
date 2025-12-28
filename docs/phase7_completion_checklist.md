# Phase 7: 完成までのチェックリスト

**現在の状況**: Phase 1-6 が完成しました。Phase 7 では UI のスタイリングと最終調整を行い、アプリケーションを完成させます。

**推定工数**: 約 5-8 時間

---

## 📋 完成までの実装タスク

### セクション A: 基盤スタイリング（既に実装済み）

- [x] グローバルスタイル（`styles/global.css`）
  - CSS リセット
  - ボタン・テーブル・スコアシートの基本スタイル
  - EvaluationPanel のオーバーレイ・スライドインアニメーション

- [x] ダイス UI スタイリング
  - `.dice-item--unlocked`（グレー枠）
  - `.dice-item--locked`（青枠 + 🔒 アイコン）
  - ホバー・トランジション効果

- [x] スコアシートのスタイリング
  - テーブルレイアウト
  - 確定・未確定の背景色分け
  - ボタンスタイル

- [x] EvaluationPanel のスタイリング
  - オーバーレイ（半透明背景）
  - パネル（右側スライドイン）
  - エラー表示（赤背景）

---

### セクション B: 細部スタイリング調整

**現在のステータス**: 実装検討中

#### B-1: ModeTab / GameHeader のスタイリング

**対象**: `ModeTab.tsx`, `GameHeader.tsx`

**タスク**:

- [ ] ModeTab のスタイルを完成させる
  - プレイモード時：青系（#3b82f6）
  - 局面解析モード時：オレンジ系（#f97316）
  - ボタン状態の視覚的区別（active / inactive）

- [ ] GameHeader（アイコン表示部分）
  - 🎮 アイコン（プレイモード）
  - 🔍 アイコン（局面解析モード）
  - サイズ・色の一貫性

**CSS 追加例**:

```css
.mode-tab {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.mode-tab button {
  padding: 10px 20px;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.mode-tab button.active {
  border-bottom: 3px solid;
}

.mode-tab--play button.active {
  color: #3b82f6;
  border-color: #3b82f6;
}

.mode-tab--analysis button.active {
  color: #f97316;
  border-color: #f97316;
}
```

---

#### B-2: DiceActions のラジオボタンスタイリング

**対象**: `DiceActions.tsx`

**タスク**:

- [ ] ラジオボタンのカスタムスタイル
  - デフォルトの OS ラジオボタンは非表示
  - カスタム ラジオボタン UI を作成
  - チェック状態の視覚化（色変更）

**CSS 例**:

```css
.dice-actions input[type='radio'] {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  cursor: pointer;
  background-color: white;
  transition: all 0.2s ease;
}

.dice-actions input[type='radio']:checked {
  border-color: #3b82f6;
  background-color: #dbeafe;
  box-shadow: inset 0 0 0 4px #3b82f6;
}

.dice-actions input[type='radio']:hover {
  border-color: #3b82f6;
}
```

---

#### B-3: EvaluationButton のスタイリング

**対象**: `EvaluationButton.tsx`

**タスク**:

- [ ] ボタンの完全なスタイリング
  - 通常状態：青系（プレイモード時）
  - ホバー状態：濃い青
  - 無効状態：グレー + カーソル not-allowed
  - ローディング状態：半透明 + スピナー（オプション）

**CSS 例**:

```css
/* EvaluationButton */
.evaluation-button {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.evaluation-button:hover:not(:disabled) {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.evaluation-button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
  opacity: 0.6;
}

.evaluation-button:active:not(:disabled) {
  transform: translateY(0);
}
```

---

#### B-4: ScoreSheet のスタイリング微調整

**対象**: `ScoreSheet.tsx`, `ScoreRow.tsx`

**タスク**:

- [ ] テーブルのホバー効果
  - 行をホバーした時の背景色変更
  - 確定・未確定で色を分ける

- [ ] ボタンのサイズ・配置
  - スマホでの見やすさ確保
  - ボタン最小サイズ 44x44px

**CSS 例**:

```css
.score-sheet tr:hover {
  background-color: rgba(59, 130, 246, 0.05);
}

.score-sheet tr.score-confirmed:hover {
  background-color: rgba(243, 244, 246, 0.5);
}

.score-sheet button {
  min-width: 44px;
  min-height: 44px;
}
```

---

#### B-5: EvaluationPanel の微調整

**対象**: `EvaluationPanel.tsx`

**タスク**:

- [ ] ChoiceItem のスタイル改善
  - 説明テキストと値の見やすさ
  - ボタンの配置（右寄せ）
  - ホバー効果（背景色変更）

- [ ] エラー表示の改善
  - 赤背景でエラーを目立たせる
  - フォントサイズ・余白の調整

**CSS 例**:

```css
.evaluation-choice {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.evaluation-choice:hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.choice-action {
  align-self: flex-end;
  padding: 8px 16px;
  font-weight: 600;
}

.choice-action:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}
```

---

### セクション C: レスポンシブ対応

**現在のステータス**: 基盤は完成、微調整が必要

#### C-1: メディアクエリの追加

**タスク**:

- [ ] スマートフォン（〜 767px）対応
  - パネル幅を 100% またはコンテナに合わせる
  - パディング・マージンの縮小
  - フォントサイズの微調整

- [ ] タブレット（768px 〜 1023px）対応
  - パネル幅 400px
  - レイアウト調整

- [ ] デスクトップ（1024px 以上）対応
  - パネル幅 450-500px
  - 通常レイアウト

**CSS 例**:

```css
/* モバイル優先 */
.evaluation-panel {
  width: 100%;
}

/* タブレット以上 */
@media (min-width: 768px) {
  .evaluation-panel {
    width: 400px;
  }
}

/* デスクトップ */
@media (min-width: 1024px) {
  .evaluation-panel {
    width: 500px;
  }
}

/* layout のパディング調整 */
@media (max-width: 480px) {
  .layout {
    padding: 10px;
    gap: 10px;
  }
}
```

---

#### C-2: ダイス表示のレスポンシブ対応

**タスク**:

- [ ] スマホで大きく表示
  - ダイスのサイズをスマホで 60px、タブレットで 80px、PC で 100px に変更

**CSS 例**:

```css
.dice-item {
  font-size: 36px;
  width: 50px;
  height: 50px;
}

@media (min-width: 768px) {
  .dice-item {
    font-size: 48px;
    width: 60px;
    height: 60px;
  }
}

@media (min-width: 1024px) {
  .dice-item {
    font-size: 56px;
    width: 80px;
    height: 80px;
  }
}
```

---

#### C-3: タッチターゲットサイズ

**タスク**:

- [ ] すべてのボタンが最小 44x44px 以上
  - スマートフォンでのタップ操作の容易性確保

**確認方法**:

```typescript
// 全ボタンのサイズを確認
button {
  min-width: 44px;
  min-height: 44px;
  padding: 8px 16px; // これで 44px に
}
```

---

### セクション D: CSS 変数化と整理

**現在のステータス**: 色は定義済み、さらなる整理が可能

#### D-1: CSS 変数の拡充

**対象**: グローバル CSS

**タスク**:

- [ ] 既存の色変数を確認
- [ ] サイズ変数の定義
  - `--spacing-xs: 4px;`
  - `--spacing-sm: 8px;`
  - `--spacing-md: 12px;`
  - `--spacing-lg: 16px;`
  - `--spacing-xl: 20px;`

- [ ] ブレークポイント変数（オプション）
  ```css
  --breakpoint-sm: 480px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  ```

**CSS 例**:

```css
:root {
  /* 既存の色 */
  --color-primary-blue: #3b82f6;
  --color-primary-orange: #f97316;
  --color-bg-light: #f3f4f6;
  --color-border-gray: #d1d5db;

  /* 新しい変数 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;

  /* サイズ */
  --size-touch-target: 44px;
  --border-radius-sm: 4px;
  --border-radius-md: 6px;
  --border-radius-lg: 8px;
}

/* 使用例 */
button {
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  min-width: var(--size-touch-target);
  min-height: var(--size-touch-target);
}
```

---

### セクション E: アクセシビリティ対応

**現在のステータス**: 基本的な実装、より詳細な対応が可能

#### E-1: ARIA 属性の追加

**タスク**:

- [ ] ボタンに aria-label を追加

  ```typescript
  <button aria-label="サイコロを振る">🎲 Roll</button>
  <button aria-label="パネルを閉じる">[×]</button>
  ```

- [ ] ラジオボタンに aria-label を追加

  ```typescript
  <input
    type="radio"
    name="rollCount"
    value="0"
    aria-label="初投目"
  />
  ```

- [ ] スコアシートに scope 属性を追加
  ```typescript
  <th scope="col">役名</th>
  <th scope="col">得点</th>
  ```

---

#### E-2: キーボードナビゲーション

**タスク**:

- [ ] Tab キー で全ボタンが移動できることを確認
- [ ] Enter / Space キーでボタンが動作することを確認
- [ ] フォーカスリング（青い枠）が見えることを確認

**CSS 例**:

```css
button:focus,
input:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* フォーカスリングの色を見やすく */
*:focus-visible {
  outline: 3px solid #3b82f6;
  outline-offset: 2px;
}
```

---

#### E-3: カラーコントラスト確認

**タスク**:

- [ ] WCAG AA 準拠（コントラスト比 4.5:1 以上）
  - テキストと背景色の組み合わせを確認
  - ボタンテキスト（白）と背景色（青）の確認

**確認方法**:

```
ブラウザの DevTools で "Lighthouse" を実行
Accessibility スコアを確認（90以上が目標）
```

---

### セクション F: 動作確認・テスト

#### F-1: ブラウザテスト

**タスク**:

- [ ] Chrome で全機能が動作することを確認
- [ ] Firefox で全機能が動作することを確認
- [ ] Safari で全機能が動作することを確認（オプション）

**確認項目**:

```
- ダイスの表示・操作
- スコアシートの表示・確定
- モード切り替え
- 評価パネルのスライドイン・スライドアウト
- エラーメッセージの表示
- ボタン押下でのローディング状態
```

---

#### F-2: デバイス別テスト

**対象デバイス**:

- [ ] スマートフォン（例：iPhone 12, Pixel 6）
- [ ] タブレット（例：iPad Air）
- [ ] デスクトップ（1280px 以上）

**確認方法**:

```bash
# Chrome DevTools でデバイスシミュレーション
1. DevTools を開く（F12）
2. Device Toolbar をクリック（Ctrl+Shift+M）
3. デバイスを選択して確認
```

---

#### F-3: パフォーマンステスト

**タスク**:

- [ ] Lighthouse で Performance スコアを確認（90以上が目標）
- [ ] バンドルサイズを確認
  ```bash
  bun run build
  # dist/ フォルダのサイズを確認
  ```

---

### セクション G: 最終確認・本番化

#### G-1: コード品質確認

**タスク**:

- [ ] TypeScript の型チェック

  ```bash
  bun run build  # tsc -b が実行される
  ```

- [ ] Lint エラーの確認（オプション）

  ```bash
  bun run lint
  ```

- [ ] 不要な console.log の削除
- [ ] TODO コメントの確認・対応

---

#### G-2: 本番ビルド

**タスク**:

- [ ] 本番ビルドを実行

  ```bash
  bun run build
  ```

- [ ] dist/ フォルダが生成されたことを確認
- [ ] dist/index.html を開いて動作確認

---

#### G-3: デプロイ準備

**タスク**:

- [ ] `.env` ファイルが `.gitignore` に含まれていることを確認
- [ ] API URL が本番環境に合わせて設定されていることを確認
- [ ] ビルド手順を記録（デプロイ用）

---

## 🎯 優先度別タスク

### 高優先度（必須）

1. **B-1: ModeTab のスタイリング**
2. **B-5: EvaluationPanel の微調整**
3. **C-1: メディアクエリ追加**
4. **F-1: ブラウザテスト**
5. **G-1: コード品質確認**

### 中優先度（推奨）

6. **B-2: ラジオボタンのスタイリング**
7. **B-3: EvaluationButton のスタイリング**
8. **D-1: CSS 変数の拡充**
9. **E-1: ARIA 属性の追加**
10. **F-2: デバイス別テスト**

### 低優先度（あると良い）

11. **B-4: ScoreSheet のホバー効果**
12. **C-2: ダイス表示のレスポンシブ対応**
13. **E-2: キーボードナビゲーション**
14. **E-3: カラーコントラスト確認**
15. **F-3: パフォーマンステスト**

---

## 📊 完成度チェックリスト

```
機能完成度
- [x] ゲームロジック（Phase 1-6）
- [ ] UI スタイリング（Phase 7-A, B）
- [ ] レスポンシブ対応（Phase 7-C）
- [ ] CSS 整理（Phase 7-D）
- [ ] アクセシビリティ（Phase 7-E）
- [ ] テスト・確認（Phase 7-F）
- [ ] 本番化準備（Phase 7-G）

完成目標: 全項目を ✓
```

---

## 🎉 完成後のステップ

このプロジェクトが完了した後の次のステップ：

1. **スコープの拡張**
   - マルチプレイヤーモード追加
   - ゲーム履歴保存（LocalStorage）
   - ユーザー認証（ログイン機能）

2. **より深い学習**
   - Redux / Zustand などの状態管理ライブラリ
   - Next.js によるサーバーサイドレンダリング
   - E2E テスト（Cypress, Playwright）

3. **プロダクション化**
   - CI/CD パイプライン構築（GitHub Actions）
   - 本番デプロイ（Vercel, Netlify など）
   - API エラーログシステム

---

**作成日**: 2025-12-28
**対象**: React 初心者向け
**予想完成日**: 2025-12-31 ～ 2026-01-10
