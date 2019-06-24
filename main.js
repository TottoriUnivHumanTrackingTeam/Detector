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
const PiWifi = require('pi-wifi');

//import from original classes
const BeaconRepository = require('./BeaconRepository');

//input config
const config = JSON.parse(Fs.readFileSync('/home/pi/Detector/Config.json', 'utf-8'));
const detectorNumber = config.detectorNumber;
const serverURL = config.serverURL;
const pollingURL = config.pollingURL;

// Polling
setInterval(() => {
  console.log("Polling.");
  piWifi.status('wlan0', function(err, status) {
    if (err) {
      return console.error(err.message);
    }
    const putData = {
      uri: pollingURL,
      headers: { "Content-type": "application/json" },
      json: {
        "detectorNumber": detectorNumber,
        "IPAddress": status.ip,
        "SSID": status.ssid
      }
    };
  Request.put(putData, (error, response) => { if(!error) console.log(response.body) });
  });

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
  console.log(BeaconRepository.logWriter("/home/pi/Detector/log", beacon));
});
