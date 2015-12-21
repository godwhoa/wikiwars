$('.connect-btn').click(function() {
    var roomid = $('.roomid').val()
    var nick = $('.nick').val()
    console.log(roomid, nick)
    chrome.runtime.sendMessage({nick:nick,roomid:roomid})
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    	var msg = sender.msg 
    	/*Game logic goes here*/
    }
);