function loadImageEl(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image for heat scoring.'));
    img.src = src;
  });
}

const SAMPLE_SIZE = 24;

async function pixelDiff(urlA: string, urlB: string): Promise<number> {
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

  let total = 0;
  let count = 0;
  for (let i = 0; i < dataA.length; i += 4) {
    total += Math.abs(dataA[i] - dataB[i]);
    total += Math.abs(dataA[i + 1] - dataB[i + 1]);
    total += Math.abs(dataA[i + 2] - dataB[i + 2]);
    count += 3;
  }
  return Math.min(1, total / count / 255);
}

export async function computeHeat(originalUrl: string, editedUrl: string, stampCount = 0): Promise<number> {
  let diff = 0;
  try {
    diff = await pixelDiff(originalUrl, editedUrl);
  } catch {
    diff = 0;
  }
  const stampFactor = Math.min(stampCount / 4, 1);
  const combined = diff * 0.75 + stampFactor * 0.25;
  return Math.max(0, Math.min(5, Math.round(combined * 5)));
}
