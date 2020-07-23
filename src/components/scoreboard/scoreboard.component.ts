import BaseComponent from '../../daemon/component'
import template from './scoreboard.template.html'
import style from './scoreboard.style.scss'

interface test {
  test: string
}

export default class Scoreboard extends BaseComponent implements test {
  test = ''

  constructor(parent: Node) {
    super({ parent, template, style })
  }

  setUp(): void {}
  cleanUp(): void {}
}
