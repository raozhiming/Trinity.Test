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

var clientDappId = "org.elastos.trinity.appservicetestA";

function onReceive(ret) {
    console.log("receive message:" + ret.message + ". from: " + ret.from);

    if (ret.message.indexOf("StartAndClose") != -1) {
        setTimeout(close, 500);
    }
    else {
        setTimeout(startDapp, 500);
    }
}

function startDapp() {
    var success = function (ret) {
        console.log("B start ok! dapp:" + clientDappId + " ret:" + ret);
    };
    var error = function (error) {
        console.log("B start fail! dapp:" + clientDappId + " error:" + error);
    };
    appService.start(clientDappId, success, error);
}

function close() {
    var success = function (ret) {
        console.log("B close ok! dapp ret:" + ret);
    };
    var error = function (error) {
        console.log("B close fail! dapp error:" + error);
    };
    appService.close(success, error);
}

function appserviceStartTest(type) {
    var success = function (ret) {
        console.log("send_message ok!");
    };
    var error = function (error) {
        console.log("send_message fail!" + error);
    };
    appService.sendMessage(clientDappId, 1, type, success, error);
}

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
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

        appService.setListener(onReceive);
    },
};

app.initialize();