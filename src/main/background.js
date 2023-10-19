const YOUTUBE_HOSTNAME = 'www.youtube.com';
const DEFAULT_FRONTEND_URL = 'piped.video';
const DEFAULT_AUTO_REDIRECT = -1;
const DEFAULT_REDIRECT_MAIN = false;

chrome.storage.sync.get(['frontendUrl', 'autoRedirect', 'redirectMain'], function(data) {
  if (!data)
    chrome.storage.sync.set({ 'frontendUrl': DEFAULT_FRONTEND_URL, 'autoRedirect': DEFAULT_AUTO_REDIRECT, 'redirectMain': DEFAULT_REDIRECT_MAIN });
  else {
    if (!data.frontendUrl)
      chrome.storage.sync.set({ 'frontendUrl': DEFAULT_FRONTEND_URL });
    if (!data.autoRedirect)
      chrome.storage.sync.set({ 'autoRedirect': DEFAULT_AUTO_REDIRECT });
    if (!data.redirectMain)
      chrome.storage.sync.set({ 'redirectMain': DEFAULT_REDIRECT_MAIN });
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
          //chrome.tabs.sendMessage(tab.id, command);
          let newUrl = tab.url.replace(YOUTUBE_HOSTNAME, frontend);
          //chrome.tabs.create({ url: newUrl, active: true });
          chrome.tabs.update(tab.id, { url: newUrl });
        });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.openTab) {
    chrome.tabs.create({ url: message.openTab, active: true });
  } else if (message.updateTab)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log("update tab", message.updateTab);
      const tab = tabs[0];
      if (tab.url)
        chrome.tabs.update(tab.id, { url: message.updateTab });
    });
});