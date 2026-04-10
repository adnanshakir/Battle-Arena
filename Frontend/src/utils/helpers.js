export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function truncate(text, length = 60) {
  if (!text) return '';
  return text.length > length ? text.slice(0, length).trimEnd() + '…' : text;
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function formatScore(score) {
  return typeof score === 'number' ? score.toFixed(1) : String(score);
}