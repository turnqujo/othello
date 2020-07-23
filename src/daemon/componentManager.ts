import Component from './component'
import createElementFromString from './createElement'
import normalizeName from './normalizeName'

export default class ComponentManager {
  private readonly parent: Node
  private readonly component: Component<any, any>
  private watchedAttributesObserver: MutationObserver

  constructor({ parent, component }: { parent: Node; component: Component<any, any> }) {
    this.parent = parent
    this.component = component
  }

  public onCreated(): void {
    if (this.component.template) {
      const templateEle = createElementFromString(this.component.template) as HTMLTemplateElement
      this.parent.appendChild(templateEle.content)
    }

    if (this.component.style) {
      this.component.style.use()
    }

    if (this.component.render) {
      const parentElement = this.parent as HTMLElement

      const initialStatic =
        Object.keys(this.component.staticProps || {}).length > 0
          ? this.getCurrentPropState(parentElement.dataset, this.component.staticProps)
          : {}

      const initialWatched =
        Object.keys(this.component.watchedProps || {}).length > 0
          ? this.getCurrentPropState(parentElement.dataset, this.component.watchedProps)
          : {}

      this.component.render(parentElement, initialStatic, initialWatched)

      // TODO: This is some absolutely insane code which needs some serious love
      this.watchedAttributesObserver = new MutationObserver((records: MutationRecord[]) => {
        const updated = records
          .filter((record) => record.attributeName.indexOf('data-') === 0)
          .map((record) => ({
            [normalizeName(record.attributeName.replace('data-', ''))]: (record.target as HTMLElement).getAttribute(
              record.attributeName
            )
          }))
          .reduce((acc, curr) => ({ ...acc, ...curr }), {})

        const normalizedWatchedPropMap = Object.keys(this.component.watchedProps)
          .map((propName) => ({
            [normalizeName(propName)]: propName
          }))
          .reduce((acc, curr) => ({ ...acc, ...curr }), {})

        const newWatchedProps = {
          ...this.component.watchedProps,
          [normalizedWatchedPropMap[Object.keys(updated)[0]]]: updated[Object.keys(updated)[0]]
        }

        // TODO: This is closing over parentElement and initialStatic - better solution?
        this.component.render(parentElement, initialStatic, newWatchedProps)
      })

      this.watchedAttributesObserver.observe(this.parent, { attributes: true })
    }

    if (this.component.setUp) {
      this.component.setUp()
    }
  }

  public onDestroyed(): void {
    if (this.component.style) {
      this.component.style.unuse()
    }

    if (this.watchedAttributesObserver) {
      this.watchedAttributesObserver.disconnect()
    }

    if (this.component.tearDown) {
      this.component.tearDown()
    }
  }

  private getCurrentPropState(dataSet: DOMStringMap, props: Record<string, any>): Record<string, any> {
    return Object.keys(props)
      .map((key) => ({ [key]: dataSet[key] || props[key] }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {})
  }
}
