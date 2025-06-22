from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import yt_dlp
import os
import uuid
import json

app = FastAPI()

# CORS for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/download")
async def download_video(url: str = Form(...)):
    video_id = str(uuid.uuid4())
    filename = f"{video_id}.mp4"
    progress_file = f"{video_id}.progress"

    def progress_hook(d):
        if d['status'] == 'downloading':
            percent = d.get('_percent_str', '').strip()
            with open(progress_file, 'w') as f:
                f.write(json.dumps({"progress": percent}))

        if d['status'] == 'finished':
            with open(progress_file, 'w') as f:
                f.write(json.dumps({"progress": "100%"}))

    ydl_opts = {
        'outtmpl': filename,
        'format': 'bestvideo+bestaudio/best',
        'progress_hooks': [progress_hook]
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

    # Remove progress file after done
    os.remove(progress_file)

    return {"filename": filename}

@app.get("/progress/{video_id}")
async def get_progress(video_id: str):
    progress_file = f"{video_id}.progress"
    if os.path.exists(progress_file):
        with open(progress_file, 'r') as f:
            data = json.load(f)
        return data
    else:
        return {"progress": "0%"}  # Default if not started yet

@app.get("/download/{filename}")
async def get_file(filename: str):
    file_path = f"./{filename}"
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type='application/octet-stream', filename=filename)
    else:
        return {"error": "File not found"}
