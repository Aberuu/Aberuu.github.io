export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatYear(date) {
  return new Date(date).getFullYear();
}
