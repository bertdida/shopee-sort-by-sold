chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript(null, { file: "shopee-sort-by-sold.js" });
});
