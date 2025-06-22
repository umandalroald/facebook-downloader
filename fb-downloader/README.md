# 📥 Facebook Video Downloader

A fullstack application built with **FastAPI (Python)** and **React (TypeScript)** that allows users to download videos from Facebook via `yt-dlp`.

> ⚠️ This project is for educational purposes only. Downloading videos without permission from the content owner may violate terms of service and copyright laws.

---

## ⚙️ Features

- 🧠 Built with FastAPI backend and React frontend
- ⏳ Shows real-time download progress
- 💾 Auto-merges video + audio using FFmpeg
- 🌐 CORS enabled for local development

---

## 📦 Requirements

- Python 3.8+
- Node.js 16+
- `ffmpeg` installed and available in system PATH
- `yt-dlp` (installed via pip)
- React (TypeScript)

---

## 🚀 Setup Guide

### 🔧 1. Clone the repo

```bash
git clone https://github.com/umandalroald/facebook-downloader.git
cd facebook-downloader
```

---

### 🐍 2. Backend (FastAPI)

#### ▶️ Create a virtual environment

```bash
cd fb-downloader

python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\activate on Windows
```

#### 📦 Install dependencies

```bash
pip install -r requirements.txt
```

#### 🎬 Install FFmpeg (required)

- **macOS:** `brew install ffmpeg`
- **Ubuntu/Debian:** `sudo apt install ffmpeg`
- **Windows:** [Download here](https://ffmpeg.org/download.html), add `bin/` to system PATH

#### 🏃 Run FastAPI server

```bash
uvicorn main:app --reload --port 8000
```

---

### ⚛️ 3. Frontend (React + TypeScript)

#### 📁 Go to the frontend directory

If your React app is inside `client/` or `frontend/`, go there. Otherwise:

```bash
cd frontend  # or wherever your React app is
```

#### 📦 Install frontend dependencies

```bash
npm install
```

#### 🚀 Run React dev server

```bash
npm start
```

It will run on `http://localhost:3000` by default.

---

## 🛡️ Legal Disclaimer

> This tool is intended for **educational use only**.
>
> Downloading videos from Facebook or other platforms may:
>
> - Violate their [Terms of Service](https://www.facebook.com/terms)
> - Infringe on copyright law
> - Result in your account being suspended or legal action
>
> You are solely responsible for how you use this software.

---

## 🧹 TODO

- [ ] Deploy to production with HTTPS
- [ ] Add YouTube/TikTok support
- [ ] User authentication
- [ ] Download queue and history

---

## 📝 License

This project is licensed under the MIT License.
