# Detector

Detectorは鳥取大学工学部で研究開発されている障がい者支援施設向け見守りシステムの受信機用のBeacon検知アプリケーションです。

**このアプリケーションはRaspberryPiにて運用されることを想定しています。**

## Running

このアプリケーションはNode.JSで作成されています。なので、実行する場合は以下のコマンドを入力してください。  

RaspberryPiの低レイヤーにアクセスするライブラリ(bleacon)を使用している関係上、実行はRootユーザーで行う必要があります。

```npm
npm install
sudo node main.js
```

詳しい技術解説は以下のドキュメントを参照してください。
[Node.jsでiBeaconの距離推定する](https://qiita.com/MakTak/items/d9cde6ddc4422d6343f6)
