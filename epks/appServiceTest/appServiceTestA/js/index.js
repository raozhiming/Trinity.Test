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

// var eventInfo = document.getElementById("eventinfo");

// function insertEventInfo (type) {
//     // date
//     eventInfo.innerHTML +=type + "<br>";
// }

var clientDappId = "org.elastos.trinity.appservicetestB";
var testCountExpect=0;
var testCountRunning=0;

function reset() {
    testCountExpect=parseInt(document.getElementById("loopcount").value);
    testCountRunning=0;
    console.log("Test Count:" + testCountExpect);
}

function showTestInfo() {
    document.getElementById("testinfo").innerHTML = "Test Count:" + testCountRunning;
}

function onReceive(ret) {
    console.log("receive message:" + ret.message + ". from: " + ret.from);
}

function startDapp() {
    var success = function (ret) {
        console.log("A start ok! dapp:" + clientDappId + " ret:" + ret);
    };
    var error = function (error) {
        console.log("A start fail! dapp:" + clientDappId + " error:" + error);
    };
    appService.start(clientDappId, success, error);
}

function appserviceStartTest(type) {
    var success = function (ret) {
        console.log("A send_message ok!");
    };
    var error = function (error) {
        console.log("A send_message fail!" + error);
    };
    appService.sendMessage(clientDappId, 1, type, success, error);
}

function do_test(type) {
    startDapp();
    appserviceStartTest(type);

    if (testCountRunning++ >= testCountExpect) return;

    showTestInfo();

    setTimeout(do_test, 1000);
}

function startCloseTest(ret) {
    reset();
    console.log("startCloseTest");
    do_test("StartAndClose");
}

function startTest(ret) {
    reset();
    console.log("startTest");
    do_test("Start");
}

function stopTest(ret) {
    testCountExpect = 0;
}


var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.getElementById('btnStartClose').addEventListener('click', startCloseTest);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        document.getElementById('btnStartClose').addEventListener('click', startCloseTest);
        document.getElementById('btnStart').addEventListener('click', startTest);
        document.getElementById('btnStop').addEventListener('click', stopTest);
        appService.setListener(onReceive);

        document.getElementById('loopcount').addEventListener('keyup', this.onkeyup);
        document.getElementById('loopcount').addEventListener('afterpaste', this.onafterpaste);
    },

    onkeyup: function() {
        this.value=this.value.replace(/\D/g,'');
    },
    onafterpaste: function() {
        this.value=this.value.replace(/\D/g,'');
    },
};

app.initialize();