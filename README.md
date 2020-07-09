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

事前にConfig.jsonとroutine.shのdetectorNumberとDETECTORNUMBERを割り当てておく必要があります。
また、以下のことをしてください。
```crontab
$ crontab -e

.
.
#....
#....

0 0 0 * * /home/pi/Detector/routine.sh
```

詳しい技術解説は[Node.jsでiBeaconの距離推定する](https://qiita.com/MakTak/items/d9cde6ddc4422d6343f6)を参照してください。

