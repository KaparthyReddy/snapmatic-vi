export type Screen = 'boot' | 'lock' | 'home' | 'roll' | 'editor' | 'stickers';

export type AppId = 'camera' | 'feed' | 'settings';

export interface RollPhoto {
  id: string;
  dataUrl: string;
  savedAt: number;
  label?: string;
}

export interface PlacedSticker {
  id: string;
  defId: string;
  x: number;
  y: number;
  size: number;
}
