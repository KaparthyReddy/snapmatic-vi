import { useRef, useState } from 'react';
import PhotoEditor, { type PhotoEditorHandle, type SavedImage } from './components/PhotoEditor';
import { downloadDataUrl, fileToDataUrl } from './lib/image';

const SEED_IMAGE =
  'data:image/svg+xml;base64,' +
  btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FF2D78"/><stop offset="55%" stop-color="#FF7A3D"/>
        <stop offset="100%" stop-color="#FFC24B"/></linearGradient></defs>
      <rect width="1080" height="1080" fill="url(#g)"/>
      <circle cx="540" cy="620" r="210" fill="#FFF3C4" opacity="0.85"/>
      <rect y="820" width="1080" height="260" fill="#2D1B4E"/>
    </svg>`
  );

export default function App() {
  const editorRef = useRef<PhotoEditorHandle>(null);
  const [image, setImage] = useState(SEED_IMAGE);
  const [status, setStatus] = useState('Booting editor…');
  const [saved, setSaved] = useState<string | null>(null);

  const handleSave = ({ dataUrl, blob }: SavedImage) => {
    setSaved(dataUrl);
    setStatus(`Saved · ${Math.round(blob.size / 1024)}KB`);
  };

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;
    try {
      if (editorRef.current?.hasChanges()) {
        const ok = window.confirm('Loading a new photo discards your current edits. Continue?');
        if (!ok) return;
      }
      setImage(await fileToDataUrl(file));
      setStatus('New photo loaded');
    } catch (error) {
      setStatus((error as Error).message);
    }
  };

  const handleGrab = () => {
    const dataUrl = editorRef.current?.getImage();
    if (!dataUrl) {
      setStatus('Editor is not ready yet.');
      return;
    }
    downloadDataUrl(dataUrl, 'snapmatic-vi.png');
    setStatus('Exported current canvas');
  };

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px 64px' }}>
      <header style={{ marginBottom: 24 }}>
        <h1 className="vi-display" style={{ fontSize: 44, margin: 0 }}>
          <span className="vi-gradient-text">Snapmatic VI</span>
        </h1>
        <p style={{ color: 'var(--vi-muted)', marginTop: 8, fontSize: 15 }}>
          Day 1 harness — verifying the editor round-trip before the phone shell lands.
        </p>
      </header>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        <label className="vi-btn" style={{ display: 'inline-flex', alignItems: 'center' }}>
          Load photo
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleUpload(e.target.files?.[0])}
          />
        </label>
        <button className="vi-btn" onClick={handleGrab}>
          getImage()
        </button>
        <button
          className="vi-btn"
          onClick={() => setStatus(editorRef.current?.hasChanges() ? 'Unsaved edits' : 'Clean')}
        >
          hasChanges()
        </button>
        <button className="vi-btn" onClick={() => editorRef.current?.reset(SEED_IMAGE)}>
          reset()
        </button>
      </div>

      <PhotoEditor
        ref={editorRef}
        image={image}
        onSave={handleSave}
        onCancel={() => setStatus('Cancelled')}
        onReady={() => setStatus('Editor ready')}
        onFailure={(message) => setStatus(message)}
      />

      <p style={{ marginTop: 16, fontSize: 14, color: 'var(--vi-amber)' }}>{status}</p>

      {saved && (
        <section style={{ marginTop: 24 }}>
          <h2 className="vi-display" style={{ fontSize: 18 }}>
            Last save
          </h2>
          <img
            src={saved}
            alt="Last saved edit"
            style={{ maxWidth: 320, borderRadius: 'var(--vi-radius-md)', border: '1px solid var(--vi-hairline)' }}
          />
        </section>
      )}
    </main>
  );
}
