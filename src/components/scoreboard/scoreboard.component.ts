import Component from '../../daemon/component'
import template from './scoreboard.template.html'
import style from './scoreboard.style.scss'

export default class Scoreboard extends Component {
  constructor(parent: Node) {
    super({ parent, template, style })
  }

  setUp(): void {}
  cleanUp(): void {}
}
