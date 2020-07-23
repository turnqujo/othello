import BaseComponent from '../../daemon/component'
import template from './options.template.html'
import style from './options.style.scss'

export default class Options extends BaseComponent {
  constructor(parent: Node) {
    super({ parent, template, style })
  }

  setUp(): void {}
  cleanUp(): void {}
}
