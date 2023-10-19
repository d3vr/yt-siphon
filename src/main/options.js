document.getElementById('save').addEventListener('click', function() {
  const frontendUrl = document.getElementById('frontendUrl').value;
  const autoRedirect = document.getElementById('autoRedirect').value;
  const redirectMain = document.getElementById('redirectMain').checked;
  chrome.storage.sync.set({ 'frontendUrl': frontendUrl, 'autoRedirect': autoRedirect, 'redirectMain': redirectMain }, function() {
    alert('Configuration saved!');
  });
});

// Load any previously saved frontend URL
chrome.storage.sync.get(['frontendUrl', 'autoRedirect', 'redirectMain'], function(data) {
  if (data.frontendUrl) {
    document.getElementById('frontendUrl').value = data.frontendUrl;
  }
  if (data.autoRedirect) {
    document.getElementById('autoRedirect').value = data.autoRedirect;
  }
  document.getElementById('redirectMain').checked = !!data.redirectMain;
});

