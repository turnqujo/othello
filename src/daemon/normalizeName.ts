export default function normalizeName(name: string): string {
  return name.trim().replace(/-/g, '').toLocaleLowerCase()
}
