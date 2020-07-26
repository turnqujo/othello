import Component from '../../daemon/component'
import style from './scoreboard.style.scss'
import template from './scoreboard.template.html'

interface Props {
  playerCount: number
  hasWon: boolean
}

export default (): Component<Props> => ({
  template,
  style,
  props: {
    playerCount: 0,
    hasWon: false
  },
  setUp: () => {},
  tearDown: () => {},
  onPropsChanged: (newProps: Props) => {}
})
