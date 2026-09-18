import { useRef } from 'react';
import type { RollPhoto } from '../types';
import { fileToDataUrl } from '../lib/image';

type CameraRollProps = {
  photos: RollPhoto[];
  onSelect: (photo: RollPhoto) => void;
  onUpload: (photo: RollPhoto) => void;
  onBack: () => void;
  onUploadError: (message: string) => void;
};

export default function CameraRoll({ photos, onSelect, onUpload, onBack, onUploadError }: CameraRollProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      onUpload({ id: `upload-${Date.now()}`, dataUrl, savedAt: Date.now(), label: 'New photo' });
    } catch (error) {
      onUploadError((error as Error).message);
    }
  };

  return (
    <div className="vi-roll">
      <div className="vi-roll__header">
        <button className="vi-iconbtn" onClick={onBack} aria-label="Back">
          ←
        </button>
        <h2 className="vi-display" style={{ fontSize: 18, margin: 0 }}>
          Camera Roll
        </h2>
        <button className="vi-iconbtn" onClick={() => inputRef.current?.click()} aria-label="Upload photo">
          +
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      <div className="vi-roll__grid">
        {photos.map((photo) => (
          <button key={photo.id} className="vi-roll__tile" onClick={() => onSelect(photo)}>
            <img src={photo.dataUrl} alt={photo.label ?? 'Saved photo'} />
          </button>
        ))}
      </div>
    </div>
  );
}
