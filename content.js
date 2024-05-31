function toggleImages(imagesBlocked) {
  const images = document.querySelectorAll( "img , div.css-175oi2r.r-1mlwlqe.r-1udh08x.r-417010.r-1p0dtai.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af" )
  images.forEach((img) => {
    img.style.display = imagesBlocked ? "none" : ""
  })

  if (imagesBlocked) {
    const observer = new MutationObserver(() => {
      const newImages = document.querySelectorAll("img , div.css-175oi2r.r-1mlwlqe.r-1udh08x.r-417010.r-1p0dtai.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af")
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