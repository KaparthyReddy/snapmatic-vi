export interface StickerDef {
  id: string;
  label: string;
  svg: string;
}

export const STICKERS: StickerDef[] = [
  {
    id: 'palm',
    label: 'Palm',
    svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="46" y="55" width="8" height="40" rx="2" fill="#8B5E34"/><path d="M50 55 C30 45 15 50 5 40 C20 38 35 42 48 50 Z" fill="#22D3EE"/><path d="M50 55 C70 45 85 50 95 40 C80 38 65 42 52 50 Z" fill="#22D3EE"/><path d="M50 55 C45 35 35 25 20 20 C30 35 38 45 48 52 Z" fill="#FF2D78"/><path d="M50 55 C55 35 65 25 80 20 C70 35 62 45 52 52 Z" fill="#FF7A3D"/></svg>',
  },
  {
    id: 'star',
    label: 'Wanted',
    svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,38 96,38 68,59 79,92 50,72 21,92 32,59 4,38 39,38" fill="#FFC24B" stroke="#0B0714" stroke-width="4"/></svg>',
  },
  {
    id: 'flame',
    label: 'Flame',
    svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 95 C25 85 20 60 35 40 C35 55 45 55 45 45 C45 25 55 15 55 15 C60 35 75 40 75 60 C75 80 65 90 50 95 Z" fill="#FF7A3D"/><path d="M50 90 C40 85 38 70 45 58 C46 66 54 66 54 58 C54 70 62 75 60 82 C57 88 54 89 50 90 Z" fill="#FFC24B"/></svg>',
  },
  {
    id: 'shades',
    label: 'Shades',
    svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="40" width="35" height="25" rx="8" fill="#0B0714"/><rect x="57" y="40" width="35" height="25" rx="8" fill="#0B0714"/><rect x="43" y="48" width="14" height="6" fill="#0B0714"/><path d="M8 45 L2 40" stroke="#0B0714" stroke-width="4"/><path d="M92 45 L98 40" stroke="#0B0714" stroke-width="4"/></svg>',
  },
  {
    id: 'cash',
    label: 'Cash',
    svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="30" width="90" height="45" rx="6" fill="#7ED957" stroke="#0B0714" stroke-width="3"/><circle cx="50" cy="52" r="14" fill="none" stroke="#0B0714" stroke-width="3"/><text x="50" y="58" font-size="18" text-anchor="middle" fill="#0B0714" font-family="Arial" font-weight="bold">$</text></svg>',
  },
  {
    id: 'tape',
    label: 'Tape',
    svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="15" width="90" height="70" rx="8" fill="#2D1B4E" stroke="#0B0714" stroke-width="3"/><circle cx="32" cy="50" r="14" fill="#E8E4F0"/><circle cx="68" cy="50" r="14" fill="#E8E4F0"/><circle cx="32" cy="50" r="5" fill="#0B0714"/><circle cx="68" cy="50" r="5" fill="#0B0714"/><rect x="20" y="65" width="60" height="8" rx="2" fill="#FF2D78"/></svg>',
  },
  {
    id: 'bolt',
    label: 'Bolt',
    svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="55,5 25,55 45,55 40,95 75,45 52,45" fill="#FFC24B" stroke="#0B0714" stroke-width="3"/></svg>',
  },
  {
    id: 'heart',
    label: 'Heart',
    svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 90 C10 60 10 30 35 20 C45 15 50 25 50 30 C50 25 55 15 65 20 C90 30 90 60 50 90 Z" fill="#FF2D78"/></svg>',
  },
];

export function findSticker(defId: string): StickerDef | undefined {
  return STICKERS.find((s) => s.id === defId);
}
