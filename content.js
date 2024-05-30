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

chrome.storage.local.get("imagesBlocked", (data) => {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    toggleImages(data.imagesBlocked)
  } else {
    document.addEventListener('DOMContentLoaded', () => toggleImages(data.imagesBlocked))
  }
})

