document.getElementById("startBtn").addEventListener("click", () => {
    const lang1 = document.getElementById("lang1").value;
    const lang2 = document.getElementById("lang2").value;
  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "startSubtitles",
        languages: [lang1, lang2]
      });
    });
  });
  
  document.getElementById("stopBtn").addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "stopSubtitles" });
    });
  });
  