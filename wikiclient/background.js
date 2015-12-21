var roomid
var nick
var url


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        nick = sender.nick
        roomid = sender.roomid
        //Not to feed its own sent message L45
        if (nick != undefined) {
           var ws = new WebSocket("ws://localhost:8080/ws/" + roomid);
           //These two deal with conn. not ready error.
            function waitForSocketConnection(socket, callback) {
                setTimeout(
                    function() {
                        if (socket.readyState === 1) {
                            if (callback !== undefined) {
                                callback();
                            }
                            return;
                        } else {
                            waitForSocketConnection(socket, callback);
                        }
                    }, 5);
            }
            function send(msg) {
                waitForSocketConnection(ws, function() {
                    send(msg);
                });
            };

            ws.onopen = function() {
                //Send nick
                send(JSON.stringify({
                    "nick": nick,
                    "url": ""
                }));
            };

            ws.onmessage = function(evt) {
                var msg = evt.data;
                //Send to popup.js
                //Now that I think about it maybe its not needed.
                chrome.runtime.sendMessage({
                    msg: msg
                })
            };

            ws.onclose = function() {

            };

            //These two to handle change and launch of tab.
            chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
                url = window.location.href;
                send(JSON.stringify({
                    "nick": nick,
                    "url": url
                }));
            });

            chrome.tabs.onActivated.addListener(function(activeInfo) {
                url = window.location.href;
                send(JSON.stringify({
                    "nick": nick,
                    "url": url
                }));
            });
        }
    }
);
