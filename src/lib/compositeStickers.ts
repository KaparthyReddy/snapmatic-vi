import type { PlacedSticker } from '../types';
import { findSticker } from './stickers';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image for compositing.'));
    img.src = src;
  });
}

function svgToDataUrl(svg: string): string {
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

export async function compositeStickers(baseUrl: string, placed: PlacedSticker[]): Promise<string> {
  const baseImg = await loadImage(baseUrl);
  const canvas = document.createElement('canvas');
  canvas.width = baseImg.naturalWidth;
  canvas.height = baseImg.naturalHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable.');

  ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);

  for (const sticker of placed) {
    const def = findSticker(sticker.defId);
    if (!def) continue;
    const stickerImg = await loadImage(svgToDataUrl(def.svg));
    const sizePx = (sticker.size / 100) * canvas.width;
    const centerX = (sticker.x / 100) * canvas.width;
    const centerY = (sticker.y / 100) * canvas.height;
    ctx.drawImage(stickerImg, centerX - sizePx / 2, centerY - sizePx / 2, sizePx, sizePx);
  }

  return canvas.toDataURL('image/png');
}
