/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var scanInfo = document.getElementById("info");

function onDone(err, status){
  if (err) {
   // here we can handle errors and clean up any loose ends.
      console.error(err);
  }
  if (status.authorized) {
    // W00t, you have camera access and the scanner is initialized.
    // QRscanner.show() should feel very fast.
      console.log("status.authorized");
  } else if (status.denied) {
   // The video preview will remain black, and scanning is disabled. We can
   // try to ask the user to change their mind, but we'll have to send them
   // to their device settings with `QRScanner.openSettings()`.
     console.log("status.denied");
  } else {
    // we didn't get permission, but we didn't get permanently denied. (On
    // Android, a denial isn't permanent unless the user checks the "Don't
    // ask again" box.) We can ask again at the next relevant opportunity.
      console.log("other error");
  }
}

function startPrepare() {
    QRScanner.prepare(onDone);
}

//拍照
function startScan() {

    var callback = function(err, contents){
        if(err){
            console.error(err._message);
        }
        scanInfo.innerHTML = 'The QR Code contains: ' + contents;

        // window.QRScanner.hide(function(status){
        //     console.log(status);
        // });

        window.QRScanner.cancelScan(function(status){
          console.log(status);
        });
    };

    window.QRScanner.scan(callback);

    window.QRScanner.show();
}

var app = {
    // Application Constructor
    initialize: function() {
        document.getElementById('btnScan').addEventListener('click', startScan);
        document.getElementById('btnPrepare').addEventListener('click', startPrepare);
    },
};

app.initialize();
