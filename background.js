chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "openSubtitlesTab") {
      chrome.tabs.create(
        { url: chrome.runtime.getURL("subtitles.html") },
        (tab) => {
          // wait for the tab to load, then send all subtitle data
          setTimeout(() => {
            chrome.tabs.sendMessage(tab.id, {
              action: "showSubtitles",
              original: request.text,
              spanish: request.spanish,
              romanian: request.romanian
            });
          }, 1000);
        }
      );
    }
  });
  