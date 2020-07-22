import Component from '../../tooling/component'
import template from './scoreboard.template.html'
import style from './scoreboard.style.scss'

export default class Scoreboard extends Component {
  constructor(parent: Node) {
    super({ parent, template, style })
  }

  onMounted(): void {}
  onDestroyed(): void {}
}
