import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [downloadLink, setDownloadLink] = useState<string>('');
  const [progress, setProgress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string>('');

  const handleDownload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDownloadLink('');
    setProgress('');
    setLoading(true);

    const id = Math.random().toString(36).substring(2, 15);
    setVideoId(id);

    const formData = new FormData();
    formData.append('url', url);

    try {
      const res = await axios.post<{ filename: string }>('http://localhost:8000/download', formData);
      const filename = res.data.filename;
      setDownloadLink(`http://localhost:8000/download/${filename}`);
    } catch (err) {
      console.error(err);
      alert('Failed to download');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (loading) {
      interval = setInterval(async () => {
        try {
          const res = await axios.get<{ progress: string }>(`http://localhost:8000/progress/${videoId}`);
          setProgress(res.data.progress);

          if (res.data.progress === '100%') {
            clearInterval(interval);
          }
        } catch (err) {
          console.error(err);
        }
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [loading, videoId]);

  return (
    <div style={{ maxWidth: 600, margin: '100px auto', textAlign: 'center' }}>
      <h2>Facebook Video Downloader</h2>
      <form onSubmit={handleDownload}>
        <input
          type="text"
          placeholder="Paste Facebook Video URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: '100%', padding: 10 }}
          disabled={loading}
        />
        <button type="submit" style={{ padding: 10, marginTop: 10 }} disabled={loading}>
          {loading ? 'Downloading...' : 'Download'}
        </button>
      </form>

      {loading && (
        <div style={{ marginTop: 20 }}>
          <p>Downloading... {progress}</p>
          <div style={{ background: '#ddd', height: 20, borderRadius: 10 }}>
            <div
              style={{
                width: progress,
                background: '#4caf50',
                height: '100%',
                borderRadius: 10,
                transition: 'width 0.5s'
              }}
            ></div>
          </div>
        </div>
      )}

      {downloadLink && (
        <div style={{ marginTop: 20 }}>
          <a href={downloadLink} download>
            👉 Click here to download
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
