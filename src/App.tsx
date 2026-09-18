import { useRef, useState } from 'react';
import PhoneShell from './components/PhoneShell';
import BootScreen from './components/BootScreen';
import LockScreen from './components/LockScreen';
import StatusBar from './components/StatusBar';
import AppGrid from './components/AppGrid';
import CameraRoll from './components/CameraRoll';
import PhotoEditor, { type PhotoEditorHandle, type SavedImage } from './components/PhotoEditor';
import { SEED_ROLL } from './lib/seed';
import type { AppId, RollPhoto, Screen } from './types';

export default function App() {
  const [screen, setScreen] = useState<Screen>('boot');
  const [roll, setRoll] = useState<RollPhoto[]>(SEED_ROLL);
  const [activePhoto, setActivePhoto] = useState<RollPhoto | null>(null);
  const [status, setStatus] = useState('');
  const wantedLevel = 0;

  const editorRef = useRef<PhotoEditorHandle>(null);

  const openApp = (id: AppId) => {
    if (id === 'camera') setScreen('roll');
  };

  const openPhoto = (photo: RollPhoto) => {
    setActivePhoto(photo);
    setScreen('editor');
  };

  const handleUpload = (photo: RollPhoto) => {
    setRoll((prev) => [photo, ...prev]);
    openPhoto(photo);
  };

  const handleSave = ({ dataUrl }: SavedImage) => {
    const saved: RollPhoto = { id: `edit-${Date.now()}`, dataUrl, savedAt: Date.now(), label: 'Edited' };
    setRoll((prev) => [saved, ...prev]);
    setStatus('Saved to camera roll');
    setScreen('roll');
  };

  return (
    <main className="vi-stage">
      <PhoneShell>
        {screen === 'boot' && <BootScreen onDone={() => setScreen('lock')} />}

        {screen === 'lock' && <LockScreen onUnlock={() => setScreen('home')} wantedLevel={wantedLevel} />}

        {screen === 'home' && (
          <>
            <StatusBar wantedLevel={wantedLevel} />
            <div className="vi-home">
              <div className="vi-home__title vi-display vi-gradient-text">Leonida</div>
              <AppGrid onOpen={openApp} />
            </div>
          </>
        )}

        {screen === 'roll' && (
          <>
            <StatusBar wantedLevel={wantedLevel} />
            <CameraRoll
              photos={roll}
              onSelect={openPhoto}
              onUpload={handleUpload}
              onBack={() => setScreen('home')}
              onUploadError={setStatus}
            />
          </>
        )}

        {screen === 'editor' && activePhoto && (
          <>
            <StatusBar wantedLevel={wantedLevel} />
            <div className="vi-editorscreen">
              <div className="vi-editorscreen__header">
                <button className="vi-iconbtn" onClick={() => setScreen('roll')} aria-label="Back">
                  ←
                </button>
                <span className="vi-editorscreen__title">Edit</span>
              </div>
              <PhotoEditor
                ref={editorRef}
                image={activePhoto.dataUrl}
                minHeight={460}
                onSave={handleSave}
                onFailure={setStatus}
              />
            </div>
          </>
        )}
      </PhoneShell>

      {status && <p className="vi-toast">{status}</p>}
    </main>
  );
}
