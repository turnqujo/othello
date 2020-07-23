import BaseComponent from '../../daemon/component'
import template from './gameboard.template.html'
import style from './gameboard.style.scss'

export default class Gameboard extends BaseComponent {
  constructor(parent: Node) {
    super({ parent, template, style })
  }

  setUp(): void {}
  cleanUp(): void {}
}
