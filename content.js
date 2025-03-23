chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startSubtitles") {
      const [lang1, lang2] = request.languages;
      console.log("Starting subtitles in:", lang1, lang2);
      // add transcription logic
    }
  
    if (request.action === "stopSubtitles") {
      console.log("Stopping subtitles");
      // stop transcription logic
    }
  });
  