import createElement from './createElement'

interface Props {
  parent: Node
  template?: string
  style?: any // TODO: How to type this? style-loader adds additional use / unuse methods
}

export default abstract class Component {
  private node: Node
  private style: any

  private eventListeners = {
    'component-destroy': []
  }

  protected abstract onMounted(): void
  protected abstract onDestroyed(): void

  constructor({ parent, template, style }: Props) {
    if (template) {
      this.node = createElement(template)
      parent.appendChild(this.node)
    }

    if (style) {
      style.use()
      this.style = style
    }

    const observer = new MutationObserver(() => this.handleParentMutation())

    // TODO: Observe attributes on the parent for "props"?
    observer.observe(parent, { childList: true })

    this.onMounted()
  }

  private handleParentMutation() {
    if (this.node.parentNode === null) {
      if (this.style) {
        this.style.unuse()
      }

      this.onDestroyed()
      this.dispatchEvent('component-destroy')
      this.eventListeners['component-destroy'] = []
    }
  }

  protected dispatchEvent(type: string): void {
    if (!this.eventListeners[type]) {
      throw new Error(`Unknown event type: ${type}`)
    }

    this.eventListeners[type].forEach((listener) => listener(new Event(type)))
  }

  public addEventListener(type: string, listener: (evt: Event) => void): void {
    if (!Array.isArray(this.eventListeners[type])) {
      // Unknown event - ignore
      return
    }

    this.eventListeners[type].push(listener)
  }

  public removeEventListener(type: string, listener: (evt: Event) => void): void {
    if (!Array.isArray(this.eventListeners[type])) {
      // Unknown event - ignore
      return
    }

    this.eventListeners[type].splice(
      this.eventListeners[type].findIndex((x) => x === listener),
      1
    )
  }
}
