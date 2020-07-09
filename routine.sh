#!/bin/sh

DATE=`date -d yesterday '+%Y_%-m_%-d'`
DETECTORNUMBER=1
curl -X POST http://192.168.11.3:3000/api/detectionData/log -F file=@./Detector/log/No${DETECTORNUMBER}_${DATE}.log && 
curl -X PUT http://192.168.11.3:3000/api/tracking/log