chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleMute") {
    chrome.tabs.update(request.tabId, { muted: request.muted });
    sendResponse({ status: "success" });
  }
});