/*----
NAME  : main.js
UPDATE: 2017/12/11
AUTHOR: MakTak
ABOUT : 言わずと知れたメイン関数
-----*/

'use strict';
//import from node_modules
const Bleacon = require('bleacon');
const Fs = require('fs');
const Request = require('request');

//import from original classes
const BeaconRepository = require('./BeaconRepository');

//input config
const config = JSON.parse(Fs.readFileSync('/home/pi/Detector/Config.json', 'utf-8'));
const detectorNumber = config.detectorNumber;
const serverURL = config.serverURL;

// Polling
setInterval(() => {
  const putData = {
      uri: pollingURL,
      headers: { "Content-type": "application/json" },
      json: { 'detectorNumber': detectorNumber, }
    };
  Request.put(putData, (error, response) => { if(!error) console.log(response.body) });
}, 60000);

//Start Beacon Scanning
Bleacon.startScanning();
Bleacon.on("discover", function(bleacon) {
  const beacon = BeaconRepository.makeNewData(bleacon, detectorNumber);
  const postData = {
                    uri: serverURL,
                    headers: { "Content-type": "application/json" },
                    json: {
                          'detectorNumber': beacon.detectorNumber,
                          'beaconID': beacon.beaconID,
                          'measuredPower': beacon.measuredPower,
                          'rssi': beacon.rssi,
                          'detectedTime': beacon.detectedTime
                        }
                    };
  Request.post(postData, (error, response) => {
    if(!error) console.log(response.body)
  });
  console.log(BeaconRepository.logWriter("/home/pi/detector/log", beacon));
});
