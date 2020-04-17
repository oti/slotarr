# Slotarr v2

https://slotarr.dskd.jp/

半角スペース区切りの単語をスロットするだけのウェブアプリ。

お店が決められない時に便利です。

[![Netlify Status](https://api.netlify.com/api/v1/badges/a9b47b26-362d-47ca-a0bf-4230ea039ad9/deploy-status)](https://app.netlify.com/sites/slotarr/deploys)

## 名前の由来

文字列を配列にしてスロットするので、slot array で「Slotarr」です。スロッターと読みます。

## 開発

Parcel を使ってバンドルしています。

`git clone`したらプロジェクトルートに移動。

```
npm ci
npm start
```

`localhost:1234`がブラウザで開きます。

## ビルド

```
npm run build
```

`dist/`にファイルが出力されます。

## ライセンス

MIT.
