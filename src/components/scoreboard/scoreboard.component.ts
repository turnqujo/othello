import Component from '../../daemon/component'
import style from './scoreboard.style.scss'
import template from './scoreboard.template.html'

interface Props {
  playerCount: number
  hasWon: boolean
}

const Scoreboard: Component<Props> = {
  template,
  style,
  props: {
    playerCount: 0,
    hasWon: false
  },
  setUp: () => {},
  tearDown: () => {},
  render: (newProps: Props) => {}
}
export default Scoreboard
