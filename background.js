chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ imagesBlocked: true })
  chrome.action.setBadgeText({ text: "OFF" })
})

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get("imagesBlocked", (data) => {
    const newBlockedState = !data.imagesBlocked
    chrome.storage.local.set({ imagesBlocked: newBlockedState })
    chrome.action.setBadgeText({ text: newBlockedState ? "OFF" : "ON" })
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: toggleImages,
          args: [newBlockedState]
        })
      })
    })
  })
})

function toggleImages(imagesBlocked) {
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.style.display = imagesBlocked ? "none" : ""
  })

  if (imagesBlocked) {
    const observer = new MutationObserver(() => {
      const newImages = document.querySelectorAll("img")
      newImages.forEach((img) => {
        img.style.display = "none"
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })
    window.imageBlockerObserver = observer

  } else if (window.imageBlockerObserver) {
    window.imageBlockerObserver.disconnect()
    delete window.imageBlockerObserver
  }
}