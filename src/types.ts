export type Screen = 'boot' | 'lock' | 'home' | 'roll' | 'editor';

export type AppId = 'camera' | 'feed' | 'settings';

export interface RollPhoto {
  id: string;
  dataUrl: string;
  savedAt: number;
  label?: string;
}
