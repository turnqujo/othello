export default function createElement(source: string): Node {
  const templateParent = document.createElement('template')
  templateParent.innerHTML = source.trim()
  return templateParent.content.firstChild
}
