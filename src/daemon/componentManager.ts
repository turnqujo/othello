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
    this.component.container = this.parent as HTMLElement

    if (this.component.template) {
      // TODO: Maybe load the template into <head> and clone the contents for new, identical components?
      const templateEle = createElementFromString(this.component.template) as HTMLTemplateElement
      // No need to clone, since we're creating a new element every time
      this.parent.appendChild(templateEle.content)
    }

    if (this.component.style) {
      this.component.style.use()
    }

    if (this.component.onPropsChanged) {
      const parentElement = this.parent as HTMLElement

      const initialProps =
        Object.keys(this.component.props || {}).length > 0
          ? this.getCurrentPropState(parentElement.dataset, this.component.props)
          : {}

      this.component.onPropsChanged(initialProps)

      if (Object.keys(this.component.props || {}).length > 0) {
        // TODO: This should aggregate changes instead of a simple debounce
        this.watchedAttributesObserver = new MutationObserver(async () => {
          const oldProps = { ...this.component.props }
          const newProps = this.getCurrentPropState(parentElement.dataset, this.component.props)
          this.component.props = newProps
          await this.component.onPropsChanged(newProps, oldProps)
        })

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

  // TODO: Eval is used here without regard to the origin of the code
  private getCurrentPropState(dataSet: DOMStringMap, props: Record<string, any>): Record<string, any> {
    return Object.keys(props)
      .map((key) => ({ [key]: eval(dataSet[key] || props[key]) }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {})
  }
}
