import Component from './component'

interface ComponentManager {
  livingComponents: Component[]
  componentListeners: (() => void)[]
  register: (newComponent: Component) => void
}

/**
 * The Component Manager is responsible for keeping track of all "living" components.
 */
const componentManager: ComponentManager = {
  livingComponents: [],
  componentListeners: [],
  register: function (newComponent: Component) {
    this.livingComponents.push(newComponent)

    newComponent.addEventListener('component-destroy', () =>
      this.livingComponents.splice(
        this.livingComponents.findIndex((x: Component) => x === newComponent),
        1
      )
    )
  }
}

export default Object.freeze(componentManager)
