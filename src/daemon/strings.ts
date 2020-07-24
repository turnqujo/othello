export function normalizeName(name: string): string {
  return name.trim().replace(/-/g, '').toLocaleLowerCase()
}

export function camelToKebab(camel: string): string {
  return camel.split('').reduce((acc, curr) => (acc += curr.match(/[A-Z]/) ? `-${curr.toLocaleLowerCase()}` : curr), '')
}
