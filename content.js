chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startSubtitles") {
      fetchAndTranscribe();
    }
  
    if (request.action === "stopSubtitles") {
      console.log("Stopping subtitles");
    }
  });
  

  function fetchAndTranscribe() {
    const audioUrl = "https://dare.wisc.edu/wp-content/uploads/sites/1051/2008/04/Arthur.mp3";
  
    fetch(audioUrl)
      .then(res => res.blob())
      .then(blob => {
        const formData = new FormData();
        formData.append("file", blob, "Arthur.mp3");
  
        return fetch("http://127.0.0.1:5000/transcribe", {
          method: "POST",
          body: formData
        });
      })
      .then(res => res.json())
      .then(data => {
        if (data.transcription) {
          console.log("Transcription result:", data.transcription);
          chrome.runtime.sendMessage({ action: "openSubtitlesTab", text: data.transcription });
        } else {
          console.error("Error:", data.error);
        }
      })
      .catch(err => {
        console.error("Fetch failed:", err);
      });
  }
  
  function showSubtitles(fullText) {
    const lines = fullText.split(/(?<=[.?!])\s+/); // split by sentence endings
    let index = 0;
  
    const subtitleBox = document.createElement("div");
    subtitleBox.style.position = "fixed";
    subtitleBox.style.bottom = "80px";
    subtitleBox.style.left = "50%";
    subtitleBox.style.transform = "translateX(-50%)";
    subtitleBox.style.background = "rgba(0, 0, 0, 0.75)";
    subtitleBox.style.color = "white";
    subtitleBox.style.padding = "10px 15px";
    subtitleBox.style.borderRadius = "10px";
    subtitleBox.style.fontSize = "16px";
    subtitleBox.style.zIndex = "99999";
    subtitleBox.style.maxWidth = "80%";
    subtitleBox.style.textAlign = "center";
    subtitleBox.style.lineHeight = "1.4";
  
    document.body.appendChild(subtitleBox);
  
    const interval = setInterval(() => {
      if (index >= lines.length) {
        clearInterval(interval);
        subtitleBox.remove();
      } else {
        subtitleBox.innerText = lines[index];
        index++;
      }
    }, 3000); // Show each line for 3 seconds
  }
  
  