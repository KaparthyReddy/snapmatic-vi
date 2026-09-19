import { useEffect, useRef, useState } from 'react';
import PhoneShell from './components/PhoneShell';
import BootScreen from './components/BootScreen';
import LockScreen from './components/LockScreen';
import StatusBar from './components/StatusBar';
import AppGrid from './components/AppGrid';
import CameraRoll from './components/CameraRoll';
import PhotoEditor, { type PhotoEditorHandle, type SavedImage } from './components/PhotoEditor';
import PreviewOverlay from './components/PreviewOverlay';
import StickerCanvas from './components/StickerCanvas';
import { useToast } from './hooks/useToast';
import { isDrawPanelOpen } from './lib/panelWatch';
import { SEED_ROLL } from './lib/seed';
import type { AppId, RollPhoto, Screen } from './types';

export default function App() {
  const [screen, setScreen] = useState<Screen>('boot');
  const [roll, setRoll] = useState<RollPhoto[]>(SEED_ROLL);
  const [activePhoto, setActivePhoto] = useState<RollPhoto | null>(null);
  const [stickerBase, setStickerBase] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showDrawNav, setShowDrawNav] = useState(false);
  const [canvasFocused, setCanvasFocused] = useState(false);
  const wantedLevel = 0;
  const { message: toastMessage, visible: toastVisible, showToast } = useToast();
  const editorRef = useRef<PhotoEditorHandle>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (screen !== 'editor') return;
    const root = canvasWrapRef.current;
    if (!root) return;

    const check = () => setShowDrawNav(isDrawPanelOpen(root));
    check();

    const observer = new MutationObserver(check);
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [screen]);

  useEffect(() => {
    const el = canvasWrapRef.current;
    if (!el || screen !== 'editor') return;

    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const threshold = maxScroll / 2;
      setCanvasFocused(el.scrollLeft > threshold);
    };
    handleScroll();
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [screen]);

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
    showToast('Saved to camera roll');
    setScreen('roll');
  };

  const handlePreview = () => {
    const dataUrl = editorRef.current?.getImage();
    if (!dataUrl) {
      showToast('Editor is not ready yet');
      return;
    }
    setPreviewUrl(dataUrl);
  };

  const openStickers = () => {
    const dataUrl = editorRef.current?.getImage() ?? activePhoto?.dataUrl;
    if (!dataUrl) {
      showToast('Editor is not ready yet');
      return;
    }
    setStickerBase(dataUrl);
    setScreen('stickers');
  };

  const handleStickersDone = (dataUrl: string) => {
    const saved: RollPhoto = { id: `stamp-${Date.now()}`, dataUrl, savedAt: Date.now(), label: 'Stamped' };
    setRoll((prev) => [saved, ...prev]);
    showToast('Saved to camera roll');
    setStickerBase(null);
    setScreen('roll');
  };

  const scrollToCanvas = () => {
    const el = canvasWrapRef.current;
    if (!el) return;
    el.scrollTo({ left: el.scrollWidth - el.clientWidth, behavior: 'smooth' });
  };

  const scrollToTools = () => {
    canvasWrapRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  };

  const toastNode = (
    <p className={`vi-toast${toastVisible ? ' vi-toast--visible' : ''}`}>{toastMessage}</p>
  );

  return (
    <main className="vi-stage">
      <PhoneShell toast={toastNode}>
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
              onUploadError={showToast}
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
                <button className="vi-btn" onClick={openStickers}>
                  Stamps
                </button>
                <button className="vi-btn vi-editorscreen__preview" onClick={handlePreview}>
                  Preview
                </button>
              </div>
              <div className="vi-editorscreen__canvas-wrap" ref={canvasWrapRef}>
                <PhotoEditor
                  ref={editorRef}
                  image={activePhoto.dataUrl}
                  onSave={handleSave}
                  onFailure={showToast}
                />
              </div>
              {showDrawNav && (
                <div className="vi-scrollnav">
                  <button
                    className={`vi-scrollnav__btn${!canvasFocused ? ' vi-scrollnav__btn--active' : ''}`}
                    onClick={scrollToTools}
                  >
                    ⚙ Tools
                  </button>
                  <button
                    className={`vi-scrollnav__btn${canvasFocused ? ' vi-scrollnav__btn--active' : ''}`}
                    onClick={scrollToCanvas}
                  >
                    ✎ Draw
                  </button>
                </div>
              )}
            </div>
            {previewUrl && <PreviewOverlay dataUrl={previewUrl} onClose={() => setPreviewUrl(null)} />}
          </>
        )}

        {screen === 'stickers' && stickerBase && (
          <>
            <StatusBar wantedLevel={wantedLevel} />
            <StickerCanvas
              baseImage={stickerBase}
              onDone={handleStickersDone}
              onCancel={() => setScreen('editor')}
              onError={showToast}
            />
          </>
        )}
      </PhoneShell>
    </main>
  );
}
