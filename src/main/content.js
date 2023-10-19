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

let interval, freeze = false;
function setupInterval() {
  if (interval) clearInterval(interval);
  chrome.storage.sync.get(["autoRedirect", "frontendUrl", "redirectMain"], function(data) {
    const autoRedirect = parseInt(data.autoRedirect);
    if (!isNaN(autoRedirect) && autoRedirect >= 0) {
      interval = setInterval(() => {
        if (window.location.host === YOUTUBE_HOSTNAME && window.location.pathname.startsWith("/watch")) {
          if (!freeze) {
            // Make it wait one more cycle to ensure history is stored
            freeze = true;
            return;
          }
          freeze = false;
          console.log("redirecting to", data.frontendUrl);
          let newLink = window.location.href.replace(YOUTUBE_HOSTNAME, data.frontendUrl);
          chrome.runtime.sendMessage({ updateTab: newLink });
        } else {
          if (data.redirectMain && window.location.host === data.frontendUrl && (window.location.pathname === "/" || window.location.pathname.startsWith("/trending") || window.location.pathname.startsWith("/feed"))) {
            console.log("redirecting to", `https://${YOUTUBE_HOSTNAME}`);
            chrome.runtime.sendMessage({ updateTab: `https://${YOUTUBE_HOSTNAME}` });
          }
        }
      }, autoRedirect);
    }
  });
}
setupInterval();

chrome.storage.sync.onChanged.addListener(function() {
  setupInterval();
});

/*chrome.runtime.onMessage.addListener(function(message) {
  console.log("content message");
  console.log(message);
  if (message === "open_alt_frontend") {
    document.querySelector("video").pause();
  }
});*/