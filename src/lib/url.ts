export function href(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return base.slice(0, -1) + path;
}
