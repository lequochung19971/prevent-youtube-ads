const btnStart = document.querySelector('#button-start');
chrome.runtime.onMessage.addListener(function (msg, sender) {
  if (msg.onYoutube === true) {
    // chrome.action.setIcon({
    //   tabId: sender.tab.id,
    //   path: {
		// 		"16": "icon16.png"
		// 	},
    // });
		// chrome.action.setPopup({
    //   popup: "index.html",
    // });
		btnStart.setAttribute('data', 'active')
		const btnText = btnStart.querySelector('.btn-skip-text');
		btnText.classList.add('active');
  }
});
