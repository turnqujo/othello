import createElement from './createElement'

interface Props {
  parent: Node
  template?: string
  style?: any
}

export default abstract class Component {
  private style: any
  constructor({ parent, template, style }: Props) {
    if (template) {
      parent.appendChild(createElement(template))
    }

    if (style) {
      style.use()
      this.style = style
    }
  }

  destroy(): void {
    if (this.style) {
      this.style.unuse()
    }
  }

  // To be implemented by inherited classes
  protected onDestroy(): void {}
}
