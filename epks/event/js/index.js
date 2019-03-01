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

var eventInfo = document.getElementById("eventinfo");

function insertEventInfo (type) {
    // date
    eventInfo.innerHTML +=type + "<br>";
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
        document.addEventListener('pause', this.onPause, false);
        document.addEventListener('resume', this.onResume, false);
        document.addEventListener('menubutton', this.onMenuKeyDown, false);

        console.log("onDeviceReady 11111111!");

        var success = function (ret) {
            console.log("getAppList success:" + ret.toString());
        };
        var error = function (error) {
            console.log("getAppList fail!");
        };
        appManager.getAppList(success, error);

        console.log("onDeviceReady 22222222!");
    },

    onPause: function() {
        insertEventInfo("pause");
    },

    onResume: function() {
        insertEventInfo("resume");
    },

    onMenuKeyDown: function() {
        insertEventInfo("menubutton");
    },
};

app.initialize();