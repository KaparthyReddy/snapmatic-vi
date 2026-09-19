import { useRef, useState } from 'react';
import { STICKERS, findSticker } from '../lib/stickers';
import { compositeStickers } from '../lib/compositeStickers';
import type { PlacedSticker } from '../types';

type StickerCanvasProps = {
  baseImage: string;
  onDone: (dataUrl: string) => void;
  onCancel: () => void;
  onError: (message: string) => void;
};

export default function StickerCanvas({ baseImage, onDone, onCancel, onError }: StickerCanvasProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [placed, setPlaced] = useState<PlacedSticker[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  const addSticker = (defId: string) => {
    const id = `sticker-${Date.now()}`;
    setPlaced((prev) => [...prev, { id, defId, x: 50, y: 50, size: 20 }]);
    setSelectedId(id);
  };

  const removeSelected = () => {
    if (!selectedId) return;
    setPlaced((prev) => prev.filter((s) => s.id !== selectedId));
    setSelectedId(null);
  };

  const updateSelectedSize = (size: number) => {
    if (!selectedId) return;
    setPlaced((prev) => prev.map((s) => (s.id === selectedId ? { ...s, size } : s)));
  };

  const toStagePercent = (clientX: number, clientY: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return { x: 50, y: 50 };
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  const handlePointerDown = (sticker: PlacedSticker, event: React.PointerEvent) => {
    event.stopPropagation();
    setSelectedId(sticker.id);
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    dragRef.current = {
      id: sticker.id,
      offsetX: event.clientX - rect.left - rect.width / 2,
      offsetY: event.clientY - rect.top - rect.height / 2,
    };
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;
    const { x, y } = toStagePercent(event.clientX - drag.offsetX, event.clientY - drag.offsetY);
    setPlaced((prev) => prev.map((s) => (s.id === drag.id ? { ...s, x, y } : s)));
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  const handleDone = async () => {
    setSaving(true);
    try {
      const dataUrl = await compositeStickers(baseImage, placed);
      onDone(dataUrl);
    } catch (error) {
      onError((error as Error).message);
      setSaving(false);
    }
  };

  const selected = placed.find((s) => s.id === selectedId) ?? null;

  return (
    <div className="vi-stickerscreen">
      <div className="vi-stickerscreen__header">
        <button className="vi-iconbtn" onClick={onCancel} aria-label="Back">
          ←
        </button>
        <span className="vi-editorscreen__title">Stickers</span>
        <button className="vi-btn vi-btn--primary" onClick={handleDone} disabled={saving}>
          {saving ? 'Saving…' : 'Done'}
        </button>
      </div>

      <div
        ref={stageRef}
        className="vi-stickerstage"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <img src={baseImage} alt="Editing" className="vi-stickerstage__image" />
        {placed.map((sticker) => {
          const def = findSticker(sticker.defId);
          if (!def) return null;
          return (
            <div
              key={sticker.id}
              className={`vi-stickeritem${sticker.id === selectedId ? ' vi-stickeritem--selected' : ''}`}
              style={{
                left: `${sticker.x}%`,
                top: `${sticker.y}%`,
                width: `${sticker.size}%`,
              }}
              onPointerDown={(e) => handlePointerDown(sticker, e)}
              dangerouslySetInnerHTML={{ __html: def.svg }}
            />
          );
        })}
      </div>

      {selected && (
        <div className="vi-stickertoolbar">
          <input
            type="range"
            min={8}
            max={45}
            value={selected.size}
            onChange={(e) => updateSelectedSize(Number(e.target.value))}
          />
          <button className="vi-iconbtn" onClick={removeSelected} aria-label="Delete sticker">
            🗑
          </button>
        </div>
      )}

      <div className="vi-stickertray">
        {STICKERS.map((def) => (
          <button
            key={def.id}
            className="vi-stickertray__item"
            onClick={() => addSticker(def.id)}
            dangerouslySetInnerHTML={{ __html: def.svg }}
          />
        ))}
      </div>
    </div>
  );
}
