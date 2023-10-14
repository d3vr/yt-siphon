const YOUTUBE_HOSTNAME = "www.youtube.com";

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
        let newLink = videoLink.replace(YOUTUBE_HOSTNAME, data.frontendUrl);
        chrome.runtime.sendMessage({ openTab: newLink });
      }
    });
  }
});
