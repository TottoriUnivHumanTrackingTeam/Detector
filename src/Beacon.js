/*----
NAME  : Beacon.js
UPDATE: 2017/12/5
AUTHOR: MakTak
ABOUT : ビーコンオブジェクト
-----*/
'use strict';

module.exports = class Beacon {
  constructor(detectorNumber, uuid, measuredPower, rssi, detectedTime) {
    this.detectorNumber = detectorNumber;
    this.beaconID = uuid;
    this.measuredPower = measuredPower;
    this.rssi = rssi;
    this.detectedTime = detectedTime;
  }
}
