let imagesBlocked = true

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: "OFF" })
})

chrome.action.onClicked.addListener((tab) => {
  imagesBlocked = !imagesBlocked;
  chrome.action.setBadgeText({ text: imagesBlocked ? "OFF" : "ON" })
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: toggleImages,
    args: [imagesBlocked]
  })
})

function toggleImages(imagesBlocked) {
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.style.display = imagesBlocked ? "none" : ""
  })

  if (!imagesBlocked) {
    const observer = new MutationObserver(toggleImages)
    observer.disconnect()
  }
}




