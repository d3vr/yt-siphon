const YOUTUBE_HOSTNAME = 'www.youtube.com';
const DEFAULT_FRONTEND_URL = 'piped.video';


chrome.storage.sync.get(['frontendUrl'], function(data) {
  if (!data || !data.frontendUrl) {
    chrome.storage.sync.set({ 'frontendUrl': DEFAULT_FRONTEND_URL });
  }
});

browser.action.onClicked.addListener((tab) => {
  browser.runtime.openOptionsPage();
});


chrome.commands.onCommand.addListener(function(command) {
  console.log(command);
  if (command === "open_alt_frontend") {
    console.log("Execute action");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab.url && tab.url.includes(YOUTUBE_HOSTNAME)) {
        console.log(tab.url);
        chrome.storage.sync.get(['frontendUrl'], function(data) {
          let frontend = data.frontendUrl;
          console.log(frontend);
          let newUrl = tab.url.replace(YOUTUBE_HOSTNAME, frontend);
          chrome.tabs.update(tab.id, { url: newUrl });
        });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.openTab) {
    chrome.tabs.create({ url: message.openTab, active: false });
  }
});

