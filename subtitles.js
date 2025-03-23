chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showSubtitles") {
      const lines = request.text.split(/(?<=[.?!])\s+/);
      const div = document.getElementById("subtitle");
      let i = 0;
  
      const interval = setInterval(() => {
        if (i >= lines.length) {
          clearInterval(interval);
          div.innerText = "Done!";
        } else {
          div.innerText = lines[i];
          i++;
        }
      }, 3000);
    }
  });
  