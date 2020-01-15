/*----
NAME  : BeaconRepository.js
UPDATE: 2017/12/12
AUTHOR: MakTak
ABOUT : ビーコンレポジトリ
-----*/
"use strict";
const fs = require("fs");

const Beacon = class Beacon {
  constructor(detectorNumber, uuid, measuredPower, rssi) {
    const d = new Date();
    this.detectorNumber = detectorNumber;
    this.beaconID = uuid;
    this.measuredPower = measuredPower;
    this.rssi = rssi;
    this.detectedTime = d.getTime();
  }

  decode() {
    const json = {
      detectorNumber: this.detectorNumber,
      beaconID: this.beaconID,
      measuredPower: this.measuredPower,
      rssi: this.rssi,
      detectedTime: this.detectedTime
    };

    return json;
  }
};

const appendFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(file, data, "utf-8", error => {
      if (error) reject(error);
      resolve(data);
    });
  });
};

module.exports = class BeaconRepository {
  static makeData(bleacon, detectorNumber) {
    const beacon = new Beacon(
      detectorNumber,
      bleacon.uuid,
      bleacon.measuredPower,
      bleacon.rssi
    );
    return beacon;
  }

  static async logWriter(filepath, dataList) {
    for (let data of dataList) {
      const log = String.raw`${data.detectorNumber},${data.beaconID},${data.measuredPower},${data.rssi},${data.detectedTime}`;
      await appendFilePromise(filepath + "/" + this.makeFileName(), log + "\n");
      console.log(log);
    }
  }

  static makeFileName() {
    const d = new Date();
    const fileName = String.raw`${d.getFullYear()}_${d.getMonth() +
      1}_${d.getDate()}.log`;
    return fileName;
  }
};
