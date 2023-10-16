const YOUTUBE_HOSTNAME = 'www.youtube.com'
const linkSelector = 'a[href^="/watch?"]'

document.body.addEventListener('click', (event) => {
  const target = event.target.closest(linkSelector)

  if (event.shiftKey && target) {
    event.preventDefault()

    const videoLink = target.href

    chrome.storage.sync.get(['frontendUrl'], (data) => {
      if (data.frontendUrl) {
        const newLink = videoLink.replace(YOUTUBE_HOSTNAME, data.frontendUrl)
        chrome.runtime.sendMessage({ openTab: newLink })
      }
    })
  }
})
