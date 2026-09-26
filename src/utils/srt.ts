export interface WordBoundary {
  text: string;
  offsetMs: number;
  durationMs: number;
}

function formatSrtTime(ms: number): string {
  const hours = String(Math.floor(ms / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  const milliseconds = String(ms % 1000).padStart(3, '0');
  return `${hours}:${minutes}:${seconds},${milliseconds}`;
}

export function generateSrt(boundaries: WordBoundary[]): string {
  if (!boundaries || !boundaries.length) return '';
  let srt = '';
  let index = 1;
  
  boundaries.forEach((b) => {
    const start = formatSrtTime(b.offsetMs || 0);
    const end = formatSrtTime((b.offsetMs || 0) + (b.durationMs || 0));
    srt += `${index}\n${start} --> ${end}\n${b.text}\n\n`;
    index++;
  });
  return srt;
}