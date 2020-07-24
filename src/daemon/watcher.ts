import Component from './component'
import ComponentManager from './componentManager'
import normalizeName from './normalizeName'

type ComponentLookup = Record<string, Component<any>>
type ManagerLookup = Record<string, ComponentManager>

interface Options {
  components: ComponentLookup
}

export default class WatcherDaemon {
  private componentLookup: ComponentLookup
  private livingComponents: ManagerLookup = {}

  constructor(appHandle: Node, options: Options) {
    this.componentLookup = this.normalizeComponentNames(options.components)
    const appObserver = new MutationObserver((records: MutationRecord[]) => this.handleMutation(records))
    appObserver.observe(appHandle, { childList: true, subtree: true })
    this.instantiateComponents(appHandle.childNodes)
  }

  private normalizeComponentNames(components: ComponentLookup) {
    return Object.keys(components).reduce(
      (acc: ComponentLookup, curr: string) => ({
        ...acc,
        [normalizeName(curr)]: components[curr]
      }),
      {}
    )
  }

  private handleMutation(records: MutationRecord[]) {
    for (const record of records) {
      if (record.addedNodes.length > 0) {
        this.instantiateComponents(record.addedNodes)
      }

      if (record.removedNodes.length > 0) {
        this.doomComponents(record.removedNodes)
      }
    }
  }

  private instantiateComponents(nodeList: NodeList): void {
    for (const componentContainerNode of nodeList) {
      const componentContainerEle = componentContainerNode as HTMLElement
      const dataSet = componentContainerEle.dataset
      if (!dataSet || !dataSet.component) {
        continue
      }

      const component = this.componentLookup[dataSet.component]
      if (!component) {
        throw new Error(`Unknown component type: ${dataSet.component}`)
      }

      const daemonId = Math.floor((1 + Math.random()) * 0x10000).toString(16)
      componentContainerEle.setAttribute('data-daemon-id', daemonId)
      this.livingComponents[daemonId] = new ComponentManager({
        parent: componentContainerNode,
        component: component
      })
      this.livingComponents[daemonId].onCreated()
    }
  }

  private doomComponents(nodeList: NodeList) {
    for (const componentContainerNode of nodeList) {
      const componentContainerEle = componentContainerNode as HTMLElement
      const dataSet = componentContainerEle.dataset
      if (!dataSet || !dataSet.daemonId) {
        continue
      }

      const doomedComponentInstance = this.livingComponents[dataSet.daemonId]
      doomedComponentInstance.onDestroyed()
      delete this.livingComponents[dataSet.daemonId]
    }
  }
}
