export function formatShort(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function isToday(iso) {
  const d = new Date(iso);
  const t = new Date();
  return d.toDateString() === t.toDateString();
}

export function isOverdue(iso) {
  const d = new Date(iso);
  const now = new Date();
  return d < now && !isToday(iso);
}
