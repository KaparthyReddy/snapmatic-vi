import type { RollPhoto } from '../types';

function gradientPhoto(id: string, stops: [string, string, string], label: string): RollPhoto {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${stops[0]}"/>
      <stop offset="55%" stop-color="${stops[1]}"/>
      <stop offset="100%" stop-color="${stops[2]}"/>
    </linearGradient></defs>
    <rect width="1080" height="1080" fill="url(#g)"/>
  </svg>`;
  return {
    id,
    dataUrl: 'data:image/svg+xml;base64,' + btoa(svg),
    savedAt: Date.now(),
    label,
  };
}

export const SEED_ROLL: RollPhoto[] = [
  gradientPhoto('seed-1', ['#FF2D78', '#FF7A3D', '#FFC24B'], 'Sunset Strip'),
  gradientPhoto('seed-2', ['#22D3EE', '#2D1B4E', '#0B0714'], 'Neon Dusk'),
  gradientPhoto('seed-3', ['#FFC24B', '#FF2D78', '#2D1B4E'], 'Vice Motel'),
  gradientPhoto('seed-4', ['#0B0714', '#2D1B4E', '#FF7A3D'], 'Pier 6AM'),
];
