import createElementFromString from './createElement'

interface Props {
  parent: Node
  template?: string
  style?: any // TODO: How to type this? style-loader adds additional use / unuse methods
}

export default abstract class BaseComponent {
  private parent: Node
  private template?: string
  private node: HTMLTemplateElement
  private style?: any

  protected abstract setUp(): void
  protected abstract cleanUp(): void

  constructor({ parent, template, style }: Props) {
    this.parent = parent
    this.template = template
    this.style = style
  }

  // `onCreated` should be considered internal; instead, implement `setUp` in subclasses.
  public onCreated(): void {
    if (this.template) {
      this.node = createElementFromString(this.template) as HTMLTemplateElement
      this.parent.appendChild(this.node.content)
    }

    if (this.style) {
      this.style.use()
    }

    if (this.setUp) {
      this.setUp()
    }
  }

  // on`Destroyed` should be considered internal; instead, implement `cleanUp` in subclasses.
  public onDestroyed(): void {
    if (this.style) {
      this.style.unuse()
    }

    if (this.cleanUp) {
      this.cleanUp()
    }
  }
}
