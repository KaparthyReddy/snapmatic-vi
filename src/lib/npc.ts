export interface NpcComment {
  handle: string;
  text: string;
}

const CLEAN_COMMENTS: NpcComment[] = [
  { handle: '@sunsetstrip_lc', text: 'living for this 🌴' },
  { handle: '@vc_locals', text: 'this the vibe fr' },
  { handle: '@night.rider99', text: 'saving this one' },
];

const SUSPICIOUS_COMMENTS: NpcComment[] = [
  { handle: '@leonida_gossip', text: 'okay what happened here 👀' },
  { handle: '@boardwalk_betty', text: 'sir this is a family feed' },
  { handle: '@dockside_dan', text: 'someone check on OP' },
];

const WANTED_COMMENTS: NpcComment[] = [
  { handle: '@LPD_official', text: 'This post has been flagged for review.' },
  { handle: '@leonida_gossip', text: 'they are NOT getting away with this' },
  { handle: '@night.rider99', text: 'bro is cooked 💀' },
];

function pick<T>(pool: T[], count: number): T[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function generateComments(heat: number): NpcComment[] {
  if (heat >= 4) return pick(WANTED_COMMENTS, 2);
  if (heat >= 2) return pick(SUSPICIOUS_COMMENTS, 2);
  return pick(CLEAN_COMMENTS, 1);
}
