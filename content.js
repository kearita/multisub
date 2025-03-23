chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showSubtitles") {
      const dummyCaptions = [
        { start: 0, duration: 2, text: "Hello everyone, welcome back!" },
        { start: 2, duration: 3, text: "Today we’re going to talk about Chrome extensions." },
        { start: 5, duration: 2.5, text: "Let’s get started!" },
      ];
  
      let currentIndex = 0;
  
      // Create the overlay container
      let overlay = document.createElement("div");
      overlay.id = "multiSubOverlay";
      overlay.style.position = "fixed";
      overlay.style.bottom = "10%";
      overlay.style.left = "5%";
      overlay.style.zIndex = "9999";
      overlay.style.background = "rgba(0, 0, 0, 0.8)";
      overlay.style.color = "#fff";
      overlay.style.padding = "12px";
      overlay.style.borderRadius = "10px";
      overlay.style.fontSize = "1rem";
      overlay.style.cursor = "move";
      overlay.style.maxWidth = "80%";
      overlay.style.userSelect = "none";
  
      // Close button
      let closeBtn = document.createElement("span");
      closeBtn.innerText = "✖";
      closeBtn.style.float = "right";
      closeBtn.style.cursor = "pointer";
      closeBtn.onclick = () => overlay.remove();
      overlay.appendChild(closeBtn);
  
      // Subtitle text
      const subtitleEl = document.createElement("p");
      subtitleEl.style.marginTop = "1.5em";
      overlay.appendChild(subtitleEl);
  
      document.body.appendChild(overlay);
  
      // Make it draggable
      let isDragging = false;
      let offsetX, offsetY;
  
      overlay.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - overlay.getBoundingClientRect().left;
        offsetY = e.clientY - overlay.getBoundingClientRect().top;
      });
  
      document.addEventListener("mousemove", (e) => {
        if (isDragging) {
          overlay.style.left = `${e.clientX - offsetX}px`;
          overlay.style.top = `${e.clientY - offsetY}px`;
          overlay.style.bottom = "auto"; // so it doesn’t fight with bottom positioning
        }
      });
  
      document.addEventListener("mouseup", () => {
        isDragging = false;
      });
  
      // Sync with video
      const video = document.querySelector("video");
      const interval = setInterval(() => {
        const currentTime = video.currentTime;
        if (
          currentIndex < dummyCaptions.length &&
          currentTime >= dummyCaptions[currentIndex].start
        ) {
          subtitleEl.innerText = dummyCaptions[currentIndex].text;
          currentIndex++;
        }
        if (currentIndex >= dummyCaptions.length) {
          clearInterval(interval);
        }
      }, 300);
    }
  });
  