from flask import Flask, request, jsonify
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
client = OpenAI(api_key=api_key)

@app.route('/transcribe', methods=['POST'])
def transcribe():
    audio_file = request.files['file']
    audio_file.save("audio.mp3")

    with open("audio.mp3", "rb") as audio:
        transcript = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio
        )

    return jsonify({"transcription": transcript.text})

if __name__ == '__main__':
    app.run(debug=True)
