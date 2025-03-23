chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startSubtitles") {
      fetchAndTranscribe();
    }
  
    if (request.action === "stopSubtitles") {
      console.log("Stopping subtitles");
    }
  });
  

  function fetchAndTranscribe() {
    // Test with a small sample audio file URL for now
    const audioUrl = 'https://dare.wisc.edu/wp-content/uploads/sites/1051/2008/04/Arthur.mp3';
  
    fetch(audioUrl)
      .then(response => response.blob())
      .then(blob => {
        const formData = new FormData();
        formData.append('file', blob, 'audio.mp3');
  
        return fetch('http://localhost:5000/transcribe', {
          method: 'POST',
          body: formData
        });
      })
      .then(response => response.json())
      .then(data => {
        console.log("Transcription result:", data.transcription);
        alert("Transcription: " + data.transcription);
      })
      .catch(err => {
        console.error("Error fetching transcription:", err);
      });
  }
  