document.getElementById('save').addEventListener('click', function() {
  const frontendUrl = document.getElementById('frontendUrl').value;
  chrome.storage.sync.set({ 'frontendUrl': frontendUrl }, function() {
    alert('Frontend URL saved!');
  });
});

// Load any previously saved frontend URL
chrome.storage.sync.get(['frontendUrl'], function(data) {
  if (data.frontendUrl) {
    document.getElementById('frontendUrl').value = data.frontendUrl;
  }
});

