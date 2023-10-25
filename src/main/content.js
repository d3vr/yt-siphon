const YOUTUBE_HOSTNAME = "www.youtube.com";
const YOUTUBE_NOCOOKIE = 'youtube-nocookie.com';

document.body.addEventListener("click", function(e) {
  if (
    e.shiftKey &&
    (e.target.closest('a[href^="/watch?"]') ||
      e.target.closest("ytd-thumbnail"))
  ) {
    e.preventDefault();
    let videoLink = e.target.closest('a[href^="/watch?"]').href;
    chrome.storage.sync.get(["frontendUrl"], function(data) {
      if (data.frontendUrl) {
        let newLink;
        if (data.frontendUrl === YOUTUBE_NOCOOKIE) {
          newLink = videoLink.replace(YOUTUBE_HOSTNAME + '/watch?v=', YOUTUBE_NOCOOKIE + '/embed/');
        } else {
          newLink = videoLink.replace(YOUTUBE_HOSTNAME, data.frontendUrl);
        }
        // let newLink = videoLink.replace(YOUTUBE_HOSTNAME, data.frontendUrl);
        chrome.runtime.sendMessage({ openTab: newLink });
      }
    });
  }
});
