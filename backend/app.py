from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()
ASSEMBLYAI_API_KEY = os.getenv("ASSEMBLYAI_API_KEY")
UPLOAD_ENDPOINT = "https://api.assemblyai.com/v2/upload"
TRANSCRIPT_ENDPOINT = "https://api.assemblyai.com/v2/transcript"

headers = {"authorization": ASSEMBLYAI_API_KEY}

app = Flask(__name__)

def upload_audio(audio_path):
    with open(audio_path, "rb") as f:
        response = requests.post(UPLOAD_ENDPOINT, headers=headers, data=f)
    return response.json()['upload_url']

def request_transcription(upload_url):
    response = requests.post(TRANSCRIPT_ENDPOINT, headers=headers, json={"audio_url": upload_url})
    return response.json()['id']

def get_transcription_result(transcript_id):
    endpoint = f"{TRANSCRIPT_ENDPOINT}/{transcript_id}"
    while True:
        response = requests.get(endpoint, headers=headers).json()
        if response['status'] in ('completed', 'error'):
            return response
        import time
        time.sleep(3)

@app.route('/transcribe', methods=['POST'])
def transcribe():
    audio_file = request.files['file']
    audio_file.save("audio.mp3")

    upload_url = upload_audio("audio.mp3")
    transcript_id = request_transcription(upload_url)
    result = get_transcription_result(transcript_id)

    if result['status'] == 'completed':
        return jsonify({"transcription": result['text']})
    else:
        return jsonify({"error": result['error']}), 400

if __name__ == '__main__':
    app.run(debug=True)
