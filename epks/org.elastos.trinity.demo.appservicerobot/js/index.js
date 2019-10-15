function showTestInfo(info) {
    document.getElementById("testinfo").innerHTML += info;
}

function onReceive(ret) {
    showTestInfo("onReceive:" + ret.message + ". type: " + ret.type + ". from: " + ret.from) + ". intentId:" + ret.intentId;
    var params = ret.params;
    if (typeof (params) == "object") {
        params = JSON.stringify(params);
    }
    showTestInfo(params);
}

function onReceiveIntent(ret) {
    showTestInfo("onReceiveIntent: action:" + ret.action + ". params: " + ret.params + ". from: " + ret.from);
    var params = ret.params;
    if (typeof (params) == "object") {
        params = JSON.stringify(params);
    }
    showTestInfo(params);

    if (ret.action == "pay") {
        setTimeout(pay, 500);
    }
}

function pay() {
    appService.sendIntentResponse("pay", {result: "txid"}, 0);
}

function onLauncher() {
    appService.launcher();
}

function onClose() {
    appService.close();
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
        appService.setIntentListener(onReceiveIntent);
    },
};

app.initialize();