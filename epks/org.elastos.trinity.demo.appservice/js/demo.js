//
// Copyright (c) 2018 Elastos Foundation
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//



var testinfo = document.getElementById("testinfo");
var cmdinfo = document.getElementById("cmdinfo");
var appidOption = document.getElementById("appid");
var intentOption = document.getElementById("intent");
var intenturlOption = document.getElementById("intenturl");
var args = document.getElementById("args");
var methond = "";

function showCmdInfo() {
    cmdinfo.innerHTML = "Methond:" + methond + "<br>args:";
}

function showTestInfo(info) {
    testinfo.innerHTML = info;
}

function showOption(option) {
    appidOption.style.display = "none";
    intentOption.style.display = "none";
    intenturlOption.style.display = "none";

    if (option != "") option.style.display = "block";
}

function get_locale(argv) {
    var success = function (info) {
        showTestInfo("get_locale." + info);
    };
    appService.get_locale(success);
}

function get_appinfo(argv) {
    var success = function (info) {
        showTestInfo("getAppInfo." + info);
    };
    appService.getAppInfo(success);
}

function start_dapp(argv) {
    var success = function (info) {
        showTestInfo("start " + argv[0] + " success.");
    };
    var error = function (error) {
        showTestInfo("start " + argv[0] + " failed: " + error + ".");
    };
    appService.start(argv[0], success, error);
}

function sendmessage(argv) {
    var success = function (info) {
        showTestInfo("sendMessage " + argv[0] + " success.");
    };
    var error = function (error) {
        showTestInfo("sendMessage " + argv[0] + " failed: " + error + ".");
    };
    appService.sendMessage(argv[0], argv[1], argv[2], success, error);
}

var payParames = {
    toAddress: "Exxxxxxxxxxx",
    amount:100,
    memo: "just test momo"
}

var chatParames = {
    toAddress: "Exxxxxxxxxxx",
    message:""
}

function intent(argv) {
    var parames;

    if ("pay" == argv[0]) {
        if (argv.length < 4) {
            showTestInfo("pay toAddress amount memo");
            return;
        }
        payParames.toAddress = argv[1];
        payParames.amount = parseFloat(argv[2]);
        payParames.memo = argv[3];
        parames = payParames;
    }
    else {
        if (argv.length < 3) {
            showTestInfo("chat toAddress message");
            return;
        }
        chatParames.toAddress = argv[1];
        chatParames.message = argv[2];
        parames = chatParames;
    }

    var success = function (info) {
        showTestInfo("sendIntent result." + info.result);
    };
    var error = function (error) {
        showTestInfo("sendIntent failed: " + error + ".");
    };
    appService.sendIntent(argv[0], parames, success, error);
}

function intenturl(argv) {
    var success = function (info) {
        showTestInfo("sendUrlIntent result." + info.result);
    };
    var error = function (error) {
        showTestInfo("sendUrlIntent failed: " + error + ".");
    };
    appService.sendUrlIntent(argv[0]);
}

function onReceive(ret) {
    display_others_msg("onReceive:" + ret.message + ". type: " + ret.type + ". from: " + ret.from);
    var params = ret.message;
    if (typeof (params) == "string") {
        params = JSON.parse(params);
    }
    showTestInfo(params);
}

function onReceiveIntent(ret) {
    display_others_msg("onReceiveIntent: action:" + ret.action + ". params: " + ret.params + ". from: " + ret.from);
    var params = ret.message;
    if (typeof (params) == "string") {
        params = JSON.parse(params);
    }
    showTestInfo(params);
}

function onLauncher() {
    appService.launcher();
}

function onClose() {
    appService.close();
}

function Click() {
    showTestInfo("");

    strs = args.value.split(" ");

    switch (methond) {
        case "Start":
            start_dapp(strs);
        break;
        case "SendMessage":
            sendmessage(strs);
        break;
        case "SendIntent":
            intent(strs);
        break;
        case "SendIntentByUrl":
            intenturl(strs);
        break;
        default:
        break;
    }
}

function Start() {
    methond = "Start";
    showCmdInfo();
    showOption(appidOption);
}

function SendMsg() {
    methond = "SendMessage";
    showCmdInfo();
    showOption(appidOption);
}

function Intent() {
    methond = "SendIntent";
    showCmdInfo();
    showOption(intentOption);
}


function IntentUrl() {
    methond = "SendIntentByUrl";
    showCmdInfo();
    showOption(intenturlOption);
}

function SelectWallet() {
    args.value = "org.elastos.trinity.dapp.wallet";
}

function SelectBlockchain() {
    args.value = "org.elastos.trinity.blockchain";
}

function SelectPayAction() {
    args.value = "pay Exxxxx  100 fortest";
}

function SelectChatAction() {
    args.value = "chat address helloworld";
}

function SelectElastosUrl() {
    args.value = "elastos:///chat?toAddress=Exxxx&amount=100&memo=helloworld";
}

function SelectMailtoUrl() {
    args.value = "mailto:test@elastos.org";
}

function SelectTelUrl() {
    args.value = "tel:10086";
}

function SelectSmsUrl() {
    args.value = "sms:10086";
}

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        document.getElementById('btnClick').addEventListener('click', Click);

        document.getElementById('btnStart').addEventListener('click', Start);
        document.getElementById('btnSendMsg').addEventListener('click', SendMsg);
        document.getElementById('btnIntent').addEventListener('click', Intent);
        document.getElementById('btnIntentUrl').addEventListener('click', IntentUrl);

        document.getElementById('wallet').addEventListener('click', SelectWallet);
        document.getElementById('blockchain').addEventListener('click', SelectBlockchain);

        document.getElementById('pay').addEventListener('click', SelectPayAction);
        document.getElementById('chat').addEventListener('click', SelectChatAction);

        document.getElementById('url_elastos').addEventListener('click', SelectElastosUrl);
        document.getElementById('url_mailto').addEventListener('click', SelectMailtoUrl);
        document.getElementById('url_sms').addEventListener('click', SelectSmsUrl);
        document.getElementById('url_tel').addEventListener('click', SelectTelUrl);


        appService.setListener(onReceive);
        appService.setIntentListener(onReceiveIntent);
    },
};

app.initialize();
