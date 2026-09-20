export type Screen = 'boot' | 'lock' | 'home' | 'roll' | 'editor' | 'stickers' | 'feed';

export type AppId = 'camera' | 'feed' | 'settings';

export interface RollPhoto {
  id: string;
  dataUrl: string;
  savedAt: number;
  label?: string;
  heat?: number;
}

export interface PlacedSticker {
  id: string;
  defId: string;
  x: number;
  y: number;
  size: number;
}

export interface FeedPost {
  id: string;
  dataUrl: string;
  heat: number;
  comments: { handle: string; text: string }[];
  postedAt: number;
}
