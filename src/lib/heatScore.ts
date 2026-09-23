function loadImageEl(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image for heat scoring.'));
    img.src = src;
  });
}

const SAMPLE_SIZE = 32;
const CHANGE_THRESHOLD = 24; // per-channel diff (0-255) counted as "this pixel changed"

async function changedPixelFraction(urlA: string, urlB: string): Promise<number> {
  const [imgA, imgB] = await Promise.all([loadImageEl(urlA), loadImageEl(urlB)]);

  const canvas = document.createElement('canvas');
  canvas.width = SAMPLE_SIZE;
  canvas.height = SAMPLE_SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return 0;

  ctx.drawImage(imgA, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  const dataA = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE).data;

  ctx.clearRect(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  ctx.drawImage(imgB, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  const dataB = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE).data;

  let changed = 0;
  const totalPixels = SAMPLE_SIZE * SAMPLE_SIZE;

  for (let i = 0; i < dataA.length; i += 4) {
    const dr = Math.abs(dataA[i] - dataB[i]);
    const dg = Math.abs(dataA[i + 1] - dataB[i + 1]);
    const db = Math.abs(dataA[i + 2] - dataB[i + 2]);
    if (dr > CHANGE_THRESHOLD || dg > CHANGE_THRESHOLD || db > CHANGE_THRESHOLD) {
      changed += 1;
    }
  }

  return changed / totalPixels;
}

export async function computeHeat(originalUrl: string, editedUrl: string, stampCount = 0): Promise<number> {
  let touchedFraction = 0;
  try {
    touchedFraction = await changedPixelFraction(originalUrl, editedUrl);
  } catch {
    touchedFraction = 0;
  }

  // A localized but real edit (a scribble, a couple of stamps) should still
  // register meaningfully even if it only touches a small % of the frame —
  // so we scale up modest touched-fractions rather than requiring near-total
  // coverage to register at all.
  const editSignal = Math.min(1, touchedFraction * 4);
  const stampFactor = Math.min(stampCount / 3, 1);

  const combined = editSignal * 0.55 + stampFactor * 0.45;
  return Math.max(0, Math.min(5, Math.round(combined * 5)));
}