chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showSubtitles") {
      const originalLines = request.original.split(/(?<=[.?!])\s+/);
      const spanishLines = request.spanish.split(/(?<=[.?!])\s+/);
      const romanianLines = request.romanian.split(/(?<=[.?!])\s+/);
  
      const div = document.getElementById("subtitle");
      let i = 0;
  
      const interval = setInterval(() => {
        if (i >= originalLines.length) {
          clearInterval(interval);
          div.innerText = "Done!";
        } else {
          div.innerHTML = `
            <p><strong>EN:</strong> ${originalLines[i]}</p>
            <p><strong>ES:</strong> ${spanishLines[i] || ""}</p>
            <p><strong>RO:</strong> ${romanianLines[i] || ""}</p>
          `;
          i++;
        }
      }, 4000); // hold each set for 4 seconds
    }
  });
  