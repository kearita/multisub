chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "openSubtitlesTab") {
      chrome.tabs.create(
        { url: chrome.runtime.getURL("subtitles.html") },
        (tab) => {
          // wait for the tab to load, then send message
          setTimeout(() => {
            chrome.tabs.sendMessage(tab.id, {
              action: "showSubtitles",
              text: request.text
            });
          }, 1000); // give tab time to load script
        }
      );
    }
  });
  