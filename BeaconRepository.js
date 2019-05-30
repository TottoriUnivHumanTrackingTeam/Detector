/*----
NAME  : BeaconRepository.js
UPDATE: 2017/12/12
AUTHOR: MakTak
ABOUT : ビーコンレポジトリ
-----*/
'use strict';

const Fs = require('fs');

const Beacon = class Beacon {
  constructor(detectorNumber, uuid, measuredPower, rssi, detectedTime) {
    this.detectorNumber = detectorNumber;
    this.beaconID = uuid;
    this.measuredPower = measuredPower;
    this.rssi = rssi;
    this.detectedTime = detectedTime;
  }
}

module.exports = class BeaconRepository {
  static makeNewData(bleacon, detectorNumber) {
    const d = new Date();
    const time = d.getTime();
    const beacon = new Beacon(detectorNumber, bleacon.uuid, bleacon.measuredPower, bleacon.rssi, time);
    return beacon;
  }

  static logWriter(filepath, beacon) {
    const d = new Date(beacon.detectedTime);
    const time = String.raw`${d.getFullYear()}/${this.toDoubleDigits(d.getMonth()+1)}/${this.toDoubleDigits(d.getDate())} ${this.toDoubleDigits(d.getHours())}:${this.toDoubleDigits(d.getMinutes())}:${this.toDoubleDigits(d.getSeconds())}.${this.toTripleDigits(d.getMilliseconds())}`;
    const log = String.raw`${beacon.detectorNumber},${beacon.beaconID},${beacon.measuredPower},${beacon.rssi},${time}`;
    try {
      Fs.appendFileSync(filepath+"/"+this.makeFileName(), log+"\n");
      return log;
    } catch(err) {
      return false;
    }
  }

  static toDoubleDigits(num) {
      num += "";
      if (num.length === 1) num = "0" + num;
      return num;
  };

  static toTripleDigits(num) {
      num += "";
      if (num.length === 1 ) num = "00" + num;
      else if (num.length === 2 ) num = "0" + num;
      return num;
  };


  static makeFileName() {
    const d = new Date();
    const fileName = String.raw`${d.getFullYear()}_${d.getMonth()+1}_${d.getDate()}.log`;
    return fileName;
  }
};
