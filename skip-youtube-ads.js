console.log(
  "-------------------------Start Skip Youtube Ads-------------------------"
);
chrome.runtime.sendMessage({ onYoutube: true });

const loadHtmlElementLimitation = (selector, limit) => {
  while (limit > 0) {
    const el = document.querySelector(selector);
    limit--;
    // console.log(`Limit - ${selector}`, limit);
    // console.log("-----------------------");
    if (el) {
      return el;
    }
  }

  return null;
} 

const observerMoviePlayer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.addedNodes.length === 0) {
      return;
    }

    if (
      mutation.target.className === "ytp-ad-text" ||
      mutation.target.className === "ytp-ad-text ytp-ad-preview-text"
    ) {
      const btnSkip = document.querySelector(".ytp-ad-skip-button.ytp-button");
      if (btnSkip) {
        console.log("Youtube - Skip Ads");
        btnSkip.click();
      }
    }

    if (mutation.target.className === "video-ads ytp-ad-module") {
      const btnPopupAds = document.querySelectorAll(
        ".ytp-ad-overlay-close-button"
      );
      btnPopupAds.forEach((el) => {
        if (el.clientHeight) {
          console.log("Youtube - Close Ads Popup");
          el.click();
        }
      });
    }
  }
});

const observerYtbContent = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.target.id === 'movie_player') {
      startDetectMovePlayer();
      observerYtbContent.disconnect();
    }
  }
});

const startDetectMovePlayer = () => {
  const moviePlayerEl = loadHtmlElementLimitation("#movie_player", 100);
  if (!moviePlayerEl) {
    console.error("Don't exist #movie_player");
  } else {
    observerMoviePlayer.disconnect();
    observerMoviePlayer.observe(moviePlayerEl, {
      childList: true,
      subtree: true,
    });
  }
}


const contentEl = loadHtmlElementLimitation("#content", 100);

if (!contentEl) {
  console.error("Don't exist #content");
} else {
  console.dir("#content", contentEl);
  observerMoviePlayer.observe(contentEl, {
    childList: true,
    subtree: true,
  });
}
