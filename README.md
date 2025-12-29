# ヨット局面評価 for アソビ大全

ヨット（Yahtzee風ダイスゲーム）の局面を評価し、最適な手を推薦するWebアプリケーションです。

## 概要

このアプリケーションは、ヨットダイスゲームのプレイと局面分析の両方をサポートします：

- **プレイモード**: 実際にゲームをプレイしながら、AI評価による最適手の推薦を受けられます
- **解析モード**: 任意の局面を入力して、その状況での最適な戦略を分析できます

## 技術スタック

- **フレームワーク**: Astro 5.16
- **UI**: React 19 + TypeScript
- **パッケージマネージャー**: Bun
- **状態管理**: React Context API + useReducer
- **スタイリング**: Plain CSS (CSS Variables)
- **リンター**: ESLint 9 (Flat Config)
- **フォーマッター**: Prettier

## 必要要件

- [Bun](https://bun.sh/) (推奨: 最新版)
- Node.js 18以上（Bunがない場合）

## セットアップ

### インストール

```bash
bun install
```

### 開発サーバーの起動

```bash
bun run dev
```

開発サーバーは `http://localhost:4321` で起動します。

### 本番ビルド

```bash
bun run build
```

ビルド前にTypeScriptの型チェックが実行されます。

### ビルドのプレビュー

```bash
bun run preview
```

### コード品質チェック

```bash
# リント
bun run lint

# フォーマット
bun run format
```

## プロジェクト構造

```
src/
├── pages/
│   ├── index.astro          # トップページ
│   └── app.astro            # アプリケーションページ
├── app/
│   ├── components/          # Reactコンポーネント
│   │   ├── Layout.tsx       # メインレイアウト
│   │   ├── ModeTab.tsx      # モード切り替えタブ
│   │   ├── DiceDisplay.tsx  # ダイス表示
│   │   ├── DiceItem.tsx     # 個別ダイス
│   │   ├── DiceActions.tsx  # ダイスアクション（ロールボタン等）
│   │   ├── ScoreSheet.tsx   # スコアシート
│   │   ├── ScoreRow.tsx     # スコア行
│   │   ├── ScoreCell.tsx    # スコアセル（入力バリデーション付き）
│   │   ├── EvaluationButton.tsx # 評価ボタン
│   │   └── EvaluationPanel.tsx  # 評価結果パネル
│   ├── context/
│   │   ├── GameContext.tsx  # ゲーム状態コンテキスト
│   │   └── gameReducer.ts   # ゲームロジック
│   ├── hooks/
│   │   └── useEvaluation.ts # 評価API呼び出しフック
│   ├── types/
│   │   ├── game.ts          # ゲーム型定義
│   │   ├── api.ts           # API型定義
│   │   └── ui.ts            # UI型定義
│   ├── utils/
│   │   ├── api.ts           # APIクライアント
│   │   ├── calculateScore.ts # スコア計算ロジック
│   │   └── validateScore.ts  # スコアバリデーション
│   ├── constants/
│   │   ├── categories.ts    # カテゴリ定義
│   │   └── dice.ts          # ダイス記号定義
│   ├── styles/
│   │   └── global.css       # グローバルスタイル
│   ├── App.tsx              # Reactアプリルート
│   └── main.tsx             # エントリーポイント
└── public/
    └── screenshot.svg       # スクリーンショット画像
```

## 主な機能

### プレイモード（🎲）

- ダイスのロール（最大3回まで）
- ダイスのロック/アンロック
- スコアの確定
- AI評価による最適手の推薦

### 解析モード（📊）

- 任意のダイス目の入力
- ロール回数の設定（0-3回）
- スコアシートの手動入力（バリデーション付き）
- 局面評価の表示

### スコアバリデーション

解析モードでは、入力されたスコアが有効かどうかをリアルタイムで検証します：

- **数字カテゴリ（エース～シックス）**: 指定された数字の倍数のみ有効
- **チョイス**: 5～30の整数
- **フォーダイス**: 0または5～30の整数
- **フルハウス**: 0～30の整数（一部無効値あり）
- **S.ストレート**: 0または15のみ
- **B.ストレート**: 0または30のみ
- **ヨット**: 0または50のみ

無効なスコアが入力されている場合、評価ボタンを押すとアラートで警告されます。

### IME対応

全角数字の入力も自動的に半角に変換されるため、日本語IMEでの入力もスムーズです。

## バックエンドAPI

このアプリケーションは評価APIと連携します：

- **エンドポイント**: `POST /api/v1/evaluate`
- **リクエスト**: 現在のスコアシート、ダイス目、ロール回数
- **レスポンス**: 推薦手のリスト（期待値順）

バックエンドのソースコードとAPI仕様は以下のリポジトリを参照してください：  
https://github.com/mat-der-D/yacht-evaluator-api

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 関連リンク

- [技術書典での同人誌](https://techbookfest.org/product/xhALzmxNpHT3EWX9qJqRsf): 評価ロジックの理論的背景
