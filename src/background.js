const YOUTUBE_HOSTNAME = 'www.youtube.com'
const DEFAULT_FRONTEND_URL = 'piped.video'


chrome.storage.sync.get(['frontendUrl'], (data) => {
  if (!data || !data.frontendUrl) {
    chrome.storage.sync.set({ 'frontendUrl': DEFAULT_FRONTEND_URL })
  }
})

browser.action.onClicked.addListener(() => {
  browser.runtime.openOptionsPage()
})

chrome.commands.onCommand.addListener((command) => {
  if (command === 'open_alt_frontend') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]

      if (tab.url && tab.url.includes(YOUTUBE_HOSTNAME)) {
        chrome.storage.sync.get(['frontendUrl'], (data) => {
          const frontend = data.frontendUrl
          const newUrl = tab.url.replace(YOUTUBE_HOSTNAME, frontend)
          chrome.tabs.update(tab.id, { url: newUrl })
        })
      }
    })
  }
})

chrome.runtime.onMessage.addListener((message) => {
  if (message.openTab) {
    chrome.tabs.create({ url: message.openTab, active: false })
  }
})

