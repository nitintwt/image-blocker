function blockImages() {
  const images = document.querySelectorAll("img")
  images.forEach(img => {
    img.style.display = "none"
  })
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  blockImages()
} else {
  document.addEventListener('DOMContentLoaded', blockImages)
}

const observer = new MutationObserver(blockImages)
observer.observe(document.body, { childList: true, subtree: true })

