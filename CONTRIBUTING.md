# 文字コード

特別な事情がない限り、`UTF-8 with BOM`とする。ただしShell ScriptはShebangがバグる糞仕様なので仕方なく`UTF-8`とする。

# Commit 規約

- 明確な基準は決めないがcommitを大きくしない。
- gpg署名は任意

# Commit message規則

> `Commit Type`(`Scope`<sup>opt</sup>): `Commit Titile`
>
> `Commit Body`

例

```
feat: add CONTRIBUTING.md

ref:
- #50
```

```
fix(1706event): remove comment from json

JSON doesn't allow comment.
```

## Commit Type

- feat
  - 新しい機能、章、節の追加など
  - 更新履歴に載るような新しいページを追加
- fix
  - 意味が変わる修正
  - 更新履歴に載るような修正
- hotfix
  - 緊急修正
  - あとでrevertされても文句は言わない
- refactor
  - 意味が変わらない修正
  - 更新履歴に載らないような修正
- perf
  - パフォーマンス改善
- test
  - テストに関して
- chore
  - その他
  - 迷ったらこれ

## Scope

- for_freshman
  - 新歓ページ
- yymmevent
  - イベントページ。`yy=西暦下二桁, mm=月`
- redirect
  - 未サポートブラウザに表示するページへのリダイレクト関連

## Commit Title

長くなければよし。

## Commit Body

- `Commit Title`がある行とは一行開けるほうが望ましいがどうでもいい
- 他人から変更を理解するために必要と思われる参考文献にはリンクをはる。
- 関連するGithub Issueには`#1`のようにリンクを貼る
- 日本語でもおｋ

# Pull Requestタイトル規約

> `Commit Type`(`Scope`<sup>opt</sup>): `Commit Titile`

Commit規約に準ずる

# Pull Requestの送り方

文章のtypoの修正程度なら、直接GitHub上で編集してPull Requestを送ってください。

# Issueの建て方

- かぶってないかざっと見てください
- 思いの丈をぶちまけてください
