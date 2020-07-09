/*----
NAME  : main.js
UPDATE: 2017/12/11
AUTHOR: MakTak
ABOUT : 言わずと知れたメイン関数
-----*/

"use strict";
//import from node_modules
const Bleacon = require("bleacon");
const fs = require("fs");
const Request = require("request");
const PiWifi = require("pi-wifi");

const FormData = require('form-data')

//import from original classes
const BeaconRepository = require("./BeaconRepository");

//input config
const config = JSON.parse(
  fs.readFileSync("/home/pi/Detector/Config.json", "utf-8")
);
const detectorNumber = config.detectorNumber;
const serverURL = config.serverURL;
const pollingURL = config.pollingURL;
const uploadURL = config.uploadURL;

// Polling
setInterval(() => {
  console.log("Polling.");
  PiWifi.status("wlan0", function(err, status) {
    if (err) {
      return console.error(err.message);
    }
    const putData = {
      uri: pollingURL,
      headers: { "Content-type": "application/json" },
      json: {
        detectorNumber: detectorNumber,
        IPAddress: status.ip,
        SSID: status.ssid
      }
    };
    Request.put(putData, (error, response) => {
      if (!error) console.log(response.body);
    });
  });
}, 60000);

//Start Beacon Scanning
let beaconData = [];
Bleacon.startScanning();
Bleacon.on("discover", function(bleacon) {
  const beacon = BeaconRepository.makeData(bleacon, detectorNumber);
  const oneBeaconData = beacon.decode();
  beaconData.push(oneBeaconData);
});

setInterval(() => {
  if (beaconData.length != 0) {
    const postData = {
      uri: serverURL,
      headers: { "Content-type": "application/json" },
      json: beaconData
    };
    Request.post(postData, (error, response) => {
      if (!error) console.log(response.body);
    });

    BeaconRepository.logWriter("/home/pi/Detector/log", beaconData)
      .then(result => {
        console.log("success!");
      })
      .catch(error => {
        console.log(error);
      });

    beaconData = [];
  }
}, 5000);