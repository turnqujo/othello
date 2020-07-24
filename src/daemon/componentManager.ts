import Component from './component'
import createElementFromString from './createElement'
import { camelToKebab } from './strings'

export default class ComponentManager {
  private readonly parent: Node
  private readonly component: Component<any>
  private watchedAttributesObserver: MutationObserver

  constructor({ parent, component }: { parent: Node; component: Component<any> }) {
    this.parent = parent
    this.component = component
  }

  public async onCreated() {
    if (this.component.template) {
      const templateEle = createElementFromString(this.component.template) as HTMLTemplateElement
      this.parent.appendChild(templateEle.content)
    }

    if (this.component.style) {
      this.component.style.use()
    }

    this.component.container = this.parent as HTMLElement

    if (Object.keys(this.component.events || {}).length > 0) {
      for (const key in this.component.events) {
        this.component.events[key] = this.component.events[key].bind(this.component)
      }
    }

    if (this.component.render) {
      const parentElement = this.parent as HTMLElement

      const initialProps =
        Object.keys(this.component.props || {}).length > 0
          ? this.getCurrentPropState(parentElement.dataset, this.component.props)
          : {}

      this.component.render(initialProps)

      if (Object.keys(this.component.props || {}).length > 0) {
        this.watchedAttributesObserver = new MutationObserver(() =>
          this.component.render(this.getCurrentPropState(parentElement.dataset, this.component.props))
        )

        const attributeFilter = Object.keys(this.component.props).map((attr) => `data-${camelToKebab(attr)}`)
        this.watchedAttributesObserver.observe(this.parent, {
          attributes: true,
          attributeFilter
        })
      }
    }

    if (this.component.setUp) {
      await this.component.setUp()
    }
  }

  public async onDestroyed() {
    if (this.component.style) {
      this.component.style.unuse()
    }

    if (this.watchedAttributesObserver) {
      this.watchedAttributesObserver.disconnect()
    }

    if (this.component.tearDown) {
      await this.component.tearDown()
    }
  }

  // TODO: Eval is used here without regard to the origin of the code.
  // Totally why this isn't a good idea for real-world use
  private getCurrentPropState(dataSet: DOMStringMap, props: Record<string, any>): Record<string, any> {
    return Object.keys(props)
      .map((key) => ({ [key]: eval(dataSet[key] || props[key]) }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {})
  }
}
