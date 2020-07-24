import Component from '../../daemon/component'
import style from './scoreboard.style.scss'
import template from './scoreboard.template.html'

interface Props {
  example: string
  playerCount: number
  hasWon: boolean
}

const Scoreboard: Component<Props> = {
  template,
  style,
  props: {
    example: '',
    playerCount: 0,
    hasWon: false
  },
  render: (container: HTMLElement, newProps: Props) => {
    container.querySelector('.scoreboard__example').innerHTML = newProps.example
    container.querySelector('.scoreboard__player-count').innerHTML = `${newProps.playerCount} Players`
    container.querySelector('.scoreboard__has-won').innerHTML = newProps.hasWon ? 'Finished!' : 'In Progress'
  }
}
export default Scoreboard
