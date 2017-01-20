# みらい研究室実行委員会

みらい研究室実行委員会のWebページのrepogitory。

https://miraiken.github.io/web/index.html

## Developping

特にビルドとかは必要ないのですが、``file:///``から始まるようなローカルにファイルがあると、Ajaxがぶっ壊れるので(型が変わる)、ローカルにサーバーを立ててデバッグすることを推奨します。

### Use koko for start local web server

ローカルサーバー構築には、kokoが手軽で便利です。

[開発用・簡易Webサーバー/プロクシサーバーkokoをつくった - Qiita](http://qiita.com/fnobi/items/cf8ffae04e6c530958c7)
[fnobi/koko: instant file server (proxy server).](https://github.com/fnobi/koko)

まずインストールします。``npm``がない場合は、``nvm``や``nodist``などで``node.js``を導入してください。

```bash
$ npm install -g koko
```

あとは

```bash
$ koko -o
```

とすると

```
document root	: /home/yumetodo/miraiken-web
php	: off
md	: off
[listen 53389]
[open http://192.168.2.100:53389/]
```

のように実行されます(URLは可変)。

サーバーの終了は``Ctrl+C``です。
