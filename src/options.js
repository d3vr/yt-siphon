document.getElementById('save').addEventListener('click', () => {
  const frontendUrl = document.getElementById('frontendUrl').value
  chrome.storage.sync.set({ 'frontendUrl': frontendUrl }, () => {
    alert('Frontend URL saved!')
  })
})

chrome.storage.sync.get(['frontendUrl'], (data) => {
  if (data.frontendUrl) {
    document.getElementById('frontendUrl').value = data.frontendUrl
  }
})

