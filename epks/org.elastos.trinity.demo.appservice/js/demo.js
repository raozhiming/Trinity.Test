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

function set_msg(side, avatar, content) {
    var data = new Date();
    var msg = '<li class="' + side + '">' +
        '<a class="user" href="#">' +
        '<img class="img-responsive avatar_" src="./img/' + avatar + '.png" alt=""></a>' +
        '<div class="reply-content-box">' +
        '<span class="reply-time">' + data.toLocaleTimeString() + '</span>' +
        '<div class="reply-content pr"><span class="arrow">&nbsp;</span>' +
        content + '</div></div></li>';
    $("#msg_content").append(msg);
    $("html, body").animate({ scrollTop: $(document).height()}, "slow");
}

function display_me_msg(content) {
    set_msg("me", "avatar", content);
}

function display_others_msg(content) {
    set_msg("other", "avatar_rob", content);
}

var commands = [
    { cmd: "help", fn: help, help: "help [cmd]" },

    { cmd: "getlocale", fn: get_locale, help: "getlocale" },
    { cmd: "start", fn: start_dapp, help: "start 1|2|id" },
    { cmd: "getinfo", fn: get_appinfo, help: "getinfo" },
    { cmd: "send", fn: sendmessage, help: "send 1|2|id" },
    { cmd: "intent", fn: intent, help: "intent action address amount" },
    { cmd: "intenturl", fn: intenturl, help: "intenturl url" }
]

function do_command(input) {
    var args = input.trim().match(/[^\s"]+|"([^"]*)"/g);
    if (!args || args[0] == "") {
        return;
    }

    args[0] = args[0].toLowerCase()

    for (var i = 0; i < commands.length; i++) {
        if (commands[i].cmd == args[0]) {
            commands[i].fn(args);
            return;
        }
    }
    display_others_msg("Unknown command:" + args[0]);
}

function help(args) {
    if (args.length > 1) {
        for (var i = 0; i < commands.length; i++) {
            if (commands[i].cmd == args[1]) {
                display_others_msg("Usage: :" + commands[i].help);
                return;
            }
        }
        display_others_msg("Usage: :" + commands[0].help);
    }
    else {
        var msg = "Available commands list: </br>"
        for (var i = 0; i < commands.length; i++) {
            msg += "&nbsp;&nbsp;" + commands[i].help + "</br>";
        }
        display_others_msg(msg);
    }
}

function get_appid_from_argv(arg) {
    var  appId = arg;
    if (arg == "1") {
        appId = "org.elastos.trinity.blockchain";
    }
    else if (arg == "2") {
        appId = "org.elastos.trinity.dapp.wallet";
    }
    return appId;
}

function get_locale(argv) {
    var success = function (info) {
        display_others_msg("get_locale." + info);
    };
    appService.get_locale(success);
}

function get_appinfo(argv) {
    var success = function (info) {
        display_others_msg("getAppInfo." + info);
    };
    appService.getAppInfo(success);
}

function start_dapp(argv) {
    if (argv.length != 2) {
        display_others_msg("Invalid command syntax.");
        return;
    }

    var appId = get_appid_from_argv(argv[1]);

    var success = function (info) {
        display_others_msg("start " + appId + " success.");
    };
    var error = function (error) {
        display_others_msg("start " + appId + " failed: " + error + ".");
    };
    appService.start(appId, success, error);
}

function sendmessage(argv) {
    if (argv.length != 4) {
        display_others_msg("Invalid command syntax.");
        return;
    }

    var appId = get_appid_from_argv(argv[1]);

    var success = function (info) {
        display_others_msg("sendMessage " + appId + " success.");
    };
    var error = function (error) {
        display_others_msg("sendMessage " + appId + " failed: " + error + ".");
    };
    appService.sendMessage(appId, argv[2], argv[3], success, error);
}

var parames = {
    toAddress: "Exxxxxxxxxxx",
    amount:100,
    memo: "just test momo"
}

function intent(argv) {
    if (argv.length != 4) {
        display_others_msg("Invalid command syntax.");
        return;
    }

    parames.toAddress = argv[2];
    parames.amount = parseFloat(argv[3]);
    parames.memo = "for test";

    var success = function (info) {
        display_others_msg("sendIntent result." + info.result);
    };
    var error = function (error) {
        display_others_msg("sendIntent failed: " + error + ".");
    };
    appService.sendIntent("pay", parames, success, error);
}

function intenturl(argv) {
    if (argv.length != 2) {
        display_others_msg("Invalid command syntax. intenturl url");
        return;
    }

    var success = function (info) {
        display_others_msg("sendUrlIntent result." + info.result);
    };
    var error = function (error) {
        display_others_msg("sendUrlIntent failed: " + error + ".");
    };
    appService.sendUrlIntent(argv[1]);
}

function onReceive(ret) {
    display_others_msg("onReceive:" + ret.message + ". type: " + ret.type + ". from: " + ret.from);
    var params = ret.message;
    if (typeof (params) == "string") {
        params = JSON.parse(params);
    }
    display_others_msg(params);
}

function onReceiveIntent(ret) {
    display_others_msg("onReceiveIntent: action:" + ret.action + ". params: " + ret.params + ". from: " + ret.from);
    var params = ret.message;
    if (typeof (params) == "string") {
        params = JSON.parse(params);
    }
    display_others_msg(params);
}

function onLauncher() {
    appService.launcher();
}

function onClose() {
    appService.close();
}

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        appService.setListener(onReceive);
        appService.setIntentListener(onReceiveIntent);
        do_command("help");
        $("input").focus();
        $("input").bind('keypress', function (event) {
            if (event.keyCode == "13") {
                var content = $('input').val()
                if (content.trim() != "") {
                    display_me_msg($('input').val());
                    do_command($('input').val());
                    $('input').val('');
                }
            }
        });
    },
};

app.initialize();
