// Background
//Ref:http://stackoverflow.com/questions/23895377/sending-message-from-a-background-script-to-a-content-script-then-to-a-injected/
function ensureSendMessage(tabId, message, callback){
  chrome.tabs.executeScript(tabId, {file: "content_script.js"}, function(){
    if(chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      throw Error("Unable to inject script into tab " + tabId);
    }
    // OK, now it's injected and ready
    chrome.tabs.sendMessage(tabId, message, callback);
  });
}

