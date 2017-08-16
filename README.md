# みらい研究室実行委員会

みらい研究室実行委員会のWebページのrepogitory。

https://miraiken.github.io/web/index.html

## 開発

### 開発環境の構築

まず依存しているソフトウェアをインストールします。``npm``がない場合は、``nvm``や``nodist``などで``node.js``を導入してください。
また、Gitがインストールされ、`PATH`から探索可能でなければなりません。
それ以外の依存はNPMにより自動的に解決できます。

```bash
$ npm install
```

### 開発版の実行

```bash
$ npm start
```

とすると

```

> miraiken.github.io@0.0.0 start /home/aki/web
> webpack-dev-server

Project is running at http://localhost:8081/
(以下に長い出力がある)
```

のように実行されます(URLは可変)。

サーバーの終了は``Ctrl+C``です。

### Lint

コードの静的チェックが導入されています。

CSSはwebpackによるビルド時に自動的にチェックされます。警告やエラーが出ていないか確認してください。
全く出ていない場合には問題ありません。

JavaScriptとpugのチェックはNPM scriptsで行います。以下で述べるscriptsが利用可能です。

`eslint-node`はNode.jsで実行されるJavaScriptのチェックを行います。

`eslint-web`はブラウザで実行されるJavaScriptのチェックを行います。

`eslint`は全てのJavaScriptのチェックを行います。

`lint`は、JavaScriptに加えてpugのチェックを行います。
